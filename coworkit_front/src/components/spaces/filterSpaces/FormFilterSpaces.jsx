import { useEffect, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import Calendar from "../Calendar";
import Button from "@material-ui/core/Button";
import useBookings from "../../../shared/hooks/useBookings";
import { SpaceTypeSelector } from "./SpaceTypeSelector";
import { CustomizedSlider } from "./ExamplesSliders";
import "../../../css/spaces/filterComponents.css";

export default function FormFilterSpaces(props) {
  const { filter } = useBookings();
  const { handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  //Aquí hago la peticion una vez hago sumit en el formulario de filtro
  const onSubmit = async (data) => {
    try {
      //pongo el error a vacío
      setErrorMessage("");
      //hago la petición
      const serverResponse = await props.onSubmit(filter);
      console.log(serverResponse);
      //Si da error aparece debajo del formulario el problema
      if (serverResponse.status === "error") {
        setErrorMessage(serverResponse.message);
      } else {
        //Cierro el modal
        props.setState(false);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <form className="filterSpacesForm" onSubmit={handleSubmit(onSubmit)}>
      <CustomizedSlider
        title={"Puntuación mínima"}
        min={0}
        max={10}
        step={1}
        name={"score"}
      />
      <CustomizedSlider
        title={"Precio máximo"}
        min={0}
        max={200}
        step={10}
        name={"price"}
      />
      <CustomizedSlider
        title={"Aforo mínimo"}
        min={0}
        max={200}
        step={1}
        name={"capacity"}
      />
      <SpaceTypeSelector />
      <br></br>

      <Calendar dates={{ start_date: "1980/02/02", end_date: "1980/02/02" }} />
      {/* En dates se introdue un array de fechas a deshabilitar */}
      <br></br>
      <button className="button filterSpacesButton" type="submit">
        Filtrar
      </button>

      {errorMessage.length > 0 && <h2 className="error">{errorMessage}</h2>}
    </form>
  );
}
