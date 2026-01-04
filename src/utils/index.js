import axios from "axios";

// Image Upload to ImgBB
export const imgUpload = async (imgFile) => {
  const formData = new FormData();
  formData.append("image", imgFile);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );

  return data?.data?.display_url;
};
