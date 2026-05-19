import React, { useState } from "react";
import { motion, useScroll } from "framer-motion";
import axios from "axios";

import {
  HiOutlineBriefcase,
  HiOutlineMicrophone,
  HiOutlineChartBar,
} from "react-icons/hi";

import { FiUploadCloud } from "react-icons/fi";

import { serverURL } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Step1SetUp({ onStart }) {

  // ================= STATES =================
  const {userData} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const [role, setRole] = useState("");

  const [experience, setExperience] = useState("");

  const [mode, setMode] = useState("Technical Interview");

  const [resumeFile, setResumeFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState([]);

  const [skills, setSkills] = useState([]);

  const [resumeText, setResumeText] = useState("");

  const [analysisDone, setAnalysisDone] = useState(false);

  const [analyzing, setAnalyzing] = useState(false);

  // ================= RESUME ANALYZE =================
  const handleUploadResume = async () => {

    if (!resumeFile) return;

    setAnalyzing(true);

    try {

      const formData = new FormData();

      formData.append("resume", resumeFile);

      const result = await axios.post(
        serverURL + "/api/interview/resume",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(result.data);

      // ================= AUTO FILL =================
      setRole(result.data.role || "");

      setExperience(result.data.experience || "");

      setProjects(result.data.projects || []);

      setSkills(result.data.skills || []);

      setResumeText(result.data.resumeText || "");

      setAnalysisDone(true);

      setAnalyzing(false);

    } catch (error) {

      console.log(error);

      setAnalyzing(false);
    }
  };

  // ================= START INTERVIEW =================
  const handleStart = async() => {

   setLoading(true)
   try {
    const result = await axios.post(serverURL + "/api/interview/generate-questions", {role,experience,mode,resumeText,projects,skills},
      {withCredentials:true} )
      console.log(result.data);
      if(userData){
        dispatch(setUserData({...userData , credits:result.data.creditsLeft}))
      }
      setLoading(false)
      onStart(result.data)
   
   } catch (error) {
    console.log(
  error.response?.data
);
      setLoading(false)

   }
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="
        min-h-screen
        w-full
        flex
        items-center
        justify-center
        bg-[#f5f5f5]
        px-4
        py-10
        relative
        overflow-hidden
      "
    >
      {/* BLUR EFFECTS */}
      <div className="absolute top-[-120px] left-[-120px] w-[280px] h-[280px] bg-green-200 rounded-full blur-[120px] opacity-40"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-black/10 rounded-full blur-[120px] opacity-30"></div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="
          w-full
          max-w-6xl
          bg-white
          rounded-[40px]
          shadow-[0_20px_80px_rgba(0,0,0,0.08)]
          overflow-hidden
          grid
          md:grid-cols-2
          relative
          z-10
        "
      >

        {/* LEFT SIDE */}
        <div
          className="
            bg-gradient-to-br
            from-green-100
            to-green-50
            p-10
            md:p-14
            flex
            flex-col
            justify-center
            relative
            overflow-hidden
          "
        >
          {/* FLOATING BLUR */}
          <div className="absolute top-[-60px] right-[-60px] w-[180px] h-[180px] bg-green-300 rounded-full blur-[100px] opacity-30"></div>

          {/* HEADING */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="
              text-5xl
              font-bold
              leading-tight
              tracking-tight
              text-black
            "
          >
            Start Your
            <br />

            <span className="text-green-500">
              AI Interview
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-6
              text-gray-600
              leading-8
              text-lg
              max-w-md
            "
          >
            Practice real interview scenarios powered
            by AI. Improve communication, technical
            skills and confidence.
          </p>

          {/* FEATURES */}
          <div className="mt-12 space-y-5">

            {/* FEATURE 1 */}
            <motion.div
              whileHover={{
                x: 8,
              }}
              className="
                bg-white
                rounded-2xl
                px-6
                py-5
                shadow-md
                border
                border-white
                flex
                items-center
                gap-4
              "
            >
              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-green-100
                  flex
                  items-center
                  justify-center
                "
              >
                <HiOutlineBriefcase
                  className="text-green-500"
                  size={24}
                />
              </div>

              <div>
                <h3 className="font-semibold text-black">
                  Choose Role & Experience
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  AI adapts interview difficulty
                </p>
              </div>
            </motion.div>

            {/* FEATURE 2 */}
            <motion.div
              whileHover={{
                x: 8,
              }}
              className="
                bg-white
                rounded-2xl
                px-6
                py-5
                shadow-md
                border
                border-white
                flex
                items-center
                gap-4
              "
            >
              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-green-100
                  flex
                  items-center
                  justify-center
                "
              >
                <HiOutlineMicrophone
                  className="text-green-500"
                  size={24}
                />
              </div>

              <div>
                <h3 className="font-semibold text-black">
                  Smart Voice Interview
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Dynamic AI interaction
                </p>
              </div>
            </motion.div>

            {/* FEATURE 3 */}
            <motion.div
              whileHover={{
                x: 8,
              }}
              className="
                bg-white
                rounded-2xl
                px-6
                py-5
                shadow-md
                border
                border-white
                flex
                items-center
                gap-4
              "
            >
              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-green-100
                  flex
                  items-center
                  justify-center
                "
              >
                <HiOutlineChartBar
                  className="text-green-500"
                  size={24}
                />
              </div>

              <div>
                <h3 className="font-semibold text-black">
                  Performance Analytics
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  AI generated improvement insights
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10 md:p-14 flex flex-col justify-center">

          {/* TITLE */}
          <h2 className="text-4xl font-bold text-black">
            Interview SetUp
          </h2>

          <p className="text-gray-500 mt-3 text-lg">
            Configure your AI interview experience
          </p>

          {/* FORM */}
          <div className="mt-10 space-y-6">

            {/* ROLE */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Role
              </label>

              <input
                type="text"
                placeholder="Enter role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="
                  mt-2
                  w-full
                  border-2
                  border-green-400
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:ring-4
                  focus:ring-green-100
                  text-lg
                  transition-all
                "
              />
            </div>

            {/* EXPERIENCE */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Experience
              </label>

              <input
                type="text"
                placeholder="Experience (e.g 2 years)"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="
                  mt-2
                  w-full
                  border
                  border-gray-200
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:ring-4
                  focus:ring-green-100
                  text-lg
                  transition-all
                "
              />
            </div>

            {/* MODE */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Interview Mode
              </label>

              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="
                  mt-2
                  w-full
                  border
                  border-gray-200
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:ring-4
                  focus:ring-green-100
                  text-lg
                  transition-all
                  bg-white
                "
              >
                <option>
                  Technical Interview
                </option>

                <option>
                  HR Interview
                </option>

                <option>
                  Mixed Interview
                </option>
              </select>
            </div>

            {/* RESUME UPLOAD */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Resume Upload
              </label>

              <label
                className="
                  mt-2
                  border-2
                  border-dashed
                  border-green-300
                  rounded-3xl
                  p-10
                  flex
                  flex-col
                  items-center
                  justify-center
                  cursor-pointer
                  bg-green-50/50
                  hover:bg-green-50
                  transition-all
                  duration-300
                "
              >
                <FiUploadCloud
                  className="text-green-500"
                  size={40}
                />

                <p className="mt-4 text-gray-600 font-medium">
                  {resumeFile
                    ? resumeFile.name
                    : "Click to upload resume (Optional)"}
                </p>

                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    setResumeFile(e.target.files[0])
                  }
                />
              </label>

              {/* ANALYZE BUTTON */}
              {resumeFile && (
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={handleUploadResume}
                  className="
                    mt-4
                    bg-black
                    text-white
                    px-6
                    py-3
                    rounded-2xl
                    font-medium
                    shadow-lg
                    hover:bg-neutral-900
                    transition-all
                    duration-300
                  "
                >
                  {analyzing
                    ? "Analyzing..."
                    : "Analyze Resume"}
                </motion.button>
              )}
            </div>

            {/* AI ANALYSIS RESULT */}
            {analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  bg-[#f8f8f8]
                  border
                  border-gray-200
                  rounded-3xl
                  p-6
                  space-y-5
                "
              >

                {/* SKILLS */}
                <div>
                  <h3 className="font-semibold text-black mb-3">
                    Extracted Skills
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="
                          px-4
                          py-2
                          bg-green-100
                          text-green-700
                          rounded-full
                          text-sm
                          font-medium
                        "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* PROJECTS */}
                <div>
                  <h3 className="font-semibold text-black mb-3">
                    Projects
                  </h3>

                  <div className="space-y-3">
                    {projects.map((project, index) => (
                      <div
                        key={index}
                        className="
                          bg-white
                          border
                          border-gray-200
                          rounded-2xl
                          px-4
                          py-3
                        "
                      >
                        {project}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={handleStart}
              className="
                w-full
                bg-black
                hover:bg-neutral-900
                text-white
                py-5
                rounded-2xl
                text-lg
                font-semibold
                shadow-xl
                transition-all
                duration-300
                mt-4
              "
            >
             {loading ? "Starting...":" Start Interview"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Step1SetUp;