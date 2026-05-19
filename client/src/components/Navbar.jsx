import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineCreditCard,
  HiOutlineLogout,
} from "react-icons/hi";
import { LuBotMessageSquare } from "react-icons/lu";
import { FiClock } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData } from "../redux/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthModel from "./AuthModel";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);

  const [showCreditMenu, setShowCreditMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [showAuth, setShowAuth] = useState(false);

  // ================= LOGOUT =================
  const handleLogout = async () => {
    try {
      await axios.get(
        "http://localhost:8000/api/auth/logout",
        {
          withCredentials: true,
        }
      );

      dispatch(clearUserData());

      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  const requireAuth = () => {
    if (!userData) {
      setShowAuth(true);
      return false;
    }

    return true;
  };

  return (
    <div className="w-full flex justify-center pt-5 px-4">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="
          w-full
          max-w-5xl
          bg-white
          border
          border-gray-200
          rounded-3xl
          px-6
          py-4
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          flex
          items-center
          justify-between
          relative
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-black
              text-white
              flex
              items-center
              justify-center
              shadow-md
            "
          >
            <LuBotMessageSquare size={20} />
          </div>

          <h1 className="text-lg font-bold tracking-tight text-black">
            InterviewIQ.AI
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">

          {/* CREDIT BUTTON */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!requireAuth()) return;

                setShowCreditMenu(!showCreditMenu);
                setShowProfileMenu(false);
              }}
              className="
                flex
                items-center
                gap-2
                bg-gray-100
                hover:bg-gray-200
                px-4
                py-2
                rounded-full
                transition-all
                duration-300
              "
            >
              <HiOutlineCreditCard
                className="text-gray-700"
                size={18}
              />

              {/* DYNAMIC CREDITS */}
              <span className="text-sm font-semibold text-gray-700"
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                }}>
                {userData?.credits || 0}
              </span>
            </motion.button>

            {/* CREDIT DROPDOWN */}
            <AnimatePresence>
              {showCreditMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="
                    absolute
                    top-14
                    right-0
                    w-64
                    bg-white
                    rounded-2xl
                    border
                    border-gray-200
                    shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                    p-4
                    z-50
                  "
                >
                  <p className="text-sm text-gray-500 leading-6">
                    Need more credits to continue interviews?
                  </p>

                  <button
                    className="
                      mt-4
                      w-full
                      bg-black
                      text-white
                      py-3
                      rounded-xl
                      font-medium
                      hover:bg-neutral-900
                      transition-all
                      duration-300
                    "
                    onClick={() => {
                      if (!userData) {
                        setShowAuth(true)
                        return;
                      }
                        navigate("/pricing")
                    }}
                  >
                    Buy more credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PROFILE */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!requireAuth()) return;

                setShowProfileMenu(!showProfileMenu);
                setShowCreditMenu(false);
              }}
              className="
                w-10
                h-10
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                font-semibold
                shadow-md
              "
            >
              {/* DYNAMIC FIRST LETTER */}
              {userData?.name?.charAt(0)?.toUpperCase() || "U"}
            </motion.button>

            {/* PROFILE DROPDOWN */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="
                    absolute
                    top-14
                    right-0
                    w-60
                    bg-white
                    rounded-2xl
                    border
                    border-gray-200
                    shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                    p-4
                    z-50
                  "
                >
                  {/* DYNAMIC NAME */}
                  <h2 className="text-blue-600 font-semibold text-lg">
                    {userData?.name || "User"}
                  </h2>

                  {/* DYNAMIC EMAIL */}
                  <p className="text-xs text-gray-400 mt-1">
                    {userData?.email}
                  </p>

                  <button
                    className="
                      mt-5
                      flex
                      items-center
                      gap-3
                      text-gray-600
                      hover:text-black
                      transition-all
                      duration-300
                      text-sm
                    "
                    onClick={() => {
                      if (!requireAuth()) return;

                      console.log("Open payment page");
                    }}
                  >
                    <FiClock size={18} />
                    Interview History
                  </button>

                 <button
  onClick={handleLogout}
  className="
    mt-4
    flex
    items-center
    gap-3
    text-red-500
    hover:text-red-600
    transition-all
    duration-300
    text-sm
  "
>
  <HiOutlineLogout size={18} />
  Logout
</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </div>
  );
}

export default Navbar;