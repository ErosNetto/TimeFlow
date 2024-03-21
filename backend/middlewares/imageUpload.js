const multer = require("multer");
const path = require("path");

const randomNumber = () => Math.floor(Math.random() * 10000 + 10000);

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("companies")) {
      folder = "companies";
    } else if (req.baseUrl.includes("professionals")) {
      folder = "professionals";
    }

    cb(null, `uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    // Generates a random name for the file and the original file extension
    cb(
      null,
      `${Date.now()}_${randomNumber()}${path.extname(file.originalname)}`
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg|heif|hevc)$/i)) {
      // upload only png, jpg, jpeg, heif and hevc format
      return cb(
        new Error(
          "Por favor, envie apenas imagens PNG, JPG, JPEG, HEIF ou HEVC!"
        )
      );
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
