import envConfig from "@/src/config/envConfig";

export const getRecentPosts = async () => {
  // const fetchOption = {
  //   next: {
  //     tags: ["posts"],
  //   },
  // };

  //const res = await fetch(`${envConfig.baseApi}/post`, fetchOption);
  const res = await fetch(`${envConfig.baseApi}/post`, {
    cache: "no-store",
  });

  // return res.json();
  //console.log("Limon recent post");
  //console.log(await res.json());
  return res.json();
};
