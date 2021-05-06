import { BookingContext } from "../context/bookingContext";
import { useContext } from "react";

export default function useBookings() {
  const context = useContext(BookingContext);
  return context;
}
