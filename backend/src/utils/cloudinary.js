import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //uppload a file on couldinary server
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has already been uploaded
    fs.unlinkSync(localFilePath);
    console.log("File is uploaded on cloudinary server", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed...
    return null;
  }
};

// Function to extract public ID from Cloudinary URL
const getPublicIdFromUrl = (url) => {
  const parts = url.split('/');
  const publicIdWithExtension = parts[parts.length - 1];
  const publicId = publicIdWithExtension.split('.')[0];
  return publicId;
};

// Function to delete an image from Cloudinary by URL
const deleteImageByUrl = async (url) => {
  const publicId = getPublicIdFromUrl(url);
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('Image deleted:', result);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

export { uploadOnCloudinary, deleteImageByUrl };
