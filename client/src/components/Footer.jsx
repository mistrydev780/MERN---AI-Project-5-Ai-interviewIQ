import React from "react";
import { motion } from "framer-motion";
import { LuBotMessageSquare } from "react-icons/lu";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="w-full flex justify-center px-4 mt-32 mb-8">
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="
          w-full
          max-w-6xl
          bg-white
          border
          border-gray-200
          rounded-[36px]
          shadow-[0_15px_60px_rgba(0,0,0,0.06)]
          px-8
          md:px-12
          py-10
          relative
          overflow-hidden
        "
      >
        {/* BACKGROUND BLUR */}
        <div className="absolute top-[-60px] left-[-60px] w-[180px] h-[180px] bg-green-200 rounded-full blur-[100px] opacity-30"></div>

        <div className="absolute bottom-[-80px] right-[-80px] w-[200px] h-[200px] bg-black/10 rounded-full blur-[100px] opacity-20"></div>

        {/* CONTENT */}
        <div className="relative z-10">

          {/* TOP */}
          <div
            className="
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-8
            "
          >
            {/* LEFT */}
            <div className="text-center md:text-left">

              {/* LOGO */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                className="
                  inline-flex
                  items-center
                  gap-3
                  bg-black
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  shadow-lg
                "
              >
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-white
                    text-black
                    flex
                    items-center
                    justify-center
                  "
                >
                  <LuBotMessageSquare size={22} />
                </div>

                <h2 className="text-2xl font-bold tracking-tight">
                  InterviewIQ.AI
                </h2>
              </motion.div>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-6
                  text-gray-500
                  leading-8
                  max-w-2xl
                  text-lg
                "
              >
                AI-powered interview preparation platform
                helping developers improve technical and
                communication skills through smart mock interviews.
              </p>
            </div>

            {/* RIGHT CONTACT */}
            <div
              className="
                bg-[#f8f8f8]
                border
                border-gray-200
                rounded-3xl
                px-6
                py-5
                min-w-[280px]
                shadow-sm
              "
            >
              <p className="text-sm text-gray-400 font-medium">
                CONTACT
              </p>

              <h3 className="text-2xl font-bold text-black mt-2">
                Jangid Dev
              </h3>

              <div className="flex items-center gap-3 mt-4 text-gray-500">
                <FaEnvelope size={16} />

                <span className="text-sm">
                  devjangid788@gmail.com
                </span>
              </div>

              {/* SOCIALS */}
              <div className="flex items-center gap-4 mt-5">

                <motion.a
                  whileHover={{
                    y: -4,
                  }}
                  href="#"
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-white
                    border
                    border-gray-200
                    flex
                    items-center
                    justify-center
                    hover:bg-black
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  <FaGithub size={18} />
                </motion.a>

                <motion.a
                  whileHover={{
                    y: -4,
                  }}
                  href="#"
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-white
                    border
                    border-gray-200
                    flex
                    items-center
                    justify-center
                    hover:bg-black
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  <FaLinkedinIn size={18} />
                </motion.a>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="w-full h-[1px] bg-gray-200 my-8"></div>

          {/* BOTTOM */}
          <div
            className="
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-4
            "
          >
            <p className="text-sm text-gray-500">
              © 2026 InterviewIQ.AI — Built with AI by Jangid Dev
            </p>

            <div className="flex items-center gap-6 text-sm">
              <button className="text-gray-500 hover:text-black transition-all duration-300">
                Privacy
              </button>

              <button className="text-gray-500 hover:text-black transition-all duration-300">
                Terms
              </button>

              <button className="text-gray-500 hover:text-black transition-all duration-300">
                Support
              </button>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default Footer;