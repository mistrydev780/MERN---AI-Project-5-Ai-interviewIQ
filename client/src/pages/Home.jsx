import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


import {
  HiSparkles,
  HiOutlineClock,
} from "react-icons/hi";

import {
  LuBotMessageSquare,
} from "react-icons/lu";

import {
  FiMic,
} from "react-icons/fi";
import aiAns from "../assets/ai-ans.png";
import resume from "../assets/resume.png";
import pdf from "../assets/pdf.png";
import history from "../assets/history.png";
import HR from "../assets/HR.png";
import tech from "../assets/tech.png";
import MM from "../assets/MM.png";
import credit from "../assets/credit.png";
import Footer from "../components/Footer";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-[#f5f5f5] overflow-hidden relative">

      {/* BACKGROUND BLUR */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-green-200 rounded-full blur-[120px] opacity-40"></div>

      <div className="absolute bottom-[-150px] right-[-120px] w-[320px] h-[320px] bg-black/10 rounded-full blur-[120px] opacity-40"></div>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20">

        {/* TOP BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            flex
            items-center
            gap-2
            bg-white
            border
            border-green-200
            px-5
            py-2
            rounded-full
            shadow-sm
          "
        >
          <HiSparkles className="text-green-500" size={18} />

          <span className="text-sm font-medium text-gray-700">
            AI Powered Smart Interview Platform
          </span>
        </motion.div>

        {/* HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
            mt-10
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
            tracking-tight
            text-black
            max-w-5xl
          "
        >
          Practice Interviews with
          <br />

          <span className="text-green-500">
            AI Intelligence
          </span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="
            mt-8
            text-gray-500
            text-lg
            leading-8
            max-w-2xl
          "
        >
          Role-based mock interviews with smart follow-ups,
          adaptive difficulty and real-time performance evaluation.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-5 mt-10 flex-wrap justify-center"
        >
          <button
            className="
              bg-black
              hover:bg-neutral-900
              text-white
              px-8
              py-4
              rounded-2xl
              font-medium
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
            "
              onClick={() => navigate("/interview")}
          >
            Start Interview
          </button>

          <button
            className="
              bg-white
              border
              border-gray-200
              hover:border-black
              text-black
              px-8
              py-4
              rounded-2xl
              font-medium
              shadow-sm
              transition-all
              duration-300
              hover:scale-105
            "

             onClick={() => navigate("/history")}
          >
            View History
          </button>
        </motion.div>

        {/* USER WELCOME */}
        {userData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <p className="text-gray-500 text-sm">
              Welcome back,
              <span className="font-semibold text-black ml-2">
                {userData?.name}
              </span>
            </p>
          </motion.div>
        )}

        {/* INTERVIEW STEPS SECTION */}
<div className="w-full max-w-7xl mt-32 px-4">

  {/* GRID */}
  <div className="grid md:grid-cols-3 gap-10">

    {/* STEP 1 */}
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -10,
        rotate: 0,
      }}
      className="
        relative
        bg-white
        rounded-[40px]
        border
        border-gray-200
        shadow-[0_15px_50px_rgba(0,0,0,0.06)]
        px-10
        py-16
        text-center
        overflow-hidden
      "
    >
      {/* ICON */}
      <div
        className="
          absolute
          -top-8
          left-1/2
          -translate-x-1/2
          w-20
          h-20
          rounded-[24px]
          bg-white
          border-[5px]
          border-green-400
          shadow-xl
          flex
          items-center
          justify-center
        "
      >
        <LuBotMessageSquare
          className="text-green-500"
          size={32}
        />
      </div>

      {/* STEP */}
      <p className="text-green-500 font-bold tracking-widest text-sm mt-6">
        STEP 1
      </p>

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-black mt-5 leading-tight">
        Role & Experience Selection
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-500 leading-8 mt-5 text-lg">
        AI adjusts difficulty based on selected
        job role and experience level.
      </p>
    </motion.div>

    {/* STEP 2 */}
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 2 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{
        y: -10,
        rotate: 0,
      }}
      className="
        relative
        bg-white
        rounded-[40px]
        border
        border-gray-200
        shadow-[0_15px_50px_rgba(0,0,0,0.06)]
        px-10
        py-16
        text-center
        overflow-hidden
      "
    >
      {/* ICON */}
      <div
        className="
          absolute
          -top-8
          left-1/2
          -translate-x-1/2
          w-20
          h-20
          rounded-[24px]
          bg-white
          border-[5px]
          border-green-400
          shadow-xl
          flex
          items-center
          justify-center
        "
      >
        <FiMic
          className="text-green-500"
          size={32}
        />
      </div>

      {/* STEP */}
      <p className="text-green-500 font-bold tracking-widest text-sm mt-6">
        STEP 2
      </p>

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-black mt-5 leading-tight">
        Smart Voice Interview
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-500 leading-8 mt-5 text-lg">
        Dynamic follow-up questions based
        on your interview answers.
      </p>
    </motion.div>

    {/* STEP 3 */}
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{
        y: -10,
        rotate: 0,
      }}
      className="
        relative
        bg-white
        rounded-[40px]
        border
        border-gray-200
        shadow-[0_15px_50px_rgba(0,0,0,0.06)]
        px-10
        py-16
        text-center
        overflow-hidden
      "
    >
      {/* ICON */}
      <div
        className="
          absolute
          -top-8
          left-1/2
          -translate-x-1/2
          w-20
          h-20
          rounded-[24px]
          bg-white
          border-[5px]
          border-green-400
          shadow-xl
          flex
          items-center
          justify-center
        "
      >
        <HiOutlineClock
          className="text-green-500"
          size={32}
        />
      </div>

      {/* STEP */}
      <p className="text-green-500 font-bold tracking-widest text-sm mt-6">
        STEP 3
      </p>

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-black mt-5 leading-tight">
        Timer Based Simulation
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-500 leading-8 mt-5 text-lg">
        Real interview pressure with time
        tracking and smart monitoring.
      </p>
    </motion.div>
  </div>
