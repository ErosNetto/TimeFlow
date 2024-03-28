const Message = require("../models/Message");

// Delete message
const deleteMessage = async (req, res) => {
  const { id } = req.params;
  const reqCompany = req.company;

  try {
    const message = await Message.findById(id);

    // Check if professional exist
    if (!message) {
      res.status(404).json({ errors: ["Mensagem não encontrado!"] });
      return;
    }

    // Check if professional belongs to company
    if (!message.companyId.equals(reqCompany._id)) {
      res.status(422).json({
        erros: ["Ocorreu um erro, por favor tente novamente mais tarde."],
      });
      return;
    }

    await Message.findByIdAndDelete(message._id);

    res.status(200).json({
      id: message._id,
      message: "Mensagem excluida com sucesso.",
    });
  } catch (error) {
    res.status(404).json({ errors: ["Mensagem não encontrado!"] });
    return;
  }
};

module.exports = {
  deleteMessage,
};
