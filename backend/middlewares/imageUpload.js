const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

// Generate a random number
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
    // Validate file type
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

// Sharp middleware to process the received files (convert)
const processFiles = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next();
  }

  const filesPromises = Object.values(req.files).map((file) => {
    const inputPath = file.path;
    const outputPath = `${inputPath}.webp`;
    return () => {
      return sharp(inputPath).webp().toFile(outputPath);
    };
  });

  Promise.all(filesPromises)
    .then(() => {
      console.log("Todos os arquivos foram processados com sucesso.");
      next();
    })
    .catch((err) => {
      console.error("Erro ao processar os arquivos:", err);
      return res.status(500).send("Erro ao processar os arquivos.");
    });
};

module.exports = { imageUpload, processFiles };
