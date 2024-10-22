/* eslint-disable prettier/prettier */
"use client";
import { useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { CldImage } from "next-cloudinary";

import Comment from "../Comment";

import { IComment, IPost, IUser } from "@/src/types";
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
  const {} = (userId as IUser) || {};

  // State to toggle comment box
  // const [postUser, setPostUser] = useState<IUser | null>(null);
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

      setAllComments(data.data);
    } else {
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetch(
  //         `${envConfig.baseApi}/auth/getUser/${userId}`,
  //         {
  //           cache: "no-store",
  //         }
  //       );

  //       if (response.ok) {
  //         const data = await response.json();

  //         setPostUser(data.data); // Assuming the API returns the user object directly
  //       } else {
  //         console.error("Error fetching user data:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     }
  //   };

  //   if (userId) {
  //     fetchUser();
  //   }
  //   getComments();
  // }, [userId]);

  // Handle comment form submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    // eslint-disable-next-line no-console
    console.log(res);

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

    // eslint-disable-next-line no-console
    console.log(res);
  };

  return (
    <div className="relative p-4 mb-2 rounded-md bg-default-100">
      {/* Premium Button in upper-right corner */}
      <Link passHref href={`/following?userId=${userId}`} />
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

          <CldImage alt={imageUrl} height={300} src={imageUrl} width={300} />

          {/* Like and Comment buttons */}
          <div className="flex items-center justify-between mt-4">
            <Button
              className="mr-2 text-pink-500 hover:text-pink-600"
              size="sm"
              variant="flat"
              onClick={() => handleLiketSubmit()}
            >
              <ThumbsUp className="mr-1" size={16} />
              Like ({numberOfLikes + localNumberOfLikes || 0})
            </Button>
            <Button
              className="mr-2 text-blue-500 hover:text-blue-600"
              size="sm"
              variant="flat"
              onClick={() => setShowCommentBox(!showCommentBox)}
            >
              <MessageCircle className="mr-1" size={16} />
              Comment
            </Button>
          </div>

          <Comment comments={allComments} />

          {/* Comment box */}
          {showCommentBox && (
            <form className="mt-4" onSubmit={handleCommentSubmit}>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <Button
                  className="text-white bg-blue-500"
                  size="sm"
                  type="submit"
                  variant="solid"
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
