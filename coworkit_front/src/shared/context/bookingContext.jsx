import React, { useEffect, useState } from "react";
import { deleteReservation, getUserBookings } from "../../http/bookings";
import { newReport } from "../../http/reports";
import { editReview, getUserReviewInfo, newReview } from "../../http/reviews";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import { useHistory } from "react-router-dom";
//Fotos de WhatYouNeed
import Despacho from "../../assets/photosSpaces/Despacho0.jpg";
import Compartida from "../../assets/photosSpaces/Compartida03.jpg";
import Juntas from "../../assets/photosSpaces/salaJuntas01.jpg";

// Se crean un contexto y su respectivo proveedor para tener a disposición de todo el componente de bookings las funciones usadas
// No es estrictamente necesario pero facilia la legibilidad del código
export const BookingContext = React.createContext();
const BookingContextProvider = BookingContext.Provider;

export function BookingsProvider({ children }) {
  const history = useHistory();
  const { userData } = useAuth();
  const userId = userData?.id;
  // Estos State de BookingInfo se usan para tomar la información de las reservas presentes, finalizadas y pendientes
  const [currentBookingsInfo, setCurrentBookingsInfo] = useState([]);
  const [finishedBookingsInfo, setFinishedBookingsInfo] = useState([]);
  const [pendingBookingsInfo, setPendingBookingsInfo] = useState([]);

  //*****************
  //*****General*****
  //*****************

  /**
   * @info Esta función hace la consulta de las reservas de un usuario
   * @param {String} reservationType Solo són validos lo valores "finished", "pending" y "current"
   * @return{Object} Devuelve un objeto con la lista de reservas
   */
  async function getBookingsByType(reservationType) {
    const result = await getUserBookings(userId, reservationType);
    if (reservationType === "finished") {
      setFinishedBookingsInfo(result);
    } else if (reservationType === "pending") {
      setPendingBookingsInfo(result);
    } else {
      setCurrentBookingsInfo(result);
    }
  }

  useEffect(() => {
    getBookingsByType("finished");
    getBookingsByType("current");
    getBookingsByType("pending");
  }, []);

  //Estos estate de Modal tienen la funcion de gestinar la vilibilidad de los respectivos modales
  //Gestiona el modal de para crear reportes
  const [activeReportModal, setActiveReportModal] = useState(false);
  //Gestiona el modal de para crear valoraciones
  const [activeReviewModal, setActiveReviewModal] = useState(false);
  //Gestiona el modal de para editar valoraciones
  const [activeEditReviewModal, setEditReviewOption] = useState(false);

  //*****************
  //***Valoraciones**
  //*****************

  //Se usa para indicar en la petición a la API sobre que espcio se hará la valoración
  const [reviewSelected, setReviewSelected] = useState(null);
  //Este State se usa en la edición de valoración para poder editar la valoración anterior
  const [reviewInfo, setReviewInfo] = useState(null);
  /**
   * @info Esta función hace la consulta la valoración según el Id de la misma y el usuario que la haya hecho
   * @param {int} reviewId -Es el Id de la valoaración
   * @return{Object} Devuelve un objeto con los detalles de la valoración
   */
  async function userReviewInfo(reviewId) {
    const result = await getUserReviewInfo({ userId, reviewId });
    setReviewInfo(result);
  }

  //Tiene la función de actualizar dar lugar a la actualización de la información de la reserva seleccionada.
  // Así,cada vez que la reserva seleccionada cambie, lo hara la información de la misma presente en el context
  useEffect(() => {
    if (reviewSelected) {
      userReviewInfo(reviewSelected);
    }
  }, [reviewSelected]);

  //Cada que se pulse el boton de valorar o editar valoración, se colocará en el estado el ID de la valoración que le corresponde
  // De esta forma en cuanto se envie la valoración o edición de la misma se sabrá a qel ID de la misma en todo momento
  const activeReviewOfSpace = async (spaceId, reviewId) => {
    if (reviewId) {
      setReviewSelected(reviewId);
      await userReviewInfo(reviewId);

      setEditReviewOption(!activeEditReviewModal);
    } else {
      setActiveReviewModal(!activeReviewModal);
      setSpaceSelected(spaceId);
    }
  };

  //Hace la petición de tipo POST a la API para crear una valoración, a su vez oculta el modal en el que se introduce la información
  const sendReview = async (data) => {
    await newReview({ userId, spaceId: spaceSelected, ...data });

    setActiveReviewModal(!activeReviewModal);
  };

  //Hace la petición de tipo PUT a la API para editar una valoración, a su vez oculta el modal en el que se introduce la información
  const changeReview = async (data) => {
    setEditReviewOption(!activeEditReviewModal);
    await editReview({ userId, reviewId: reviewSelected, ...data });
    // await userReviewInfo(reviewSelected);
  };

  //*****************
  //****Reportes*****
  //*****************
  //Se usa para indicar en la petición a la API sobre que espcio se hará el reporte
  const [spaceSelected, setSpaceSelected] = useState(null);

  //Cada que se pulse el boton de reporte, se colocará en el estado el ID del espacio seleccionado
  // De esta forma en cuanto se envie el reporte se sabrá a que espacio pertenece
  const activeReportOfSpace = (spaceId) => {
    setActiveReportModal(!activeReportModal);
    setSpaceSelected(spaceId);
  };

  //Hace la petición de tipo POST a la API para crear un reporte, a su vez oculta el modal en el que se introduce la información
  const sendReport = async (data) => {
    await newReport({ userId, spaceId: spaceSelected, ...data });
    setActiveReportModal(false);
  };

  //****************/
  //***Bookins*****/
  //**************/

  //Valores por defecto del calendar
  const [defaultDates, setDefaultDates] = useState([
    moment(new Date()).format("l"),
    moment(new Date()).format("l"),
  ]);

  //Aqui está el pack reservado
  const [reservedPack, setReservedPack] = useState({
    ID: 1,
    content: "Si quieres más, paga",
    photo: "http://localhost:3000/static/uploads/packs/img/pack1.jpg",
    price: 0,
    type: "Básico",
  });
  //Array con start_date y end_date en formato: "moment(fecha).format("l")"
  const [modificationDates, setModificationDates] = useState(null);
  //Informacion de la petición de espacio
  const [space, setSpace] = useState({
    dates: [
      {
        start_date: "1980/02/02",
        end_date: "1980/02/02",
      },
    ],
  });
  //Valores por defecto del calendario
  const [value, setValue] = useState([new Date(), new Date()]);

  //Array con las fechas no disponibles (ya reservadas)
  const [dates, setDates] = useState({
    start_date: "1980/02/02",
    end_date: "1980/02/02",
  });
  //Aquí si se quiere modificar una resreva, quita las fechas ya reservadas anteriormente de "dates"
  useEffect(() => {
    setDates(
      space?.dates?.filter((date) => {
        if (modificationDates) {
          return (
            moment(date.start_date).format() !== modificationDates[0] &&
            moment(date.end_date).format() !== modificationDates[1]
          );
        } else {
          return date;
        }
      })
    );
  }, [space, modificationDates]);

  //Información de la reserva que se editará al modificar reserva
  const [orderToEdit, setOrderToEdit] = useState({
    ID: 1,
    content: "Si quieres más, paga",
    photo: "http://localhost:3000/static/uploads/packs/img/pack1.jpg",
    price: 0,
    type: "Básico",
    startDate: "",
    endDate: "",
  });
  const editReservation = async (data, typeOfEdition) => {
    if (typeOfEdition === "change") {
      setModificateBooking(true);
      setOrderToEdit(data);
      setFilter({
        ...filter,
        startDate: moment(data.startDate).format("l"),
        start_date: moment(data.startDate).format("l"),
        endDate: moment(data.endDate).format("l"),
        end_date: moment(data.endDate).format("l"),
        packId: data.packId,
        packName: data.packName,
        spaceId: data.spaceId,
      });
      history.push(`/spaces/${data.spaceId}`);
    }
    if (typeOfEdition === "delete") {
      await deleteReservation(data.id, data.userId);
      getBookingsByType("pending");
    }
  };
  //Al pulsar modificar, cambio los valores por defecto del formspaces y elimino la fecha reservada
  //? Esto no debería estar en el boton dd haces click? Medio muhos problemas...
  /*  useEffect(() => {
    if (orderToEdit) {
      setMod(true);
      setModificationDates([orderToEdit?.startDate, orderToEdit?.endDate]);
      setFilter({
        packId: orderToEdit?.packId,
        content: "Si quieres más, paga",
        price: orderToEdit?.price,
        type: orderToEdit?.packName,
        start_date: orderToEdit?.startDate,
        end_date: orderToEdit?.endDate,
      });
      setValue([orderToEdit?.startDate, orderToEdit?.endDate]);
    }
  }, [orderToEdit]);*/

  //    #################
  //    #####Spaces######
  //    #################

  //SpacesContext (hay problemas si metemos dos context en la misma pagina, así que lo meto todo aqui)
  //Tipos de espacios
  const [spaceTypes, setSpaceTypes] = useState([
    "Auditorio",
    "Oficina individual",
    "Oficina compartida",
    "Sala audiovisual",
    "Sala de reuniones",
  ]);
  //Imagenes de los tipos de espacios (Estan en las cards de home)
  const [imageTypeSpaces, setImageTypeSpaces] = useState([
    "https://i0.wp.com/www.eneldo.es/wp-content/uploads/2016/04/Espacios_AuditoriumMM.jpg?w=1080&ssl=1",
    Despacho,
    Compartida,
    "https://avintegracion.com/wp-content/uploads/2020/07/Yealink-meetingeye-400-sala-conferencias.jpg",
    Juntas,
  ]);
  const [mod, setMod] = useState(false);
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    price: 200,
    capacity: 0,
    score: "",
    type: "",
    packId: 1,
    packName: "Básico",
    spaceId: "",
    //dates: [{ end_date: "", start_date: "" }],¿Servirían para desabilitar los no disponibles en un futuro calendar
  });
  const packsTypes = ["Básico", "Intermedio", "Audiovisual", "Informático"];
  const [modificateBooking, setModificateBooking] = useState(false);
  return (
    <BookingContextProvider
      value={{
        currentBookingsInfo,
        setCurrentBookingsInfo,
        finishedBookingsInfo,
        setFinishedBookingsInfo,
        pendingBookingsInfo,
        setPendingBookingsInfo,
        activeReportModal,
        setActiveReportModal,
        activeReviewModal,
        setActiveReviewModal,
        activeEditReviewModal,
        setEditReviewOption,
        spaceSelected,
        setSpaceSelected,
        reviewSelected,
        setReviewSelected,
        reviewInfo,
        setReviewInfo,
        getBookingsByType,
        userReviewInfo,
        activeReportOfSpace,
        activeReviewOfSpace,
        sendReport,
        sendReview,
        changeReview,
        userId,
        defaultDates,
        setDefaultDates,
        modificationDates,
        setModificationDates,
        dates,
        setDates,
        space,
        setSpace,
        reservedPack,
        setReservedPack,
        value,
        setValue,
        editReservation,
        spaceTypes,
        setSpaceTypes,
        imageTypeSpaces,
        /*        filtersOptions,
        setFiltersOptions,
*/
        filter,
        setFilter,
        modificateBooking,
        setModificateBooking,
        packsTypes,
        mod,
        setMod,
      }}
    >
      {children}
    </BookingContextProvider>
  );
}
