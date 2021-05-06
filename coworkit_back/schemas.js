const Joi = require("joi");
//*******************************************************************************************
//****lista de funciones que devuelven validaciones usadas reiteredas veces en los schemas***
//*******************************************************************************************

/**
 *
 * @param {String} varName :Nombre de la variable string a validar
 * @param {Number} max :Número máximo de caracteres
 */
const maxTextValidator = (varName, max) => {
  return Joi.string()
    .allow("")
    .max(max)
    .messages({
      "string.base": `${varName} debe ser de tipo 'string'`,
      "string.max": `${varName} no puede tener más de {#limit} caracteres`,
    });
};
/**
 *
 * @param {String} varName :Nombre de la variable requerida de tipo string a ser validada
 * @param {Number} max :Número máximo de caracteres
 * @param {Number} min :Número mínimo de caracteres
 */
const textRequiredValidator = (varName, max, min = 0) => {
  return Joi.string()
    .required()
    .min(min)
    .max(max)
    .messages({
      "string.base": `${varName} debe ser de tipo 'string'`,
      "string.empty": `${varName} no puede estar vacío`,
      "string.min": `${varName} debe ser mayor de {#limit} caracteres`,
      "string.max": `${varName} no puede ser mayor de {#limit} caracteres`,
      "any.required": `${varName} es un campo requerido`,
    });
};
/**
 *
 * @param {String} varName :Nombre de la variable requerida de tipo date a ser validada
 */
const dateRequiredValidator = (varName) => {
  return Joi.date()
    .required()
    .min(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
    )
    .messages({
      "date.base": `${varName} debe ser de tipo 'date'`,
      "date.empty": `${varName}  no puede estar vacío`,
      "date.min": `${varName}  no puede ser anterior a la {#limit}`,
      "any.required": `${varName}  es un campo requerido`,
    });
};
/**
 *
 * @param {String} varName :Nombre de la variable requerida de tipo date a ser validada
 */
const dateValidator = (varName) => {
  return Joi.date()
    .min(new Date())
    .messages({
      "date.base": `${varName}  debe ser de tipo 'date'`,
      "date.empty": `${varName}  no puede estar vacío`,
      "date.min": `${varName}  no puede ser anterior a la {#limit}`,
    });
};
/**
 *
 * @param {String} varName :Nombre de la variable requerida de tipo number a ser validada
 */
const numberIntegerPositiveRequiredValidator = (varName) => {
  return Joi.number()
    .positive()
    .required()
    .integer()
    .messages({
      "number.base": `${varName} debe ser de tipo 'number'`,
      "number.empty": `${varName} no puede estar vacío`,
      "number.positive": `${varName} debe ser un valor positivo`,
      "number.integer": `${varName} debe ser un valor entero`,
      "number.required": `${varName} es un campo requerido`,
    });
};

/**
 *
 * @param {String} varName :Nombre de la variable number a validar
 */
const numPositiveIntegerValidator = (varName) => {
  return Joi.number()
    .positive()
    .integer()
    .messages({
      "number.base": `${varName} debe ser de tipo 'number'`,
      "number.empty": `${varName} no puede estar vacío`,
      "number.positive": `${varName} debe ser un valor positivo`,
      "number.integer": `${varName} debe ser un valor entero`,
    });
};

/**
 *
 * @param {String} varName :Nombre de la variable number a validar
 */
const numBetweenOneAndZeroValidator = (varName) => {
  return Joi.number()
    .allow("")
    .integer()
    .min(0)
    .max(1)
    .messages({
      "number.base": `${varName} debe ser de tipo 'number'`,
      "number.integer": `${varName} debe ser un valor entero`,
      "number.min": `${varName} debe ser 0 o 1`,
      "number.max": `${varName} debe ser 0 o 1`,
    });
};

/**
 *
 * @param {String} varName : Nombre de la variable date a validar
 */
