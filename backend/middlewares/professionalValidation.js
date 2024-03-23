const { body } = require("express-validator");

const professionalInsertValidation = () => {
  return [
    body("professionalName")
      .not()
      .equals("undefined")
      .withMessage("O nome do profissional é obrigatório.")
      .isString()
      .withMessage("O nome do profissional precisa ser uma string")
      .isLength({ min: 3 })
      .withMessage(
        "O nome do profissional precisa ter no mínimo 3 caracteres."
      ),
    body("servicesPerformed").custom((value) => {
      if (!Array.isArray(value) || value.length < 1) {
        throw new Error(
          "O serviço é obrigatório e deve ser um array com pelo menos um elemento."
        );
      }
      return true;
    }),
    body("profileImage").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória.");
      }
      return true;
    }),
  ];
};

module.exports = {
  professionalInsertValidation,
};
