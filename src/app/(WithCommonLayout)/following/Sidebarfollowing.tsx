import { Button } from "@nextui-org/button";
import Link from "next/link";

interface IUser {
  _id: string; // Assuming you are converting the ObjectId to a string
  name: string;
  email: string;
  role: string;
  password?: string;
  phone: string;
  address?: string;
  imageUrlID?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  // Add any other user properties
}

interface SidebarfollowingProps {
  user: IUser | null;
}

export default function Sidebarfollowing({ user }: SidebarfollowingProps) {
  if (!user) {
    return <p>Loading user information...</p>;
  }

  return (
    <div>
      <div className="rounded-xl bg-default-100 p-2">
        <div className="h-[330px] w-full rounded-md">
          {/* <Image
          alt="profile"
          className="w-full h-full object-cover rounded-md"
          height={330}
          src={user?.profilePhoto as string}
          width={330}
        /> */}
        </div>
        <div className="my-3">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="break-words text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Followers and Following Buttons */}
      <div className="mt-3 space-y-2 rounded-xl bg-default-100 p-2">
        <div className="flex justify-between">
          <Button
            as={Link}
            href={`/profile/${user?._id}/followers`}
            className="w-full"
            color="primary"
          >
            Followers
          </Button>
          <Button
            as={Link}
            href={`/profile/${user?._id}/following`}
            className="w-full"
            color="primary"
          >
            Following
          </Button>
        </div>
      </div>
    </div>
  );
}
