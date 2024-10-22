import React from "react";

import { IComment } from "@/src/types";

// Define the type for the props
interface CommentProps {
  comments: IComment[]; // Array of comments as props
}

const Comment = ({ comments }: CommentProps) => {
  return (
    <div style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}>
      <h2 style={{ textAlign: "left", margin: "10px 0" }}>All Comments</h2>
      <hr
        style={{
          marginBottom: "15px",
          borderColor: "#f5f5f5",
        }}
      />
      {comments.map((comment, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#333", // Uses the CSS variable for background
            color: "#f5f5f5", // Uses the CSS variable for text color
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
            width: "100%",
            wordWrap: "break-word", // Ensure long words break to fit the width
          }}
        >
          <p style={{ margin: 0 }}>{comment.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Comment;
