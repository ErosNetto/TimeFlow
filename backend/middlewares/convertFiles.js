const sharp = require("sharp");
const fse = require("fs-extra");
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

      // Excluir o arquivo original
      await fse.move(inputPath, outputPath, { overwrite: true });

      file.filename = path.basename(outputPath);
    });

    await Promise.all(filesPromises);

    // console.log("Todos os arquivos foram processados com sucesso.");
    next();
  } catch (error) {
    console.error("Erro ao converter os arquivos:", error);
    res.status(500).send("Erro ao converter os arquivos.");
  }
};

module.exports = { convertFiles };

// Excluir o arquivo original
// await fs.unlink(inputPath);
