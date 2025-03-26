import { Button } from "@nextui-org/button";
import Link from "next/link";

import Container from "@/src/components/UI/Container";
import CardSkeleton from "@/src/components/UI/CardSkeleton";

export default async function RecentPosts() {
  return (
    <div className="mx-56">
      <CardSkeleton />
    </div>
  );
}
