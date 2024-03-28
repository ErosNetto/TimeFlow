const Message = require("../models/Message");

// Get all message for company
const getAllMessage = async (req, res) => {
  const reqCompany = req.company;

  try {
    const messages = await Message.find({ companyId: reqCompany._id })
      .sort([["createdAt", -1]])
      .exec();

    if (messages.length === 0) {
      return res.status(200).json({
        messages,
        message: "Sua empresa não tem nenhuma nova mensagem!",
      });
    }

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
  }
};

// Get message by id
const getMessageById = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Message.findById(id);

    // Check if message exists
    if (!message) {
      res.status(404).json({ errors: ["Mensagem não encontrado."] });
      return;
    }

    return res.status(200).json(message);
  } catch (error) {
    res.status(404).json({ errors: ["Mensagem não encontrado."] });
    return;
  }
};

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
  getAllMessage,
  getMessageById,
  deleteMessage,
};
