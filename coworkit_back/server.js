require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const { PORT } = process.env;
const getDB = require("./db");
const cors = require("cors");

// #################################################################
// #             Importamos controllers y middlewares              #
// #################################################################

//Controladores de espacios
const {
  getSpace,
  filterSpaces,
  editSpace,
  newSpace,
  changeStateSpaces,
  filterSpacesAdmin,
  deletePhotos,
} = require("./controllers/spaces");

// Controladores de reservas
const {
  getReservation,
  newReservation,
  deleteReservation,
  editReservation,
  filterbookings,
} = require("./controllers/bookings");

//Controladores de packs
const {
  newPack,
  editPack,
  deletePack,
  getPack,
  filterPacksAdmin,
} = require("./controllers/packs");

//Controladores de valoraciones
const {
  newReview,
  editReview,
  deleteReview,
  filterReviews,
  getReviews,
  getUserReviews,
} = require("./controllers/reviews");

//Controladores de reportes
const {
  newReport,
  filterReports,
  editReport,
  answerReports,
  deleteReport,
} = require("./controllers/reports");

//Controladores de usuarios
const {
  addUser,
  validateUser,
  loginUser,
  getUser,
  deleteUser,
  editUser,
  contactUser,
  recoverUserPassword,
  resetUserPassword,
  filterUsers,
  editPassword,
} = require("./controllers/users");

//Middlewares
const {
  userExists,
  spaceExists,
  reservationExists,
  reportExists,
  reviewExists,
  isAuthorized,
  packExists,
  isAdmin,
  spaceIsEnabled,
} = require("./middlewares");

// #################################################################
// #                      Configuramos express                     #
// #################################################################

// Creamos la app de express
const app = express();
// Guardamos db en el local de express
app.locals.getDB = getDB;
// Body parser (body en JSON)
app.use(bodyParser.json());
// Cors (permite peticiones externas)
app.use(cors());
//Archivos estaticos (habilitar carpeta uploads)
app.use("/static", express.static("static"));
// Body parser (multipart form data <- subida de imágenes)
app.use(fileUpload());
// Logger (solo se empleará durante el desarrollo)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// #################################################################
// #                     Endpoints de espacios                     #
// #################################################################

//GET - Petición para mostrar un espacio en concreto
//URL ejemplo: http://localhost:3000/spaces/1
app.get("/spaces/:space_id", spaceExists, getSpace);

//GET - Filtrar espacios (si no se filtran, se muestran todos) TODOS LOS USUSARIOS
//URL ejemplo: http://localhost:3000/spaces?aforo=23
app.get("/spaces", filterSpaces);

//GET -Filtrar espacios admin
app.get("/admin/spaces", isAdmin, filterSpacesAdmin);

// POST - Crear un espacio
//URL ejemplo: http://localhost:3000/spaces
app.post("/spaces", isAdmin, newSpace);

//PUT - Editar un espacio
//URL ejemplo: http://localhost:3000/spaces/3
app.put("/spaces/:space_id", isAdmin, spaceExists, editSpace);

//PUT - Cambiar estado espacio: habilitado/inhabilitado
//URL ejemplo: http://localhost:3000/enableSpace/5
app.put("/spaces/enable/:space_id", isAdmin, spaceExists, changeStateSpaces);

//DELETE - Eliminar fotos de un espacio
//URL ejemplo: http://localhost:3000/spaces/3
app.delete("/spaces/:space_id", isAdmin, spaceExists, deletePhotos);

// #################################################################
// #                     Endpoints de reservas                     #
// #################################################################

//GET - Obtener reservas de un usuario concreto
//URL ejemplo: http://localhost:3000/1/bookings
app.get("/bookings/:user_id", userExists, isAuthorized, getReservation);

//GET - filtrar todas las reservas, sólo lo usa el admin
//URL ejemplo: http://localhost:3000/admin/bookings
app.get("/admin/bookings", isAdmin, filterbookings);

//POST - Crear una reserva
//URL ejemplo: http://localhost:3000/space/1/1
app.post(
  "/bookings/:space_id/:user_id",
  isAuthorized,
  spaceExists,
  packExists,
  spaceIsEnabled,
  newReservation
);

//PUT - Modificar una reserva
//URL ejemplo: http://localhost:3000/1/bookings/1
app.put(
  "/bookings/:reservation_id/:user_id",
  isAuthorized,
  reservationExists,
  editReservation
);

//DELETE - Eliminar una reserva
//URL ejemplo_ http://localhost:3000/1/bookings/1"
app.delete(
  "/bookings/:reservation_id/:user_id",
  isAuthorized,
  reservationExists,
  deleteReservation
);

// #################################################################
// #                       Endpoints de packs                      #
// #################################################################

//GET - Obtener todos los packs
//URL ejemplo: http://localhost:3000/packs
app.get("/packs", getPack);

