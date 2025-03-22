import React from "react";
import { IComment } from "@/src/types";

interface CommentProps {
  comments: IComment[];
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
      {comments.length === 0 ? (
        <p style={{ color: "gray", textAlign: "center" }}>No comments</p>
      ) : (
        comments.map((comment, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
              width: "100%",
              wordWrap: "break-word",
            }}
          >
            <p style={{ margin: 0 }}>{comment.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Comment;
