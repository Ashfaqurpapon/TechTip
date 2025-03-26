"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schemas/register.schema";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();
  const [imageUrlID, setimageUrlID] = useState("");
  const router = useRouter(); // Initialize router
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      imageUrlID,
    };
    localStorage.setItem("savedEmail", data.email);
    localStorage.setItem("savedPassword", data.password);

    handleUserRegistration(userData);
  };
  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/login");
      }
    }
  }, [isPending, isSuccess]);

  if (isPending) {
    //  handle loading state
  }

  return (
    <div className="mb-20 mt-10 flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <h3 className="my-2 text-xl font-bold">
        Register with
        <span className=" text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 ">
          {" "}
          Techtip{" "}
        </span>
      </h3>
      <p className="mb-4">Your go-to platform for all things tech</p>
      <div className="w-[35%]">
        <CldUploadWidget
          uploadPreset="Papon_Images"
          onSuccess={({ info }) => {
            //
            if (
              typeof info === "object" &&
              info !== null &&
              "public_id" in info
            ) {
              setimageUrlID(info.public_id);
            }
          }}
        >
          {({ open }) => {
            return (
              <button
                className="w-full p-4 my-3 rounded-md bg-default-900 text-default"
                onClick={() => open()}
              >
                Click here to Upload an Image
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
          <div className=" border-1 border-slate-400  rounded-xl ">
            <FXInput label="Name" name="name" size="sm" />
          </div>
          <div className=" border-1 border-slate-400  rounded-xl">
            <FXInput label="Email" name="email" size="sm" />
          </div>
          <div className=" border-1 border-slate-400  rounded-xl">
            <FXInput label="Role" name="role" size="sm" />
          </div>

          <div className=" border-1 border-slate-400  rounded-xl">
            <FXInput
              label="Password"
              name="password"
              size="sm"
              type="password"
            />
          </div>
          <div className=" border-1 border-slate-400  rounded-xl">
            <FXInput label="Phone" name="phone" size="sm" />
          </div>
          <div className=" border-1 border-slate-400  rounded-xl">
            <FXInput label="Address" name="address" size="sm" />
          </div>

          <Button
            className="w-full my-3 rounded-md bg-default-900 text-default"
            size="lg"
            type="submit" // This will trigger form submission
          >
            Register
          </Button>
        </FXForm>
        <div className="text-center">
          Already have an account ? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