//GET - Filtrar packs (solo el administrador)
//URL ejemplo: http://localhost:3000/packs
app.get("/admin/packs", isAdmin, filterPacksAdmin);

//GET - Crear un pack
//URL ejemplo http://localhost:3000/packs
app.post("/packs", isAdmin, newPack);

//PUT - Modificar un pack
//URL ejemplo http://localhost:3000/packs/1
app.put("/packs/:pack_id", isAdmin, packExists, editPack);

//DELETE - Eliminar un pack
//URL ejemplo http://localhost:3000/packs/5
app.delete("/packs/:pack_id", isAdmin, packExists, deletePack);

// #################################################################
// #                    Endpoints de valoraciones                  #
// #################################################################

//GET - Se obtitnen las valoraciones de un usuario
//URL ejemplo: http://localhost:3000/reviews
app.get("/reviews/:review_id/:user_id", isAuthorized, getUserReviews);

//GET - Obtener las valoraciones de un espacio en concreto
//URL ejemplo: http://localhost:3000/reviews/5
app.get("/reviews/:space_id", spaceExists, getReviews);

//GET - Filtrar valoraciones (si no se filtran, se muestran todas)
//URL ejemplo: http://localhost:3000/reviews
app.get("/reviews", isAdmin, filterReviews);

//POST - Crear una valoración
//URL ejemplo: http://localhost:3000/review/3/2
app.post("/review/:space_id/:user_id", isAuthorized, spaceExists, newReview);

//PUT- Editar una valoración
//URL ejemplo: http://localhost:3000/review/3
app.put("/review/:review_id/:user_id", isAuthorized, reviewExists, editReview);

//DELETE - Eliminar una valoración
//URL ejemplo: http://localhost:3000/review/5/
app.delete(
  "/review/:review_id/:user_id",
  isAuthorized,
  reviewExists,
  deleteReview
);

// #################################################################
// #                     Endpoints de reportes                     #
// #################################################################

//GET - Filtrar reportes (si no se filtran, se muestran todos)
//URL ejemplo: http://localhost:3000/report/
app.get("/report", isAdmin, filterReports);

//POST - Crear un reporte
//URL ejemplo: http://localhost:3000/report/1/3
app.post("/report/:user_id/:space_id", isAuthorized, spaceExists, newReport);

//POST - Responder un reporte
//URL ejemplo: http://localhost:3000/report/1
app.post("/report/:report_id", isAdmin, reportExists, answerReports);

//PUT - Editar un reporte
//URL ejemplo: http://localhost:3000/report/1
app.put("/report/:report_id", isAdmin, reportExists, editReport);

//DELETE - Eliminar una reseña
app.delete("/report/:report_id", isAdmin, reportExists, deleteReport);

// #################################################################
// #                     Endpoints de usuarios                     #
// #################################################################

//GET - Validar el email de un usuario (en el registro o en el cambio de correo)
//URL ejemplo_ http://localhost:3000/users/validate/a13a9ab9392...
app.get("/users/validate/:validationCode", validateUser);

//GET - Muestra información de un usuario
//URL ejemplo_ http://localhost:3000/users/6
app.get("/users/:user_id", isAuthorized, getUser);

//GET - Filtrar usuarios (si no se filtra,, se muestran todos)
//URL ejemplo_ http://localhost:3000/users/?user_id=&name=&surname=&...
app.get("/users", isAdmin, filterUsers);

//POST - Registrar un nuevo usuario
//URL ejemplo_ http://localhost:3000/users
app.post("/users", addUser);

//POST - Iniciar sesión (le da un token al usuario)
//URL ejemplo_ http://localhost:3000/users/login
app.post("/users/login", loginUser);

//POST - Enviar un email a un usuario
//URL ejemplo: http://localhost:3000/users/contact/5
app.post("/users/contact/:user_id", isAdmin, userExists, contactUser);

//POST - Recuperar contraseña (envia email al usuario, no modifica la contraseña)
//URL ejemplo: http://localhost:3000/users/recoverPassword
app.post("/users/recoverPassword", recoverUserPassword);

//PUT - Resetear contraseña (modifica la contraseña)
//URL ejemplo: http://localhost:3000/users/resetPassword
app.put("/users/resetPassword", resetUserPassword);

//PUT - Modifica los datos de un usuario
app.put("/users/:user_id", isAuthorized, editUser);

//PUT - Modifica la contraseña de un usuario
//URL ejemplo: http://localhost:3000/users/changePassword
app.put("/users/changePassword/:user_id", isAuthorized, editPassword);

//DELETE - Elimina un usuario (lo vuelve anónimo)
//URL ejemplo_ http://localhost:3000/users/5
app.delete("/users/:user_id", isAuthorized, deleteUser);

// #################################################################
// #                 Endpoints not found y error                   #
// #################################################################

// Middleware de error
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT} 🚀`);
});
