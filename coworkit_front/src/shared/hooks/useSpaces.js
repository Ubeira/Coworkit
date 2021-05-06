import { SpacesContext } from "../context/spacesContext";
import { useContext } from "react";

export default function useSpaces() {
  const context = useContext(SpacesContext);
  return context;
}
