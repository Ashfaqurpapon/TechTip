"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/src/lib/AxiosInstance";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);
    //console.log(data);
    if (data.success) {
      cookies().set("token", data?.token);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signin", userData);
    //console.log(data?.data?.accessToken);
    if (data.success) {
      cookies().set("token", data?.token);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("token");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("token")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    const { data } = await axiosInstance.get(
      `/auth/getUser/${decodedToken.userId}`
    );

    return {
      _id: decodedToken.userId,
      name: data.data.name,
      email: data.data.email,
      phone: data.data.phone,
      role: decodedToken.role,
      // status: decodedToken.status,
      // profilePhoto: decodedToken.profilePhoto,
    };
  }

  return decodedToken;
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("token")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};
