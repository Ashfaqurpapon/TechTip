"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { Avatar } from "@nextui-org/avatar";
import { getCookie } from "cookies-next";

import { useUser } from "@/src/context/user.provider";

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
      const res = await fetch(
        `http://localhost:8000/api/follower/get-followers`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      console.log("Limon all followers");
      const rslt = data.data.followers.followers;
      const userArray: IUser[] = [];

      for (let i = 0; i < rslt.length; i++) {
        const pp = await fetchUser(rslt[i]);
        console.log("hjbcsjhabjhcs");
        console.log(pp);
        userArray.push(pp);
      }

      setFollowers(userArray || []);
      setShowFollowers(!showFollowers); // Toggle visibility of followers list
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
    setLoading(false);
  };

  const fetchFollowing = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const token = getCookie("token");
      const res = await fetch(
        `http://localhost:8000/api/follower/get-following`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      console.log("Limon owwwww");
      const rslt = data.data.following.following;
      console.log(rslt);
      const userArray: IUser[] = [];

      for (let i = 0; i < rslt.length; i++) {
        const pp = await fetchUser(rslt[i]);
        console.log("hjbcsjhabjhcs");
        console.log(pp);
        userArray.push(pp);
      }

      setFollowing(userArray || []);
      setShowFollowing(!showFollowing); // Toggle visibility of following list
    } catch (error) {
      console.error("Error fetching following:", error);
    }
    setLoading(false);
  };

  const fetchUser = async (userId: string) => {
    console.log("fetched called");
    try {
      const response = await fetch(
        `http://localhost:8000/api/auth/getUser/${userId}`,
        {
          cache: "no-store",
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data.data;
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div>
      <div className="p-2 rounded-xl bg-default-100">
        <div className="h-[330px] w-full rounded-md">
          <CldImage
            src={user?.imageUrlID ?? ""}
            alt={user?.imageUrlID ?? ""}
            width={300}
            height={300}
          />
        </div>
        <div className="my-3">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="text-sm break-words">{user?.email}</p>
        </div>

        {/* Create Post Button */}
        <Button
          as={Link}
          className="w-full mt-2 rounded-md"
          href={"/profile/create-post"}
        >
          Create a post
        </Button>

        {/* Followers and Following Buttons */}
        <div className="mt-3 space-y-2">
          <Button onClick={fetchFollowers} className="w-full" color="primary">
            Followers
          </Button>
          <Button onClick={fetchFollowing} className="w-full" color="primary">
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
                    <Avatar alt={follower.name} />
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
                    <Avatar alt={followedUser.name} />
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
