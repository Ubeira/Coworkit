import { AdminContext } from "../context/adminContext";
import { useContext } from "react";

export default function useAdminContext() {
  const context = useContext(AdminContext);
  return context;
}