const dateTypeValidator = (varName) => {
  return Joi.date()
    .allow("")
    .messages({
      "date.base": `${varName} debe ser de tipo 'date'`,
    });
};

//*******************************************************************************************
//*****************************Inicio de lista de schemas************************************
//*******************************************************************************************

const reservationSchema = Joi.object().keys({
  start_date: dateRequiredValidator("start_date"),
  end_date: dateRequiredValidator("end_date"),
  pack_id: numberIntegerPositiveRequiredValidator("pack_id"),
  space_id: numberIntegerPositiveRequiredValidator("space_id"),
  user_id: numPositiveIntegerValidator("user_id"),
});

const userSchema = Joi.object().keys({
  name: textRequiredValidator("name", 50),
  surname: textRequiredValidator("surname", 100),
  nif: textRequiredValidator("nif", 9),
  email: textRequiredValidator("email", 100),
  password: textRequiredValidator("password", 100),
});

const loginSchema = Joi.object().keys({
  email: textRequiredValidator("email", 100),
  password: textRequiredValidator("password", 100),
});

const editUserSchema = Joi.object().keys({
  name: textRequiredValidator("name", 50),
  surname: textRequiredValidator("surname", 100),
  nif: textRequiredValidator("nif", 9),
  company: maxTextValidator("company", 50),
  tel: maxTextValidator("tel", 30),
  email: textRequiredValidator("email", 100),
  admin: numBetweenOneAndZeroValidator("admin"),
  deleted: numBetweenOneAndZeroValidator("deleted"),
  deletePhoto: numBetweenOneAndZeroValidator("deletePhoto"),
});

const newReportSchema = Joi.object().keys({
  category: Joi.any().valid(
    "hardware",
    "software",
    "conectividad",
    "limpieza",
    "atención al cliente",
    "otros"
  ),
  description: textRequiredValidator("description", 500, 30),
});

//Schema para filtrar reportes (los campos serán opcionales)
const filterReportSchema = Joi.object().keys({
  report_id: numPositiveIntegerValidator("report_id"),
  date: Joi.date().allow("").optional().max(new Date()).messages({
    "date.base": `'date' debe ser de tipo 'date'`,
    "date.max": `'date' no puede ser posterior a la fecha actual`,
  }),
  category: Joi.any().valid(
    "hardware",
    "software",
    "conectividad",
    "limpieza",
    "atención al cliente",
    "otros",
    ""
  ),
  solved: numBetweenOneAndZeroValidator("solved"),
  user_name: Joi.string().allow("").max(150).messages({
    "string.base": `"user_name" debe ser de tipo 'string'`,
    "string.max": `"user_name" no puede ser mayor de {#limit} caracteres`,
  }),
  space_name: Joi.string().allow("").max(50).messages({
    "string.base": `"space_name" debe ser de tipo 'string'`,
    "string.max": `"space_name" no puede ser mayor de {#limit} caracteres`,
  }),
  orderBy: Joi.string().valid(
    "id",
    "report_date",
    "solved",
    "user_id",
    "space_id",
    "user_name",
    "space_name",
    "category",
    "description"
  ),

  orderDirection: Joi.string().valid("ASC", "DESC"),
});
const newSpaceSchema = Joi.object().keys({
  type: Joi.string()
    .required()
    .valid(
      "Sala de reuniones",
      "Oficina individual",
      "Auditorio",
      "Sala audiovisual",
      "Oficina compartida"
    ),
  description: maxTextValidator("description", 4000),
  name: maxTextValidator("name", 50),
  price: Joi.number().required().positive().messages({
    "number.base": `"price" debe ser de tipo 'number'`,
    "number.empty": `"price" no puede estar vacío`,
    "number.positive": `"price" debe ser un valor positivo`,
  }),
  capacity: numPositiveIntegerValidator("capacity"),
});
const filterSpaceSchema = Joi.object().keys({
  type: Joi.any().valid(
    "Sala de reuniones",
    "Oficina individual",
    "Auditorio",
    "Sala audiovisual",
    "Oficina compartida"
  ),
  description: maxTextValidator("description", 4000),
  name: maxTextValidator("name", 50),
  price: Joi.number().positive().messages({
    "number.base": `"price" debe ser de tipo 'number'`,
    "number.empty": `"price" no puede estar vacío`,
    "number.positive": `"price" debe ser un valor positivo`,
  }),
  capacity: numPositiveIntegerValidator("capacity"),
  start_date: dateValidator("start_date"),
  end_date: dateValidator("end_date"),
  order: Joi.string().valid(
    "type",
    "price",
    "capacity",
    "start_date",
    "end_date"
  ),
  direction: Joi.string().valid("ASC", "DESC"),
});

