import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";
import useBookings from "../../shared/hooks/useBookings";

/**
 *
 * @param {Array} dates-Array de fechas no disponibles
 * @param {function} setValue- useState function
 * @param {Array} Value- useState array de string, devuelve las fechas seleccionadas
 *
 */
export default function Calendar() {
  const { dates, filter, setFilter } = useBookings();
  const handleChange = (fechas) => {
    fechas
      ? setFilter({
          ...filter,
          start_date: moment(fechas[0]).format("l"),
          end_date: moment(fechas[1]).format("l"),
        })
      : setFilter({
          ...filter,
          start_date: "",
          end_date: "",
        });
  };

  return (
    <DateRangePicker
      returnValue={"range"}
      onChange={handleChange}
      value={[filter.start_date, filter.end_date]}
      minDate={new Date()}
      //tileDisabled={({ activeStartDate, date, view }) => {
      //  const formatDate = moment(date);
      //  const [reservedDays] = dates.map((date) => {
      //    //Todos los true pondrían la fecha en desabilitada
      //    return (
      //      formatDate <= moment(date.end_date) &&
      //      formatDate >= moment(date.start_date)
      //    );
      //  });
      //  return reservedDays;
      //}}
    />
  );
}
