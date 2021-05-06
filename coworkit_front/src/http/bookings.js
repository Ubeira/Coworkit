import { fetchApi, requestMethods } from "../shared/utils/fetchFunctions";

const endpoints = {
  userBookings: "/bookings/",
  deleteUserReservation: "/bookings/",
  editBooking: "/bookings/",
};
const queryStrings = {
  userBookings: "?type=",
};

export async function getUserBookings(userId, bookingType) {
  const bookingsResult = await fetchApi(
    `${endpoints.userBookings}${userId}${queryStrings.userBookings}${bookingType}`,
    {
      method: requestMethods.get,
    }
  );
  return bookingsResult.data;
}
export async function deleteReservation(reservationId, userId) {
  const reviewData = await fetchApi(
    `${endpoints.userBookings}${reservationId}/${userId}`,
    {
      method: requestMethods.delete,
    }
  );
  return reviewData.data;
}

export async function editbooking(body, reservationId, userID) {
  await fetchApi(`${endpoints.editBooking}${reservationId}/${userID}`, {
    method: requestMethods.put,
    body: { ...body },
  });
}
