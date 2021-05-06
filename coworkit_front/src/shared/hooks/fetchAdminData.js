import { filterReviewsAdmin as reviews } from "../../http/reviews";
import { filterOrdersAdmin as orders } from "../../http/orders";
import { filterSpacesAdmin as spaces } from "../../http/spaces";
import { filterUsersAdmin as users } from "../../http/users";
import { filterReportsAdmin as reports } from "../../http/reports";
import { filterPacksAdmin as packs } from "../../http/packs";

/**
 *
 * @param {string} section - Sección (spaces)
 * @param {string} query - Filtros (&id=5...)
 * @param {string} order - Campo de ordenación (&order=id)
 * @param {string} direction - Dirección de ordenación (&direction=asc)
 * @returns {Array} Resultado de la petición
 */
export default async function fetchAdminData(
  section = "",
  query,
  order,
  direction
) {
  //Objeto con las funciones que realizan las peticiones a back
  const fetchFunctions = {
    reviews,
    orders,
    spaces,
    users,
    reports,
    packs,
  };

  return section === ""
    ? []
    : await fetchFunctions[section](query, order, direction);
}
