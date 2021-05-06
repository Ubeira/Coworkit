/**
 * Función que traduce las keys que nos llegan de una petición (name => Nombre...)
 *
 * @param {Array} fetchData - Array con las keys de la petición
 * @param {String} type - Tabla a la que se realiza la consulta
 * @returns {Array} Un array con las cabeceras en castellano
 */

export default function headerTranslator(fetchData, type) {
  const ID = "Id";
  const id = "Id";
  const name = "Nombre";
  const price = "Precio";
  const space_name = "Espacio";
  const user_name = "Usuario";
  const description = "Descripción";
  const enabled = "Habilitado";

  const users = {
    ID,
    name,
    surname: "Apellidos",
    nif: "NIF",
    photo: "Foto",
    email: "Email",
    tel: "Teléfono",
    registration_date: "Registro",
    company: "Empresa",
    admin: "Admin",
    verified: "Verificado",
    deleted: "Eliminado",
  };

  const spaces = {
    ID,
    name,
    description,
    price,
    type: "Tipo",
    capacity: "Aforo",
    enabled,
    url: "Foto",
  };

  const reports = {
    ID,
    description,
    space_name,
    user_name,
    category: "Categoría",
    solved: "Solucionado",
    report_date: "Fecha",
  };

  const packs = {
    ID,
    price,
    enabled,
    type: "Nombre",
    content: "Descripción",
    photo: "Foto",
  };

  const reviews = {
    id,
    user_name,
    space_name,
    comment: "Comentario",
    score: "Puntuación",
    review_date: "Fecha",
  };

  const orders = {
    id,
    space_name,
    price,
    space_type: "Tipo de espacio",
    user_name,
    pack: "Pack",
    start_date: "Inicio",
    end_date: "Fin",
    order_date: "Pedido",
  };

  const translations = {
    users,
    spaces,
    reports,
    packs,
    reviews,
    orders,
  };
  return fetchData.map((item) => [translations[type][item], item]);
}
