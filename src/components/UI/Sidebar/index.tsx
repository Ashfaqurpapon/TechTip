"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import Image from "next/image";

import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";

import { useUser } from "@/src/context/user.provider";
import { CldImage } from "next-cloudinary";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <div>
      <div className="p-2 rounded-xl bg-default-100">
        <div className="h-[330px] w-full rounded-md">
          {/* <Image
            alt="profile"
            className="object-cover w-full h-full rounded-md"
            height={330}
            src={user?.profilePhoto as string}
            width={330}
          /> */}
          <CldImage
            src={user?.imageUrlID ?? ""}
            alt={user?.imageUrlID ?? ""}
            width={300}
            height={300}
          ></CldImage>
        </div>
        <div className="my-3">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="text-sm break-words">{user?.email}</p>
        </div>
        <Button
          as={Link}
          className="w-full mt-2 rounded-md"
          href={"/profile/create-post"}
        >
          Create a post
        </Button>
      </div>
      <div className="p-2 mt-3 space-y-2 rounded-xl bg-default-100">
        <SidebarOptions
          links={user?.role === "user" ? userLinks : adminLinks}
        />
      </div>
    </div>
  );
};

export default Sidebar;
