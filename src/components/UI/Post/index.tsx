"use client";
import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { Heart, MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@nextui-org/button";

import { useUser } from "@/src/context/user.provider";
import { IComment, IPost, IUser } from "@/src/types";

import { CldImage } from "next-cloudinary";
import Comment from "../Comment";
import envConfig from "@/src/config/envConfig";

interface IProps {
  post: IPost;
}

// Define the type for the propsde

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

  // State to toggle comment box
  const [postUser, setPostUser] = useState<IUser | null>(null);
  const [localNumberOfLikes, setlocalNumberOfLikes] = useState<number>(0);
  const [allComments, setAllComments] = useState<IComment[]>([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const getComments = async () => {
    const token = getCookie("token");
    const response = await fetch(
      `${envConfig.baseApi}/comment/comment/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Optionally add token if needed for auth
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Limon all comments");
      console.log(data.data);
      setAllComments(data.data);
    } else {
      console.error("Error fetching user data:", response.statusText);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${envConfig.baseApi}/auth/getUser/${userId}`,
          {
            cache: "no-store",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPostUser(data.data); // Assuming the API returns the user object directly
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (userId) {
      fetchUser();
    }
    getComments();
  }, [userId]);
  console.log("gg");
  console.log(userId);

  // Handle comment form submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Comment submitted:", comment);

    const token = getCookie("token"); // Get token from cookies
    const commentData = {
      postId: _id,
      description: comment,
      isDeleted: false,
    };
    const res = await fetch(`${envConfig.baseApi}/comment/create-comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Optionally add token if needed for auth
      },
      body: JSON.stringify(commentData),
    });

    setComment(""); // Clear the comment box after submitting
    getComments();
  };

  // This is Vanilla JavaScript style to extract the token from document.cookie..
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const handleLiketSubmit = async () => {
    setlocalNumberOfLikes(localNumberOfLikes + 1);
    const token = getCookie("token"); // Get token from cookies
    const likeData = {};
    const res = await fetch(`${envConfig.baseApi}/post/increase-like/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Optionally add token if needed for auth
      },
      body: JSON.stringify(likeData),
    });
  };

  return (
    <div className="relative p-4 mb-2 rounded-md bg-default-100">
      {/* Premium Button in upper-right corner */}
      <Link href={`/following?userId=${userId}`} passHref></Link>
      {/* Card Header with post user information */}
      <div className="pb-2 border-b border-default-200">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <Avatar alt={userId?.name} />
            {/* <CldImage src={} alt={"Nai"} width={20} height={20}></CldImage> */}
            <div>
              <p className="font-semibold">{userId?.name}</p>
              <p className="text-xs text-gray-500">{userId?.email}</p>
              <p className="text-sm text-gray-600">
                Post category: {postCategory}
              </p>
            </div>
          </div>
        </div>

        {/* Post content */}
        <div className="py-4 border-b border-default-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Link href={`/found-items/${_id}`}>
                <h1 className="text-2xl font-bold cursor-pointer">
                  {postTitle}
                </h1>
              </Link>
            </div>
          </div>

          {/* Post description */}
          <p className="mb-4">{description}</p>

          {/* Image URL (Image Gallery) */}
          {/* {imageUrl && (
            <div className="mb-4">
              <img
                src={imageUrl}
                alt={postTitle}
                className="w-full h-auto rounded-md"
              />
            </div>
          )} */}

          <CldImage
            src={imageUrl}
            alt={imageUrl}
            width={300}
            height={300}
          ></CldImage>

          {/* Like and Comment buttons */}
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="flat"
              size="sm"
              className="mr-2 text-pink-500 hover:text-pink-600"
              onClick={() => handleLiketSubmit()}
            >
              <ThumbsUp size={16} className="mr-1" />
              Like ({numberOfLikes + localNumberOfLikes || 0})
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

          <Comment comments={allComments} />

          {/* Comment box */}
          {showCommentBox && (
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <Button
                  type="submit"
                  variant="solid"
                  size="sm"
                  className="text-white bg-blue-500"
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
