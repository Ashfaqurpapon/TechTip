import React from "react";

const CardSkeleton = () => {
  return (
    <div className="p-4 mb-7 rounded-md shadow-lg shadow-purple-800 bg-gray-200 animate-pulse">
      {/* Header Section */}
      <div className="pb-2 border-b border-gray-300">
        <div className="flex items-center gap-3 pb-4">
          {/* Circular Avatar Placeholder */}
          <div className="w-10 h-10 rounded-full bg-gray-400"></div>
          <div>
            <div className="w-24 h-4 bg-gray-400 rounded"></div>
            <div className="w-36 h-3 mt-1 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Post Title */}
      <div className="w-3/5 h-6 mt-4 bg-gray-400 rounded"></div>

      {/* Category */}
      <div className="w-2/5 h-4 mt-2 bg-gray-300 rounded"></div>

      {/* Description Placeholder */}
      <div className="w-full h-20 mt-4 bg-gray-300 rounded"></div>

      {/* Image Placeholder */}
      <div className="w-full h-40 mt-4 bg-gray-400 rounded"></div>

      {/* Like & Comment Buttons */}
      <div className="flex items-center justify-between mt-4">
        <div className="w-20 h-8 bg-gray-400 rounded"></div>
        <div className="w-20 h-8 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
