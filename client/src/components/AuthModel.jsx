import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import Auth from "../pages/Auth";

function AuthModel({ onClose }) {
  const { userData } = useSelector((state) => state.user);

  // ================= AUTO CLOSE =================
  useEffect(() => {
    if (userData) {
      onClose();
    }
  }, [userData, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="
          fixed
          inset-0
          z-[999]
          flex
          items-center
          justify-center
          bg-black/20
          backdrop-blur-sm
          px-4
        "
      >
        {/* MODAL CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="
            relative
            w-full
            max-w-md
          "
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="
              absolute
              top-5
              right-5
              z-50
              text-gray-500
              hover:text-black
              transition-all
              duration-300
              bg-white
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              shadow-md
            "
          >
            <FaTimes size={15} />
          </button>

          {/* AUTH COMPONENT */}
          <div className="rounded-3xl overflow-hidden">
            <Auth isModel={true} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AuthModel;