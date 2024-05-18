const path = require("path");
const fs = require("fs").promises;

const deleteImages = async (imageType, oldImageName) => {
  const uploadsFolder = path.join(__dirname, "../", "uploads");

  try {
    let imagePath = "";

    if (imageType === "company") {
      imagePath = path.join(uploadsFolder, "companies", oldImageName);
    } else if (imageType === "professionals") {
      imagePath = path.join(uploadsFolder, "professionals", oldImageName);
    } else {
      throw new Error("Tipo de imagem inválido.");
    }

    // Excluir a imagem usando fs.promises.unlink
    await fs.unlink(imagePath);

    console.log(`Imagem ${imagePath} excluída com sucesso.`);
  } catch (error) {
    console.error("Erro ao excluir as imagens:", error);
    throw new Error("Erro ao excluir as imagens.");
  }
};

module.exports = { deleteImages };
