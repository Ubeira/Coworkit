import useAuth from "../hooks/useAuth";

const apiUrl = "http://localhost:3000";

//Métodos empleados en nuestras peticiones
export const requestMethods = {
  post: "POST",
  get: "GET",
  put: "PUT",
  delete: "DELETE",
};

/**
 *Función que empleamos para realizar peticiones a nuestra API
 * @param {string} path - Ruta a la que realizar la petición
 * @param {Object} - Objeto con el cuero de la petición y el método a emplear
 * @returns {Object} - Resultado de la petición
 */

export async function fetchApi(path, { body, method }) {
  //const { setErrorApi, redirect } = useAuth();
  const token = localStorage.getItem("token");
  const headers = new Headers({ "Content-Type": "application/json" });
  if (token) {
    headers.append("Authorization", token);
  }
  const request = await fetch(`${apiUrl}${path}`, {
    headers,
    method,
    body: JSON.stringify(body),
  });
  const data = await request.json();
  //if (data.status === "Error") throw data.message;
  return data;
}

/**
 * Función que empleamos para realiar peticiones que incluyan contenido multimedia
 *
 * @param {string} path - Ruta a la que realizar la petición
 * @param {Object} - Objeto con el cuero de la petición y el método a emplear
 * @returns {Object} - Resultado de la petición
 */

export async function fetchFormData(path, { body, method }) {
  const token = localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Authorization", token);

  return await fetch(`${apiUrl}${path}`, { method, headers, body });
}
