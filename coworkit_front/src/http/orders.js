import { fetchApi, requestMethods } from "../shared/utils/fetchFunctions";

const endpoints = {
  filterAdmin: "/admin/bookings/",
  bookingsInfo: "/bookings/",
  deleteReservation: "/bookings/",
};

export async function filterOrdersAdmin(
  query = "",
  order = "",
  direction = ""
) {
  const ordenation = `order=${order}&direction=${direction}`;
  const bookingData = await fetchApi(
    `${endpoints.filterAdmin}${query}${ordenation}`,
    {
      method: requestMethods.get,
    }
  );

  return bookingData.data;
}
/**
 *
 * @param {query} query recibe :space_id/user_id
 * @param {Object} body recibe :{pack_id,start_date,end_date}
 * @return {Object} devuelve un objeto con los elementos reservados, dados por el back
 */
export async function newReservation(query, body) {
  if (!body.pack_id) body.pack_id = 1;
  const reviewData = await fetchApi(`${endpoints.bookingsInfo}${query}`, {
    method: requestMethods.post,
    body: { ...body },
  });
  if (reviewData.status === "error") {
    return reviewData;
  }
  return reviewData.data;
}

export async function deleteReservation(reservationId, userId) {
  try {
    await fetchApi(`${endpoints.deleteReservation}${reservationId}/${userId}`, {
      method: requestMethods.delete,
    });
  } catch (error) {
    console.error(error);
  }
}
