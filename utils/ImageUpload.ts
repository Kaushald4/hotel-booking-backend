import {v2} from 'cloudinary'
import {promisify}  from 'util'
import fs from 'fs';
const unlinkAsync = promisify(fs.unlink)

const ImageUpload = async (files: any[]) => {
  
    return new Promise(async(resolve, reject) => {  
        try {
            const images = [];
            for(let i = 0; i < files.length; i++) {
                const image = await v2.uploader.upload(files[i].path, {upload_preset: "hotel_booking"});
                images.push({url: image.secure_url, id: image.public_id});
            }

            // delete image from local disk
            for await (let file of files) {
                await unlinkAsync(file.path);
            }
            resolve(images); 
        } catch (error) {
            reject(error);
        }

    })
}


export default ImageUpload