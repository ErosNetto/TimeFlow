const { body } = require("express-validator");

const insertTileSlotValidation = () => {
  return [
    body("date").isISO8601().withMessage("A data é obrigatória."),
    body("startTime").isString().withMessage("O tempo é obrigatório."),
  ];
};

module.exports = {
  insertTileSlotValidation,
};
