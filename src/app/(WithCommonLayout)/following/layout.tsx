"use client";

import { ReactNode, useEffect, useState } from "react";
import Container from "@/src/components/UI/Container";
import Sidebarfollowing from "./Sidebarfollowing";
import { useSearchParams } from "next/navigation";
import envConfig from "@/src/config/envConfig";

export default function Layout({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId"); // Get userId from query parameters

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data based on the userId
    const fetchUser = async () => {
      try {
        if (userId) {
          const response = await fetch(
            `${envConfig.baseApi}/auth/getUser/${userId}`,
            {
              cache: "no-store",
            }
          );
          if (response.ok) {
            const data = await response.json();
            setUser(data.data); // Assuming the API returns the user object
          } else {
            console.error("Error fetching user data:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]); // Fetch data when userId changes

  return (
    <Container>
      <div className="my-3 flex w-full gap-12">
        <div className="w-2/5">
          {/* Pass the user data to the Sidebarfollowing */}
          <Sidebarfollowing user={user} />
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    </Container>
  );
}
