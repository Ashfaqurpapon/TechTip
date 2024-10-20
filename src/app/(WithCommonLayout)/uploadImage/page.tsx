"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function Page() {
  const [publicId, setPublicId] = useState("");

  return (
    <div>
      <h1> This is About page </h1>
      <CldUploadWidget
        uploadPreset="Papon_Images"
        onSuccess={({ event, info }) => {
          // if (event === "success") {
          //   setPublicId(info?.public_id);
          // }
          if (
            typeof info === "object" &&
            info !== null &&
            "public_id" in info
          ) {
            setPublicId(info.public_id);
          }
        }}
      >
        {({ open }) => {
          return <button onClick={() => open()}>Upload an Image</button>;
        }}
      </CldUploadWidget>

      {publicId && (
        <CldImage
          src={publicId}
          alt={publicId}
          width={300}
          height={300}
        ></CldImage>
      )}
    </div>
  );
}
