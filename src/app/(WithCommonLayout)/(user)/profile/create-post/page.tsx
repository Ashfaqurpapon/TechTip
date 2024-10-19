"use client";

import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { allDistict } from "@bangladeshi/bangladesh-address";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import FXInput from "@/src/components/form/FXInput";
import FXDatePicker from "@/src/components/form/FXDatePicker";
import dateToISO from "@/src/utils/dateToISO";
import FXSelect from "@/src/components/form/FXSelect";
import { useGetCategories } from "@/src/hooks/categoreis.hook";
import FXTextarea from "@/src/components/form/FXTextArea";
import { AddIcon, TrashIcon } from "@/src/assets/icons";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";
import Loading from "@/src/components/UI/Loading";
import generateDescription from "@/src/services/ImageDescription";
import { CldUploadWidget } from "next-cloudinary";

// const cityOptions = allDistict()
//   .sort()
//   .map((city: string) => {
//     return {
//       key: city,
//       label: city,
//     };
//   });

export default function CreatePost() {
  // const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  // const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrlID, setimageUrlID] = useState("");

  const router = useRouter();

  // const {
  //   mutate: handleCreatePost,
  //   isPending: createPostPending,
  //   isSuccess,
  // } = useCreatePost();

  const { user } = useUser();

  // const {
  //   data: categoriesData,
  //   isLoading: categoryLoading,
  //   isSuccess: categorySuccess,
  // } = useGetCategories();

  let categoryOption: { key: string; label: string }[] = [];

  // if (categoriesData?.data && !categoryLoading) {
  //   categoryOption = categoriesData.data
  //     .sort()
  //     .map((category: { _id: string; name: string }) => ({
  //       key: category._id,
  //       label: category.name,
  //     }));
  // }

  const methods = useForm();

  const { control, handleSubmit } = methods;

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    const postData = {
      ...data,
      imageUrl: imageUrlID,
      userId: user?._id,
      // questions: data.questions.map((que: { value: string }) => que.value),
      // dateFound: dateToISO(data.dateFound),
      // user: user!._id,
    };

    console.log("Limon post");
    console.log(postData);

    const token = getCookie("token");
    const res = await fetch(`http://localhost:8000/api/post/create-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Optionally add token if needed for auth
      },
      body: JSON.stringify(postData),
    });

    router.push("/profile");

    console.log("Limon result");
    console.log(res);

    // formData.append("data", JSON.stringify(postData));

    // for (let image of imageFiles) {
    //   formData.append("itemImages", image);
    // }

    // handleCreatePost(formData);
  };

  // const handleFieldAppend = () => {
  //   append({ name: "questions" });
  // };

  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files![0];

  //   setImageFiles((prev) => [...prev, file]);

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setImagePreviews((prev) => [...prev, reader.result as string]);
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };

  // if (!createPostPending && isSuccess) {
  //   router.push("/");
  // }

  return (
    <>
      {/* {createPostPending && <Loading />} */}
      <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
        <h1 className="text-2xl font-semibold">Post a found item</h1>
        <Divider className="mt-3 mb-5" />
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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="flex-1 min-w-fit">
                <FXInput label="Title" name="postTitle" />
              </div>
              {/* <div className="flex-1 min-w-fit">
                <FXDatePicker label="Found date" name="dateFound" />
              </div> */}
            </div>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="flex-1 min-w-fit">
                <FXInput label="Category" name="postCategory" />
              </div>
              <div className="flex-1 min-w-fit">
                {/* <label
                  className="flex items-center justify-center w-full transition-all duration-100 border-2 shadow-sm cursor-pointer h-14 rounded-xl border-default-200 text-default-500 hover:border-default-400"
                  htmlFor="image"
                >
                  Upload image
                </label>
                <input
                  multiple
                  className="hidden"
                  id="image"
                  type="file" */}
                {/* // onChange={(e) => handleImageChange(e)} */}
                {/* /> */}
              </div>
            </div>

            {/* {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-5 my-5">
                {imagePreviews.map((imageDataUrl) => (
                  <div
                    key={imageDataUrl}
                    className="relative p-2 border-2 border-dashed size-48 rounded-xl border-default-300"
                  >
                    <img
                      alt="item"
                      className="object-cover object-center w-full h-full rounded-md"
                      src={imageDataUrl}
                    />
                  </div>
                ))}
              </div>
            )} */}

            <div className="flex flex-wrap-reverse gap-2 py-2">
              <div className="flex-1 min-w-fit">
                <FXTextarea label="Description" name="description" />
              </div>
            </div>

            {/* <div className="flex justify-end gap-5">
              {methods.getValues("description ") && (
                <Button onClick={() => methods.resetField("description")}>
                  Clear
                </Button>
              )}
            </div> */}

            <Divider className="my-5" />
            <div className="flex justify-end">
              <Button size="lg" type="submit">
                Post
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
