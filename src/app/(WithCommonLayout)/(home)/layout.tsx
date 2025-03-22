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
      <div className="mx-auto mt-9 mb-7">
        {children}
        {recentPosts}
      </div>
    </>
  );
}
