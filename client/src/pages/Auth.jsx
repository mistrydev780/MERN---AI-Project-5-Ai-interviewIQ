import React from "react";
import { FcGoogle } from "react-icons/fc";
import { HiSparkles } from "react-icons/hi";
import { motion } from "framer-motion";
import { LuBotMessageSquare } from "react-icons/lu";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";



function Auth({ isModel = false }) {

  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let User = response.user;
      let name = User.displayName;
      let email = User.email;
      const result = await axios.post(serverURL + "/api/auth/google", { name, email },
        { withCredentials: true });
      dispatch(setUserData(result.data));

    } catch (err) {
      console.error("Google Authentication Error:", err);
      dispatch(setUserData(null));
    }
  }


  return (
    <div
      className={`
    ${isModel
          ? "min-h-auto"
          : "min-h-screen"
        }
    bg-[#f5f5f5]
    flex
    items-center
    justify-center
    px-4
    relative
    overflow-hidden
  `}
    >

      {/* Background Blur Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-200 rounded-full blur-[120px] opacity-40"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-black/10 rounded-full blur-[120px] opacity-40"></div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 p-8 relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-lg">
            <LuBotMessageSquare size={20} />
          </div>

          <h1 className="text-xl font-bold text-black tracking-tight">
            InterviewIQ.AI
          </h1>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-black leading-tight">
            Continue with
          </h2>

          {/* Highlight */}
          <div className="flex justify-center mt-4 mb-5">
            <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-green-100 border border-green-200 shadow-sm">
              <HiSparkles className="text-green-600" size={18} />

              <span className="text-green-600 font-semibold text-2xl">
                AI Smart Interview
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-7 max-w-sm mx-auto">
            Sign in to start AI-powered mock interviews, track your
            progress, and unlock detailed performance insights.
          </p>
        </motion.div>

        {/* Button */}
        <motion.button
          onClick={handleGoogleAuth}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="
            mt-10
            w-full
            bg-black
            hover:bg-neutral-900
            text-white
            py-4
            rounded-2xl
            font-medium
            flex
            items-center
            justify-center
            gap-3
            transition-all
            duration-300
            shadow-lg
            cursor-pointer
          "
        >
          <FcGoogle size={24} />

          <span className="text-[15px]">
            Continue with Google
          </span>
        </motion.button>

        {/* Bottom Text */}
        <p className="text-center text-xs text-gray-400 mt-6 leading-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}

export default Auth;