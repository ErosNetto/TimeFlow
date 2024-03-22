const sharp = require("sharp");
const fs = require("fs/promises");
const path = require("path");

// Middleware to convert images and update names in req.files
const processFiles = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next();
    }

    const filesPromises = Object.keys(req.files).map((fieldName) => {
      const file = req.files[fieldName][0];
      const inputPath = file.path;
      const outputPath = inputPath.replace(/\.[^.]+$/, "") + ".webp";

      // Using Sharp to convert the image to WebP
      return sharp(inputPath)
        .webp()
        .toFile(outputPath)
        .then(() => {
          return fs.unlink(inputPath);
        })
        .then(() => {
          req.files[fieldName][0].filename = path.basename(outputPath);
        });
    });

    await Promise.all(filesPromises);

    // console.log("Todos os arquivos foram processados com sucesso.");
    next();
  } catch (error) {
    console.error("Erro ao processar os arquivos:", error);
    res.status(500).send("Erro ao processar os arquivos.");
  }
};

module.exports = { processFiles };
