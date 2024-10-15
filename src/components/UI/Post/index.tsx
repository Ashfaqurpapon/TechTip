"use client";
import { useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { Heart, MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@nextui-org/button";

import { useUser } from "@/src/context/user.provider";
import { IPost, IUser } from "@/src/types";

interface IProps {
  post: IPost;
}

export default function Post({ post }: IProps) {
  const {
    postTitle,
    description,
    _id,
    imageUrl,
    userId,
    postCategory,
    numberOfLikes,
  } = post || {};
  const { name, email } = (userId as IUser) || {};

  const { user: loggedInUser } = useUser();

  // State to toggle comment box visibility
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  // Handle comment form submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Comment submitted:", comment);

    // Here you would normally send the comment to the backend via API
    setComment(""); // Clear the comment box after submitting
  };

  return (
    <div className="mb-2 rounded-md bg-default-100 p-4 relative">
      {/* Premium Button */}
      <Button
        size="sm"
        variant="solid"
        className="absolute top-2 right-2 bg-yellow-500 text-white"
      >
        Premium
      </Button>

      {/* Card Header with loggedInUser's name */}
      <div className="border-b border-default-200 pb-2">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <Avatar alt={loggedInUser?.name} />
            <div>
              <p className="font-semibold">{loggedInUser?.name}</p>
              <p className="text-xs text-gray-500">{loggedInUser?.email}</p>
              <p className="text-sm text-gray-600">
                Post category: {postCategory}
              </p>
            </div>
          </div>
        </div>

        {/* Post content */}
        <div className="border-b border-default-200 py-4">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Link href={`/found-items/${_id}`}>
                <h1 className="cursor-pointer text-2xl font-bold">
                  {postTitle}
                </h1>
              </Link>
            </div>
          </div>

          {/* Post description */}
          <p className="mb-4">{description}</p>

          {/* Image URL (Image Gallery) */}
          {imageUrl && (
            <div className="mb-4">
              <img
                src={imageUrl}
                alt={postTitle}
                className="w-full h-auto rounded-md"
              />
            </div>
          )}

          {/* Like and Comment buttons */}
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="flat"
              size="sm"
              className="mr-2 text-pink-500 hover:text-pink-600"
            >
              <ThumbsUp size={16} className="mr-1" />
              Like ({numberOfLikes || 0})
            </Button>
            <Button
              variant="flat"
              size="sm"
              className="mr-2 text-blue-500 hover:text-blue-600"
              onClick={() => setShowCommentBox(!showCommentBox)}
            >
              <MessageCircle size={16} className="mr-1" />
              Comment
            </Button>
          </div>

          {/* Comment box */}
          {showCommentBox && (
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="mt-2 flex justify-end">
                <Button
                  type="submit"
                  variant="solid"
                  size="sm"
                  className="bg-blue-500 text-white"
                >
                  Post Comment
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
