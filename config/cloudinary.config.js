const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Rentup",
    allowedFormats: ["jpg", "png", "pdf"],
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;