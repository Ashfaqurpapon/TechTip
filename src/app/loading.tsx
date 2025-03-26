"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <motion.div
        className="flex flex-col items-center space-y-4 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative flex h-16 w-16 items-center justify-center">
          <motion.div
            className="absolute h-16 w-16 rounded-full border-4 border-dashed border-blue-500"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
          <motion.div
            className="h-8 w-8 rounded-full bg-blue-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </div>
        <motion.h1
          className="text-2xl font-semibold text-blue-400"
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          Global Loading...
        </motion.h1>
      </motion.div>
    </div>
  );
}
