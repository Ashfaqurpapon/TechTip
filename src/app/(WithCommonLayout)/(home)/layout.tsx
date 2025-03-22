import { ReactNode } from "react";

export default function layout({
  children,
  recentPosts,
}: {
  children: ReactNode;
  recentPosts: ReactNode;
}) {
  return (
    <>
      <div className="mx-auto mt-9">
        {children}
        {recentPosts}
      </div>
    </>
  );
}
