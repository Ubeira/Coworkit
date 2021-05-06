import { useEffect, useState } from "react";
import moment from "moment";
import "../../css/spaces/formSpace.css";
import Modal from "../modales/Modal";
import Packs from "./Packs";
import Calendar from "./Calendar";
import { getPacksInfo } from "../../http/packs";
import { newReservation } from "../../http/orders";
import useAuth from "../../shared/hooks/useAuth";
import InfoModal from "../modales/InfoModal";
import useBookings from "../../shared/hooks/useBookings";
import { editbooking } from "../../http/bookings";

export default function FormSpace(props) {
  const [state, setState] = useState(false); //Modal
  const {
    reservedPack,
    filter,
    modificateBooking,
    setModificateBooking,
    orderToEdit,
    setMod,
    mod,
    setOrderToEdit,
  } = useBookings();
  const [messageError, setMessageError] = useState("");
  const [packs, setPacks] = useState([]); //Aqui están todos los paaaacks
  const [days, setDays] = useState(0); //número de días
  const [totalPrice, setTotalPrice] = useState(1); //Aquí calculo el precio final
  const [infoModalState, setInfoModalState] = useState(false);
  const { userData, redirection } = useAuth(); //Información del usuario ¿Esta registrado?
  const [pack, setPack] = useState({
    ID: 1,
    content: "Si quieres más, paga",
    photo: "http://localhost:3000/static/uploads/packs/img/pack1.jpg",
    price: 0,
    type: "Básico",
  });
  const [dias, setDias] = useState({ startDate: "", endDate: "" });
  const [content, setContent] = useState("");
  //Cuando clicko en el boton cambiar pack, se activa el modal para seleccionar packs
  const handlePacks = function (e) {
    e.preventDefault();
    setState(!state);
  };
  //Al aceptar el popup de ModalInfo, redirecciona a bookins
  const changePage = function () {
    redirection("/bookings");
  };

  //Cuando pulsas el boton reservar:
  const handleModification = async function (e) {
    setOrderToEdit();
    setMod(false);
    setDias({
      startDate: moment(filter.start_date).format("l"),
      endDate: moment(filter.end_date).format("l"),
    });
    setContent(`Se ha confirmado la modificación la reserva del espacio ${props.spaceName} con el pack ${filter?.packName.type}
    desde  ${dias.startDate} hasta  ${dias.end_date} `);
    e.preventDefault();
    //si estas logueado, haces un post a newreservation, donde le envias los querys y bodys
    if (userData) {
      if (filter.start_date === "") {
        setMessageError("Por favor seleccione las fechas de la reserva");
      } else {
        const body = {
          start_date: filter.start_date,
          end_date: filter.end_date,
          pack_id: filter.packId,
          space_id: filter.spaceId,
        };
        setModificateBooking(false);
        const response = await editbooking(
          orderToEdit?.packId,
          userData.id,
          body
        );
        if (response?.status === "error") {
          setMessageError(response?.message);
        } else {
          //Activo el ModalInfo, con la confirmación del pago, y al aceptarlo activa la función changePage
          setInfoModalState(!infoModalState);
        }
      }
    } else {
      redirection("/login"); //provisional, cuando no estás logueado te envia directamente a login
    }
  };

  //Cuando pulsas el boton modificar:
  const handleReservation = async function (e) {
    setContent(`Se ha confirmado el pago para la reserva del espacio ${props.spaceName} con el pack ${reservedPack.type}
    desde  ${dias.startDate} hasta  ${dias.endDate} por un precio final de ${totalPrice} €`);
    e.preventDefault();
    //si estas logueado, haces un post a newreservation, donde le envias los querys y bodys
    if (userData) {
      if (filter.start_date === "") {
        setMessageError("Por favor seleccione las fechas de la reserva");
      } else {
        const query = `${props.spaceId}/${userData.id}`;
        const body = {
          start_date: filter.start_date,
          end_date: filter.end_date,
          pack_id: filter.packId,
        };
        const response = await newReservation(query, body);
        if (response?.status === "error") {
          setMessageError(response?.message);
          console.log(response);
        } else {
          //Activo el ModalInfo, con la confirmación del pago, y al aceptarlo activa la función changePage
          setInfoModalState(!infoModalState);
          //setFilter({ ...filter, endDate: "", startDate: "" });
        }
      }
    } else {
      redirection("/login"); //provisional, cuando no estás logueado te envia directamente a login
    }
  };
  //Aqui hago la petició de todos los packs
  useEffect(() => {
    const load = async () => {
      const data = await getPacksInfo();
      setPacks(data);
      setPack(data.filter((item) => item.ID === filter.packId));
    };
    load();
  }, [filter]);
  //Hago un use Effect para que cambien las cosas cada vez que se seleccione en el formulario
  useEffect(() => {
    setDias({
      startDate: moment(filter.start_date).format("l"),
      endDate: moment(filter.end_date).format("l"),
    });
    //Aquí calculo la diferencia de dias y evito el error de cuando está vacio
    if (filter.startDate !== "" && filter.endDate !== "") {
      setDays(
        moment(filter?.endDate).diff(moment(filter?.startDate), "days") + 1
      );
    } else {
      setDays(1);
    }
    //Aqui calculo el precio total cada vez que cambian el pack, o fechas
    setTotalPrice((pack[0]?.price + props.price) * days);
  }, [filter, pack, days, setDias]);
  return (
    <form id="formSpace" className="spaceForm">
      <section>
        <h2>
          Pack {filter.packName}:
          {filter.packId < 2
            ? " Gratis!!"
            : `${packs[filter.packId - 1]?.price}
            €/día`}
        </h2>
        <button className="packButton button" onClick={handlePacks}>
          Cambiar pack
        </button>
      </section>
      <Calendar required dates={props.dates} />
      <section>
        <h2>{mod ? `Precio total: ${totalPrice} €` : ""}</h2>
        {modificateBooking ? (
          <button
            className="packButton button reservedButton"
            onClick={handleModification}
          >
            Modificar
          </button>
        ) : (
          <button
            className="packButton button reservedButton reservedButton"
            onClick={handleReservation}
          >
            Reservar
          </button>
        )}
      </section>
      <Modal
        title="¿Que pack necesitas?"
        content={<Packs packs={packs} setState={setState} setPack={setPack} />}
        active={state}
        firstBtn={false}
        textBtn="Seleccionar"
        secondBtn={false}
        textSecBtn="Cancelar"
      />
      {messageError?.length > 0 && (
        <h2 className="error">Es necesario indicar la fecha de la reserva</h2>
      )}
      <InfoModal
        active={infoModalState}
        title={"Pago confirmado!"}
        agreeAction={changePage}
        content={content}
      />
    </form>
  );
}
