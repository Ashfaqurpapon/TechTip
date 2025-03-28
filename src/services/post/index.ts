"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { getCurrentUser } from "../AuthService";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("posts");

    return data;
  } catch (error) {
    throw new Error("Failed to create post");
  }
};

export const getPost = async (postId: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`${envConfig.baseApi}/items/${postId}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getMyPosts = async () => {
  const user = await getCurrentUser();

  // Check if user is valid before proceeding
  if (!user || !user._id) {
    throw new Error("User not found or not authenticated");
  }

  try {
    const res = await fetch(`${envConfig.baseApi}/post/user/${user._id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`, // Optionally add token if needed for auth
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(`Error fetching posts:`);
  }
};

export const getSelectedPeoplePosts = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required to fetch posts");
  }

  try {
    const res = await fetch(`${envConfig.baseApi}/post/user/${userId}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`, // If authentication is needed
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error(`Error fetching posts`);
  }
};
