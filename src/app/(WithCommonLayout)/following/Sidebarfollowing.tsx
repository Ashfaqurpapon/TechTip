"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { getCookie } from "cookies-next";

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address?: string;
  imageUrlID?: string;
}

interface SidebarfollowingProps {
  user: IUser | null;
}

export default function Sidebarfollowing({ user }: SidebarfollowingProps) {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followers, setFollowers] = useState<IUser[]>([]);
  const [following, setFollowing] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // Follow state

  const fetchFollowers = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const token = getCookie("token");
      const res = await fetch(
        `http://localhost:8000/api/follower/get-otherUser-followers/${user._id}`,
        // `http://localhost:8000/api/profile/${user._id}/followers`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add bearer token for authentication
          },
        }
      );

      const data = await res.json();
      setFollowers(data?.followers || []);
      setShowFollowers(!showFollowers); // Toggle the followers list
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
    setLoading(false);
  };

  const fetchFollowing = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const token = getCookie("token"); // Retrieve token from cookies
      const res = await fetch(
        // `http://localhost:8000/api/profile/${user._id}/following`,
        `http://localhost:8000/api/follower/get-otherUser-following/${user._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add bearer token for authentication
          },
        }
      );

      const data = await res.json();
      setFollowing(data?.following || []);
      setShowFollowing(!showFollowing); // Toggle the following list
    } catch (error) {
      console.error("Error fetching following:", error);
    }
    setLoading(false);
  };

  const toggleFollow = async () => {
    // Logic to follow/unfollow user
    setIsFollowing(!isFollowing); // Toggle the follow state

    if (isFollowing == false) {
      await handlefollowUser(user?._id ?? "");
    } else {
      await handleUnfollow(user?._id ?? "");
    }
  };

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const handlefollowUser = async (userId: string) => {
    const token = getCookie("token"); // Get token from cookies
    const likeData = {};
    const res = await fetch(
      `http://localhost:8000/api/follower/add-follower/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Optionally add token if needed for auth
        },
        body: JSON.stringify(likeData),
      }
    );

    console.log("Limon follow");
    console.log(res);
  };

  const handleUnfollow = async (userId: string) => {
    const token = getCookie("token"); // Get token from cookies
    const likeData = {};
    const res = await fetch(
      `http://localhost:8000/api/follower/remove-follower/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Optionally add token if needed for auth
        },
        body: JSON.stringify(likeData),
      }
    );
    console.log("Limon unfollow");
    console.log(res);
  };

  if (!user) {
    return <p>Loading user information...</p>;
  }

  return (
    <div>
      <div className="relative p-2 rounded-xl bg-default-100">
        <div className="h-[330px] w-full rounded-md"></div>
        <div className="relative my-3">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="text-sm break-words">{user?.email}</p>

          {/* Follow Button */}
          <Button
            className="absolute top-0 right-0"
            // Change button color based on follow state
            onClick={toggleFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </div>
      </div>

      {/* Followers and Following Buttons */}
      <div className="p-2 mt-3 space-y-2 rounded-xl bg-default-100">
        <div className="flex justify-between">
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
}
