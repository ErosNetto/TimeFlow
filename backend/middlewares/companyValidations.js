const { body } = require("express-validator");

const companyCreateValidation = () => {
  return [
    body("companyName")
      .isString()
      .withMessage("O nome da empresa é obrigatório."),
    // .isLength({ min: 3 })
    // .withMessage("O nome da empresa precisa ter no mínimo 3 caracteres."),
    body("ownerName")
      .isString()
      .withMessage("O nome do dono da empresa é obrigatório")
      .isLength({ min: 3 })
      .withMessage(
        "O nome do dono da empresa precisa ter no mínimo 3 caracteres."
      ),
    body("telephone")
      .isString()
      .withMessage("O telefone é obrigatório.")
      .matches(/^\+\d{2} \d{2} \d{5}-\d{4}$/)
      .withMessage("O telefone deve estar no formato +XX XX XXXXX-XXXX."),
    body("category").isString().withMessage("A categoria é obrigatório."),
    body("email")
      .isString()
      .withMessage("O email é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail válido."),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 8 })
      .withMessage("A senha precisa ter no mínimo 8 caracteres."),
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
  companyCreateValidation,
};
