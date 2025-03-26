/* eslint-disable prettier/prettier */
"use client";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

import Sidebarfollowing from "./Sidebarfollowing";

import Container from "@/src/components/UI/Container";
import envConfig from "@/src/config/envConfig";
import { useUser } from "@/src/context/user.provider";
import { log } from "console";

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
            throw new Error(`Error fetching user data: ${response.statusText}`);
          }
        }
      } catch (error) {
        throw new Error(`Error fetching user: ${error}`);
      }
    };

    fetchUser();
  }, [userId]); // Fetch data when userId changes

  return (
    <Container>
      <div className="my-3 flex w-full gap-12   ">
        <div className="w-2/5 h-screen sticky top-0">
          {/* Pass the user data to the Sidebarfollowing */}
          <Sidebarfollowing user={user} />
        </div>
        <div className="w-4/5">
          {React.cloneElement(children as React.ReactElement, { userId })}
        </div>
      </div>
    </Container>
  );
}