const filterSpaceAdminSchema = Joi.object().keys({
  type: Joi.any().valid(
    "Sala de reuniones",
    "Oficina individual",
    "Auditorio",
    "Sala audiovisual",
    "Oficina compartida"
  ),
  description: maxTextValidator("description", 4000),
  name: maxTextValidator("name", 50),
  price: Joi.number().positive().messages({
    "number.base": `"price" debe ser de tipo 'number'`,
    "number.empty": `"price" no puede estar vacío`,
    "number.positive": `"price" debe ser un valor positivo`,
  }),
  capacity: numPositiveIntegerValidator("capacity"),
  enabled: Joi.number().valid(0, 1),
  start_date: dateValidator("start_date"),
  order: Joi.string().valid(
    "type",
    "price",
    "score",
    "capacity",
    "start_date",
    "end_date",
    "enabled",
    "price",
    ""
  ),
  direction: Joi.string().valid("ASC", "DESC"),
});

//user_id, name,surname,company,admin,verified,deleted,registration_date,
const filterUserSchema = Joi.object().keys({
  user_id: numPositiveIntegerValidator("user_id"),
  name: maxTextValidator("name", 50),
  surname: maxTextValidator("surname", 100),
  company: Joi.string().allow("").max(50).messages({
    "string.base": `'company' debe ser de tipo 'string'`,
    "string.max": `'company' no puede tener más de {#limit} caracteres`,
  }),
  admin: numBetweenOneAndZeroValidator("admin"),
  verified: numBetweenOneAndZeroValidator("verified"),
  deleted: numBetweenOneAndZeroValidator("deleted"),
  registration_date: Joi.date().allow("").max(new Date()).messages({
    "date.base": `"registration_date" debe ser de tipo 'date'`,
    "any.required": `"registration_date" es un campo requerido`,
    "date.max": `'registration_date' no puede ser mayor que {#limit}`,
  }),
  order: Joi.string().valid(
    "id",
    "name",
    "surname",
    "company",
    "admin",
    "verified",
    "deleted",
    "registration_date",
    "nif",
    "tel",
    "email"
  ),
  direction: Joi.string().valid("ASC", "DESC"),
});

const newPackSchema = Joi.object().keys({
  type: textRequiredValidator("type", 50),
  content: textRequiredValidator("content", 400),
  price: Joi.number().required().messages({
    "number.base": `"price" debe ser de tipo 'number'`,
    "number.empty": `"price" no puede estar vacío`,
    "number.positive": `"price" debe ser un valor positivo`,
  }),
});
const newReviewSchema = Joi.object().keys({
  comment: textRequiredValidator("type", 400),
  score: Joi.number().required().positive().integer().max(10).messages({
    "number.base": `"score" debe ser de tipo 'number'`,
    "number.empty": `"score" no puede estar vacío`,
    "number.positive": `"score" debe ser un valor positivo`,
    "number.integer": `"score" debe ser un valor entero`,
    "number.max": `"score" no puede ser mayor de {#limit} `,
  }),
});

