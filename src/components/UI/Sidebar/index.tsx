/* eslint-disable prettier/prettier */
"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { Avatar } from "@nextui-org/avatar";
import { getCookie } from "cookies-next";

import { useUser } from "@/src/context/user.provider";
import envConfig from "@/src/config/envConfig";

interface IUser {
  _id: string;
  name: string;
  email: string;
  imageUrlID?: string;
}

const Sidebar = () => {
  const { user } = useUser();
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followers, setFollowers] = useState<IUser[]>([]);
  const [following, setFollowing] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFollowers = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const token = getCookie("token");
      const res = await fetch(`${envConfig.baseApi}/follower/get-followers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      const rslt = data.data.followers.followers;
      const userArray: IUser[] = [];

      for (let i = 0; i < rslt.length; i++) {
        const pp = await fetchUser(rslt[i]);

        userArray.push(pp);
      }

      setFollowers(userArray || []);
      setShowFollowers(!showFollowers); // Toggle visibility of followers list
    } catch (error) {
      throw new Error(`Error fetching Followers: ${error}`);
    }
    setLoading(false);
  };

  const fetchFollowing = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const token = getCookie("token");
      const res = await fetch(`${envConfig.baseApi}/follower/get-following`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      const rslt = data.data.following.following;

      const userArray: IUser[] = [];

      for (let i = 0; i < rslt.length; i++) {
        const pp = await fetchUser(rslt[i]);

        userArray.push(pp);
      }

      setFollowing(userArray || []);
      setShowFollowing(!showFollowing); // Toggle visibility of following list
    } catch (error) {
      throw new Error(`Error fetching Followers: ${error}`);
    }
    setLoading(false);
  };

  const fetchUser = async (userId: string) => {
    try {
      const response = await fetch(
        `${envConfig.baseApi}/auth/getUser/${userId}`,
        {
          cache: "no-store",
        }
      );

      if (response.ok) {
        const data = await response.json();

        return data.data;
      } else {
        throw new Error(`Error fetching user data: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Error fetching Followers: ${error}`);
    }
  };

  return (
    <div>
      <div className="">
        <div className="w-36 h-36 rounded-full overflow-hidden ml-15 border-2 border-gray-300">
          <CldImage
            alt={user?.imageUrlID ?? ""}
            height={140}
            src={user?.imageUrlID ?? ""}
            width={140}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="my-3">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="text-sm break-words">{user?.email}</p>
        </div>

        {/* Create Post Button */}
        <Button
          as={Link}
          className="w-full mt-2 rounded-md bg-gray-400 "
          href={"/profile/create-post"}
        >
          Create a post
        </Button>

        {/* Followers and Following Buttons */}
        <div className="gap-2 flex mt-2">
          <Button className="w-full" color="primary" onClick={fetchFollowers}>
            Followers
          </Button>
          <Button className="w-full" color="primary" onClick={fetchFollowing}>
            Following
          </Button>
        </div>
      </div>

      {/* Followers List */}
      {showFollowers && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Followers</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">
              {followers.length === 0 ? (
                <p>No followers found.</p>
              ) : (
                followers.map((follower) => (
                  <div
                    key={follower._id}
                    className="flex items-center p-2 space-x-3 rounded-md bg-default-200"
                  >
                    <CldImage
                      className="w-10 h-10 border-2 border-black rounded-full object-cover"
                      src={follower.imageUrlID || "/default-avatar.png"}
                      alt={"Nai"}
                      width={40}
                      height={40}
                    ></CldImage>
                    <div>
                      <p className="font-semibold">{follower.name}</p>
                      <p className="text-sm text-gray-500">{follower.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Following List */}
      {showFollowing && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Following</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">
              {following.length === 0 ? (
                <p>No following found.</p>
              ) : (
                following.map((followedUser) => (
                  <div
                    key={followedUser._id}
                    className="flex items-center p-2 space-x-3 rounded-md bg-default-200"
                  >
                    <CldImage
                      className="w-10 h-10 border-2 border-black rounded-full object-cover"
                      src={followedUser.imageUrlID || "/default-avatar.png"}
                      alt={"Nai"}
                      width={40}
                      height={40}
                    ></CldImage>
                    <div>
                      <p className="font-semibold">{followedUser.name}</p>
                      <p className="text-sm text-gray-500">
                        {followedUser.email}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
