const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fse = require("fs-extra");

// Função para criar os diretórios necessários de forma assíncrona
const ensureUploadsFolder = async () => {
  const uploadsPath = path.join(__dirname, "..", "uploads");
  const adsPath = path.join(uploadsPath, "companies");
  const depoimentPath = path.join(uploadsPath, "professionals");

  try {
    // Verifica e cria a pasta uploads
    await fse.ensureDir(uploadsPath);

    // Verifica e cria a pasta ads
    await fse.ensureDir(adsPath);

    // Verifica e cria a pasta depoiment
    await fse.ensureDir(depoimentPath);

    console.log("Pastas criadas com sucesso ou já existem!");
  } catch (err) {
    console.error("Erro ao criar pastas:", err);
  }
};

// Chama a função para garantir que as pastas existam
ensureUploadsFolder().catch((err) => {
  console.error("Erro ao garantir que as pastas existam:", err);
});

// Destination to store image
const imagesStorage = multer.diskStorage({
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
    cb(null, `${Date.now()}_${uuidv4()}${path.extname(file.originalname)}`);
  },
});

const imagesUpload = multer({
  storage: imagesStorage,
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

module.exports = { imagesUpload };
