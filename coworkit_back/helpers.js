const { format } = require("date-fns");
const sharp = require("sharp");
const uuid = require("uuid");
const path = require("path");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const Joi = require("joi");
require("dotenv").config();
const { ensureDir, unlink } = require("fs-extra");
const { UPLOADS_DIRECTORY } = process.env;
const uploadsDir = path.join(__dirname, UPLOADS_DIRECTORY);

// Configuramos sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Formatea un objeto de fecha a DATETIME de SQL
 * @param {Date} dateObject - Fecha
 * @returns {sqlDate} Fecha en en formato SQL
 */
function formatDateToDB(dateObject) {
  return format(dateObject, "yyyy-MM-dd HH:mm:ss");
}

/**
 * Borra una imagen (o cualquier tipo de documento) en el directorio de uploads
 * @param {string} photo - Nombre de la imagen
 * @param {string} folder - Directorio en el que se ecuentra la imagen
 */
async function deletePhoto(photo, folder) {
  folder = folder === undefined ? "" : folder;
  const photoPath = path.join(uploadsDir, folder, photo);

  await unlink(photoPath);
}

/**
 * Guarda una foto en el directorio de uploads o un directorio que se indique dentro de uploads
 * @param {object} imageData - Objeto con la información de la imagen
 * @param {string} folder - Directorio en el qeu se almacenará la imagen dentro de uploads (opcional)
 * @param {Number} width - Ancho máximo de la foto (opcional)
 * @returns {string} Nombre de la imagen almacenada (sin la ruta)
 */
async function savePhoto(imageData, folder = "", width = 1000) {
  const photoDir = path.join(uploadsDir, folder);
  // Asegurarse que el directorio de subida de imagenes exista
  await ensureDir(photoDir);

  // Leer la imagen con sharp
  let image;
  let imageInfo;
  try {
    image = sharp(imageData.data, { failOnError: true });
    imageInfo = await image.metadata();
  } catch (error) {
    throw createError("El documento introducido no es una imagen", 400);
  }
  // Comprobar que la imagen no tenga un tamaño mayor a X pixeles de ancho

  // Si es mayor que ese tamaño redimensionarla a ese tamaño
  const IMAGE_MAX_WIDTH = width;
  if (imageInfo.width > IMAGE_MAX_WIDTH) {
    image.resize(IMAGE_MAX_WIDTH);
  }

  // Generar un nombre único para la imagen
  const savedImageName = `${uuid.v4()}.jpg`;

  // Guardar la imagen en el directorio de subida de imagenes
  await image.toFile(path.join(photoDir, savedImageName));

  return savedImageName;
}

/**
 * Genera una cadena de caracteres aleatoria
 * @param {number} length - Longitud que queremos que tenga la cadena
 * @returns {string} Cadena de caracteres aleatorios
 */
function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

/**
 * Envía un correo electrónico personalizado
 * @param {string} to - Email del destinatario
 * @param {string} subject - Asunto del correo
 * @param {string} body - Contenido del correo
 * @param {string} name - Nombre del destinatario
 * @param {string} introMessage - Saludo inicial del correo (Buenos días, Hola, etc.)
 */
async function sendMail({ to, subject, body, name, introMessage }) {
  // Instrucciones: https://www.npmjs.com/package/@sendgrid/mail
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM, // Use the email address or domain you verified above
      subject,
      text: body,
      html: `
      <h1>${introMessage} ${name}</h1>
        <div>
          <h2>${subject}</h2>
          <p>${body}</p>
          <br>
          <strong><i><u>Coworkit</u> "Let's synergy <u>together</u>"</i></strong>
        </div>
      `,
    };

    await sgMail.send(msg);
  } catch (error) {
    throw new Error("Error enviando mail");
  }
}

/**
 *
 * @param {string} message - Descripción del error
 * @param {number} numHttpStatus - Código de error HTTP
 * @returns {error} Error preparado para el endpoint de error
 */
