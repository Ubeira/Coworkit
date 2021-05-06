/**
 * Función que establece los parámetros de una petición get desde un formulario
 * @param {Object} data - Objeto con los datos de un formulario
 * @returns Parámetros de una petición GET -> ?id=3&space=espacio1...
 */

export default function queryGenerator(data) {
  const filters = Object.entries(data).reduce((acc, item) => {
    if (item[1] !== "") {
      acc += `${item[0]}=${item[1]}&`;
    }
    return acc;
  }, "?");
  return filters;
}
