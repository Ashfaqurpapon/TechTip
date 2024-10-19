"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schemas/register.schema";
import { log } from "console";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function RegisterPage() {
  const { mutate: handleUserRegistration, isPending } = useUserRegistration();
  const [imageUrlID, setimageUrlID] = useState("");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      imageUrlID,
    };
    console.log(userData);
    handleUserRegistration(userData);
  };

  if (isPending) {
    //  handle loading state
  }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <h3 className="my-2 text-xl font-bold">Register with FoundX</h3>
      <p className="mb-4">Help Lost Items Find Their Way Home</p>
      <div className="w-[35%]">
        <CldUploadWidget
          uploadPreset="Papon_Images"
          onSuccess={({ event, info }) => {
            if (event === "success") {
              setimageUrlID(info?.public_id);
            }
          }}
        >
          {({ open }) => {
            return (
              <button
                className="w-full my-3 rounded-md bg-default-900 text-default"
                onClick={() => open()}
              >
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>
        <FXForm
          //! Only for development
          defaultValues={{}}
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <FXInput label="Name" name="name" size="sm" />
          </div>
          <div className="py-3">
            <FXInput label="Email" name="email" size="sm" />
          </div>
          <div className="py-3">
            <FXInput label="Role" name="role" size="sm" />
          </div>

          <div className="py-3">
            <FXInput
              label="Password"
              name="password"
              size="sm"
              type="password"
            />
          </div>
          <div className="py-3">
            <FXInput label="Phone" name="phone" size="sm" />
          </div>
          <div className="py-3">
            <FXInput label="Address" name="address" size="sm" />
          </div>

          <Button
            className="w-full my-3 rounded-md bg-default-900 text-default"
            size="lg"
            type="submit"
          >
            Registration
          </Button>
        </FXForm>
        <div className="text-center">
          Already have an account ? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
