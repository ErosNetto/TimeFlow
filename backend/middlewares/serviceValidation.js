const { body } = require("express-validator");

const serviceInsertValidation = () => {
  return [
    body("serviceName")
      .isString()
      .withMessage("O nome do serviço é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome do serviço precisa ter no mínimo 3 caracteres."),
    body("price").isNumeric().withMessage("O preço do serviço é obrigatório."),
    body("time").isString().withMessage("O tempo do serviço é obrigatório."),
  ];
};

const serviceUpdateValidation = () => {
  return [
    body("serviceName")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome do serviço precisa ter no mínimo 3 caracteres."),
    body("price")
      .optional()
      .isNumeric()
      .withMessage("O preço do serviço precisa ser um número."),
    body("time")
      .optional()
      .isString()
      .withMessage("O tempo do serviço precisa ser uma string."),
  ];
};

module.exports = {
  serviceInsertValidation,
  serviceUpdateValidation,
};
