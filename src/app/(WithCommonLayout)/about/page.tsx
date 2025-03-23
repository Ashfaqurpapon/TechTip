"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-300 px-6 py-12 md:px-16">
      {/* Heading Section */}
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 md:text-5xl">
          Welcome to <span className="text-blue-600">Techtip</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Your ultimate platform for navigating the ever-evolving world of
          technology.
        </p>
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="mt-12 grid gap-10 md:grid-cols-2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            Why Choose Techtips
          </h2>
          <p className="mt-3 text-gray-600">
            Our platform offers expert advice, personal experiences, and
            user-generated content covering everything from troubleshooting
            common tech issues to exploring new software, apps, and digital
            tools.
          </p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            Features You’ll Love
          </h2>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>✔ Personalized user experience with authentication</li>
            <li>✔ Share your own tips and upvote valuable insights</li>
            <li>✔ Explore tutorials, reviews, and recommendations</li>
            <li>✔ Premium content with payment integration</li>
          </ul>
        </div>
      </motion.div>

      {/* Call-to-Action Section */}
      <motion.div
        className="mt-16 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold text-gray-800">
          Join the Tech Enthusiasts Today!
        </h2>
        <p className="mt-2 text-gray-600">
          Sign up and start exploring the best tech insights.
        </p>
        <Link href="/">
          <button className="mt-6 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
