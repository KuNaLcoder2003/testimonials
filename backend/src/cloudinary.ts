import cloudinary from "cloudinary";
import dotenv from "dotenv"
dotenv.config();

const cloud = cloudinary.v2

cloud.config({
    cloud_name: process.env.cloud_name as string,
    api_key: process.env.api_key as string,
    api_secret: process.env.api_secret as string
})

interface CloudinaryResponse {
    valid?: boolean
    error?: string
    url: string,
    public_id?: string
}

const uploadAsset = async (buffer: Buffer, folder_name: string, type: ("video" | "image" | "raw" | "auto")): Promise<CloudinaryResponse> => {
    return new Promise((resolve, reject) => {
        const result = cloud.uploader.upload_stream({
            folder: folder_name,
            resource_type: type,
        }, (err, res) => {
            if (err) reject({ valid: false, error: err, url: "" })
            else resolve({ valid: true, url: res?.secure_url || "", public_id: `${res?.public_id}` })
        })
        result.end(buffer)
    })
}

export default uploadAsset;