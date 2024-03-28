const { body } = require("express-validator");

const messageCancelValidation = () => {
  return [
    body("userName").isString().withMessage("O nome do usuário é obrigatório."),
    body("message").isString().withMessage("A mensagem é obrigatório."),
    body("reason")
      .isString()
      .withMessage("A razão do cancelamento ou agendamento é obrigatório.")
      .isLength({ min: 10 })
      .withMessage("A razão deve ter no mínimo 10 caracteres.")
      .isLength({ max: 100 })
      .withMessage("A razão deve ter no máximo 100 caracteres."),
    ,
  ];
};

module.exports = {
  messageCancelValidation,
};
