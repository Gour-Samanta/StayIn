const cloudinary = require('cloudinary').v2;
const { preferences } = require('joi');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'stayIn_dev',
    allowed_formats: ["jpg", "png", "jpeg", "pdf"], // allowed file types
    
  },
});

module.exports = {
    storage,
    cloudinary
}
