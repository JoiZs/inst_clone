import { v2 as cdy } from "cloudinary";

cdy.config({
  api_key: process.env.CDY_APIKEY,
  api_secret: process.env.CDY_APISECRECT,
  cloud_name: process.env.CDY_NAME,
});

export const uploadImg = async (imgStr: string) => {
  try {
    const res = await cdy.uploader.upload(imgStr, { upload_preset: "instimg" });
    return res;
  } catch (error) {
    throw new Error("Cannot upload");
  }
};
