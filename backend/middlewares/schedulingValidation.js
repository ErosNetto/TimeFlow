const { body } = require("express-validator");

const userMakeScheduleValidation = () => {
  return [
    body("date")
      .isISO8601()
      .withMessage("A data do agendamento é obrigatório."),
    body("time").isString().withMessage("A data do agendamento é obrigatório."),
    body("companyId").isString().withMessage("O companyId é obrigatório."),
    body("serviceId").isString().withMessage("O serviceId é obrigatório."),
    body("professionalId")
      .isString()
      .withMessage("O professionalId é obrigatório."),
  ];
};

const userMakeReschedulingValidation = () => {
  return [
    body("date")
      .isISO8601()
      .withMessage("A data do agendamento é obrigatório."),
    body("time").isString().withMessage("A data do agendamento é obrigatório."),
  ];
};

const companyMakeScheduleValidation = () => {
  return [
    body("userName")
      .isString()
      .withMessage("O nome do cliente é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome do cliente precisa ser ter no mínimo 3 caracteres."),
    body("date")
      .isISO8601()
      .withMessage("A data do agendamento é obrigatório."),
    body("time").isString().withMessage("A data do agendamento é obrigatório."),
    body("serviceId").isString().withMessage("O serviceId é obrigatório."),
    body("professionalId")
      .isString()
      .withMessage("O professionalId é obrigatório."),
  ];
};

module.exports = {
  userMakeScheduleValidation,
  userMakeReschedulingValidation,
  companyMakeScheduleValidation,
};
