const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("userName")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    body("email")
      .isString()
      .withMessage("O email é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail válido."),
    body("telephone")
      .isString()
      .withMessage("O telefone é obrigatório.")
      .matches(/^\d{13}$/)
      .withMessage("O telefone deve ter 13 dígitos numéricos."),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no mínimo 5 caracteres."),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatória.")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais.");
        }
        return true;
      }),
  ];
};

module.exports = {
  userCreateValidation,
};