function createError(message, numHttpStatus) {
  const error = new Error(message);
  error.httpStatus = numHttpStatus;
  return error;
}

/**
 * Comprueba que el id introducido como parámetro es un número positivo
 * @param {number} id - ID que queremos comprobar
 * @throws {error} En caso de que el ID no cumpla con el formato establecido
 * @returns {number} En caso de que el ID cumpla con el fomrato establecido
 */
function isId(id) {
  const schema = Joi.number().required().integer().positive();
  const validation = schema.validate(id);

  if (validation.error) {
    throw createError(
      "El ID es obligatorio y debe ser un número positivo",
      400
    );
  } else {
    return id;
  }
}

/**
 * Comprueba que una fecha es posterior a la fecha actual
 * @param {date} inputDate - Fecha a comprobar
 * @returns {boolean} verdadero o falso
 */
function dateValidator(inputDate) {
  if (new Date().setHours(0) > inputDate.getTime()) {
    return false;
  } else {
    return true;
  }
}

/**
 * Valida datos con schemas de Joi
 * @param {JoiSchema} schema - Esquema con el que validaremos los datos
 * @param {object} valueToValidate  - Objeto con los datos a validar
 * @throws {error} En caso de que los datos no superen la validación
 */
async function validator(schema, valueToValidate) {
  try {
    await schema.validateAsync(valueToValidate);
  } catch (error) {
    error.httpStatus = 400;
    throw error;
  }
}

/**
 * Devuelve la cadena introducida con la primera letra en mayúscula y el resto en minúscula
 * @param {string} word - Palabra a modificar
 * @returns {string} Palabra con la primera letra en mayúscula y el resto en minúscula
 */
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Capitaliza todas las palabaras introducidas
 * @param {string} wordsToCapitalize - Palabras que queremos capitalizar separadas por espacios en un solo string
 * @returns {string} Palabras capitalizadas
 */
function formatName(wordsToCapitalize) {
  wordsToCapitalize = wordsToCapitalize.trim().toLowerCase().split(" ");
  let formatedName;

  for (let i = 0; i < wordsToCapitalize.length; i++) {
    if (i === 0) {
      formatedName = capitalize(wordsToCapitalize[i]);
    } else {
      formatedName += ` ${capitalize(wordsToCapitalize[i])}`;
    }
  }
  return formatedName;
}

/**
 * Crea un saludo en función de la hora actual
 * @returns {string} Saludo en función de la hora
 */
function createGreetings() {
  const now = new Date();
  const hour = now.getHours();

  if (hour > 7) {
    return "Buenos días";
  } else if (hour > 14 && hour < 20) {
    return "Buenas tardes";
  } else {
    return "Buenas noches";
  }
}

/**
 * Obtiene la diferencia en horas entre dos fechas
 * @param {*} startDistance - Fecha de inicio
 * @param {*} endDistance  - Fecha de fin
 * @returns {number} Horas de diferencia
 */
function distanceDateInHours(startDistance, endDistance) {
  return Math.ceil(
    Math.abs(endDistance.getTime() - startDistance.getTime()) / (1000 * 3600)
  );
}

/**
 *
 * @param {string} fileName - Nombre de la imagen
 * @param {string} folder - Nombre de la carpeta de destino (dentro de uploads)
 * @returns {path} Url completa de la imagen en cuestión
 */
function setPhotoUrl(fileName, folder = "") {
  const { PUBLIC_HOST, UPLOADS_DIRECTORY } = process.env;
  return `${PUBLIC_HOST}/${UPLOADS_DIRECTORY}/${folder}/${fileName}`;
}

module.exports = {
  formatDateToDB,
  savePhoto,
  deletePhoto,
  generateRandomString,
  sendMail,
  createError,
  isId,
  dateValidator,
  validator,
  capitalize,
  formatName,
  createGreetings,
  distanceDateInHours,
  setPhotoUrl,
};
