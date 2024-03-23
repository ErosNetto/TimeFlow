const sharp = require("sharp");
const fs = require("fs/promises");
const path = require("path");

// Middleware to convert images and update names in req.files
const convertFiles = async (req, res, next) => {
  try {
    if (!req.files && !req.file) {
      return next();
    }

    let fieldFiles = [];

    if (req.files) {
      fieldFiles = Object.values(req.files).flat();
    } else {
      fieldFiles = [req.file];
    }

    const filesPromises = fieldFiles.map(async (file) => {
      const inputPath = file.path;
      const outputPath = inputPath.replace(/\.[^.]+$/, "") + ".webp";

      // Using Sharp to convert the image to WebP
      await sharp(inputPath).webp().toFile(outputPath);

      await fs.unlink(inputPath);

      file.filename = path.basename(outputPath);
    });

    await Promise.all(filesPromises);

    // console.log("Todos os arquivos foram processados com sucesso.");
    next();
  } catch (error) {
    console.error("Erro ao processar os arquivos:", error);
    res.status(500).send("Erro ao processar os arquivos.");
  }
};

module.exports = { convertFiles };
