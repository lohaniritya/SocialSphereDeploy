import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import { ApiError } from './ApiError.js';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        console.log("Failed to upload on cloudinary ", error);
        
        return null;
    }
}

const deleteImage = async function(url){

    try {
        
        if(url == "") { 
            throw new ApiError(401,"no files found to be deleted")
        }
        const lastSlashIndex = url.lastIndexOf('/');
        const lastDotIndex = url.lastIndexOf('.');
        const ID = url.slice(lastSlashIndex+1, lastDotIndex);
        
        if (!ID) {
            return new ApiError(400,"ID is empty")
        }
        const result = await cloudinary.uploader.destroy(ID);
        
    } catch (error) {
        
        console.log(error); 
    }
    
}



export {uploadOnCloudinary, deleteImage}