</div>
        {/* ADVANCED AI SECTION */}
        <div className="w-full max-w-6xl mt-32 px-4">

          {/* HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
      text-4xl
      md:text-5xl
      font-bold
      text-center
      tracking-tight
      text-black
    "
          >
            Advanced AI{" "}
            <span className="text-green-500">
              Capabilities
            </span>
          </motion.h2>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">

            {/* CARD 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{
                y: -8,
              }}
              className="
        bg-white
        rounded-[30px]
        border
        border-gray-200
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        p-8
        flex
        items-center
        gap-6
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        transition-all
        duration-300
      "
            >
              <img
                src={aiAns}
                alt="AI Answer"
                className="w-40 object-contain"
              />

              <div>
                <h3 className="text-2xl font-bold text-black">
                  AI Answer Evaluation
                </h3>

                <p className="text-gray-500 leading-7 mt-4">
                  Scores communication, technical
                  accuracy and confidence using
                  advanced AI analysis.
                </p>
              </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                y: -8,
              }}
              className="
        bg-white
        rounded-[30px]
        border
        border-gray-200
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        p-8
        flex
        items-center
        gap-6
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        transition-all
        duration-300
      "
            >
              <img
                src={resume}
                alt="Resume"
                className="w-40 object-contain"
              />

              <div>
                <h3 className="text-2xl font-bold text-black">
                  Resume Based Interview
                </h3>

                <p className="text-gray-500 leading-7 mt-4">
                  AI generates project-specific
                  questions based on uploaded
                  resume and experience.
                </p>
              </div>
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                y: -8,
              }}
              className="
        bg-white
        rounded-[30px]
        border
        border-gray-200
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        p-8
        flex
        items-center
        gap-6
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        transition-all
        duration-300
      "
            >
              <img
                src={pdf}
                alt="PDF Report"
                className="w-40 object-contain"
              />

              <div>
                <h3 className="text-2xl font-bold text-black">
                  Downloadable PDF Report
                </h3>

                <p className="text-gray-500 leading-7 mt-4">
                  Generate beautiful PDF reports
                  with interview scores and
                  AI improvement suggestions.
                </p>
              </div>
            </motion.div>

            {/* CARD 4 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                y: -8,
              }}
              className="
        bg-white
        rounded-[30px]
        border
        border-gray-200
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        p-8
        flex
        items-center
        gap-6
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        transition-all
        duration-300
      "
            >
              <img
                src={history}
                alt="History"
                className="w-40 object-contain"
              />

              <div>
                <h3 className="text-2xl font-bold text-black">
                  History & Analytics
                </h3>

                <p className="text-gray-500 leading-7 mt-4">
                  Track interview progress with
                  performance graphs and topic
                  based analysis.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* MULTIPLE INTERVIEW MODES */}
        <div className="w-full max-w-6xl mt-32 px-4">

          {/* HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
      text-4xl
      md:text-5xl
      font-bold
      text-center
      tracking-tight
      text-black
    "
          >
            Multiple Interview{" "}
            <span className="text-green-500">
              Modes
            </span>
          </motion.h2>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">

            {/* CARD 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{
                y: -8,
              }}
              className="
        bg-white
        rounded-[30px]
        border
        border-gray-200
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        p-8
        flex
        items-center
        justify-between
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        transition-all
        duration-300
      "
            >
              <div>
                <h3 className="text-2xl font-bold text-black">
                  HR Interview Mode
                </h3>

                <p className="text-gray-500 leading-7 mt-4 max-w-sm">
                  Behavioral and communication
                  based interview evaluation.
                </p>
              </div>

              <img
                src={HR}
                alt="HR"
                className="w-32 object-contain"
              />
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                y: -8,
              }}
              className="
        bg-white
        rounded-[30px]
        border
        border-gray-200
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        p-8
        flex
        items-center
        justify-between
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        transition-all
        duration-300
      "
            >
              <div>
                <h3 className="text-2xl font-bold text-black">
                  Technical Mode
                </h3>

                <p className="text-gray-500 leading-7 mt-4 max-w-sm">
                  Deep technical questioning
                  based on selected role.
                </p>
              </div>

              <img
                src={tech}
                alt="Technical"
                className="w-32 object-contain"
              />
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                y: -8,
              }}
              className="
        bg-white
        rounded-[30px]
        border
        border-gray-200
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        p-8
        flex
        items-center
        justify-between
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        transition-all
        duration-300
      "
            >
              <div>
                <h3 className="text-2xl font-bold text-black">
                  Confidence Detection
                </h3>

                <p className="text-gray-500 leading-7 mt-4 max-w-sm">
                  Basic tone and voice analysis
                  insights for improvement.
                </p>
              </div>

              <img
                src={MM}
                alt="Confidence"
                className="w-32 object-contain"
              />
            </motion.div>

            {/* CARD 4 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                y: -8,
              }}
              className="
        bg-white
        rounded-[30px]
        border
        border-gray-200
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        p-8
        flex
        items-center
        justify-between
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        transition-all
        duration-300
      "
            >
              <div>
                <h3 className="text-2xl font-bold text-black">
                  Credits System
                </h3>

                <p className="text-gray-500 leading-7 mt-4 max-w-sm">
                  Unlock premium interview
                  sessions easily with credits.
                </p>
              </div>

              <img
                src={credit}
                alt="Credits"
                className="w-32 object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
       <Footer />
    </div>
  );
}

export default Home;