import { ProfileContext } from "../context/profileContext";
import { useContext } from "react";

export default function useProfile() {
  const context = useContext(ProfileContext);
  return context;
}