const filterReviewsSchema = Joi.object().keys({
  review_id: numPositiveIntegerValidator("review_id"),
  space_name: Joi.string().allow("").max(150).messages({
    "string.base": `"user_name" debe ser de tipo 'string'`,
    "string.max": `"user_name" no puede ser mayor de {#limit} caracteres`,
  }),
  review_date: Joi.date().messages({
    "date.base": `"end_date" debe ser de tipo 'date'`,
    "date.empty": `"end_date" no puede estar vacio`,
    "any.required": `"end_date" es un campo requerido`,
  }),
  order: Joi.string().valid(
    "id",
    "space_name",
    "user_id",
    "score",
    "review_date",
    "comment",
    "user_name"
  ),
  direction: Joi.string().valid("ASC", "DESC"),
  user_name: Joi.string().allow("").max(150).messages({
    "string.base": `"user_name" debe ser de tipo 'string'`,
    "string.max": `"user_name" no puede ser mayor de {#limit} caracteres`,
  }),
});
const recoverUserPasswordSchema = Joi.object().keys({
  email: textRequiredValidator("email", 100),
});
const resetUserPasswordSchema = Joi.object().keys({
  recoverCode: textRequiredValidator("recoverCode", 100, 4),
  newPassword: Joi.string().required().messages({
    "string.base": `"type" debe ser de tipo 'string'`,
    "string.empty": `"type" no puede estar vacio`,
  }),
});

const editPasswordSchema = Joi.object().keys({
  oldPassword: textRequiredValidator("oldPassword", 100),
  newPassword: textRequiredValidator("newPassword", 100),
});
const getPackSchema = Joi.object().keys({
  order: Joi.valid("ID", "type", "content", "price", "photo"),
  direction: Joi.valid("ASC", "DESC"),
});

const filterBookingsSchema = Joi.object().keys({
  reservation_id: numPositiveIntegerValidator("reservation_id"),
  space_id: numPositiveIntegerValidator("space_id"),
  space_type: Joi.string()
    .valid(
      "Sala audiovisual",
      "Sala de reuniones",
      "Oficina compartida",
      "Oficina individual",
      "Auditorio",
      ""
    )
    .messages({
      "string.base": `"space_type" debe ser de tipo 'string'`,
    }),
  space_name: Joi.string().allow("").messages({
    "string.base": `"space_name" debe ser de tipo 'string'`,
  }),
  user_name: Joi.string().allow("").max(150).messages({
    "string.base": `"user_name" debe ser de tipo 'string'`,
    "string.max": `"user_name" no puede ser mayor de {#limit} caracteres`,
  }),
  pack: Joi.string()
    .valid("Básico", "Intermedio", "Audiovisual", "Informático", "")
    .messages({
      "string.base": `"pack" debe ser de tipo 'string'`,
    }),
  start_date: dateTypeValidator("start_date"),
  end_date: dateTypeValidator("end_date"),
  order_date: dateTypeValidator("order_date"),
  direction: Joi.string().valid("ASC", "DESC").messages({
    "string.base": `"direction" debe ser de tipo 'string'`,
  }),
  order: Joi.string()
    .valid(
      "id",
      "space_type",
      "space_name",
      "user_name",
      "pack",
      "start_date",
      "end_date",
      "order_date",
      "price",
      ""
    )
    .messages({
      "string.base": `"order" debe ser de tipo 'string'`,
    }),
});

const deletePhotoSpaceSchema = Joi.object().keys({
  url: Joi.string().required().messages({
    "string.base": `"url" debe ser de tipo 'string'`,
    "any.required": `url es un campo requerido`,
  }),
});
module.exports = {
  reservationSchema,
  userSchema,
  editUserSchema,
  loginSchema,
  newReportSchema,
  filterReportSchema,
  newSpaceSchema,
  filterSpaceSchema,
  newPackSchema,
  newReviewSchema,
  filterReviewsSchema,
  recoverUserPasswordSchema,
  filterUserSchema,
  resetUserPasswordSchema,
  editPasswordSchema,
  filterSpaceAdminSchema,
  getPackSchema,
  filterBookingsSchema,
  deletePhotoSpaceSchema,
};
