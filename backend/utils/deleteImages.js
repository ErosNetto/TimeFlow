const fs = require("fs").promises;
const path = require("path");

const deleteImages = async (imageType, oldImageName) => {
  const uploadsFolder = path.join(__dirname, "../", "uploads");

  try {
    if (imageType == "company") {
      await fs.unlink(`${uploadsFolder}/companies/${oldImageName}`);
    }

    if (imageType == "professionals") {
      await fs.unlink(`${uploadsFolder}/professionals/${oldImageName}`);
    }

    if (imageType == "professionals") {
      await fs.unlink(`${uploadsFolder}/professionals/${oldImageName}`);
    }
  } catch (error) {
    console.error("Erro ao excluir as imagens:", error);
    throw new Error("Erro ao excluir as imagens.");
  }
};

module.exports = { deleteImages };
