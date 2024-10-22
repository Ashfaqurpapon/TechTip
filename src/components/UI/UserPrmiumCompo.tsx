import React from "react";

import PremiumModal from "./PremiumModal";
interface IProps {
  isUserPremium: boolean;
}

const UserPrmiumCompo = ({ isUserPremium }: IProps) => {
  if (isUserPremium) {
    return (
      <h1 style={{ color: "goldenrod", padding: "10px" }}>
        Congrates, You are a premium user.{" "}
      </h1>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%", // To ensure it takes full width of the container
        padding: "10px",
      }}
    >
      <h1 style={{ color: "goldenrod" }}>Make you a premium user: </h1>
      {/* <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        // Click Me */}
      {/* </button> */}

      <PremiumModal />
    </div>
  );
};

export default UserPrmiumCompo;
