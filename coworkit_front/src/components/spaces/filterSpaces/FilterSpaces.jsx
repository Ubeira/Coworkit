import { useEffect, useState } from "react";
import { filterSpaces } from "../../../http/spaces";
import FormFilterSpaces from "./FormFilterSpaces";
import SpaceCard from "./SpaceCard";
import useBookings from "../../../shared/hooks/useBookings";
import Modal from "../../modales/Modal";
import filterIcon from "../../../assets/iconos/filter.svg";

export default function FilterSpaces() {
  const { filter, setFilter } = useBookings();
  const [state, setState] = useState(false);
  const [spacesFiltered, setSpacesFiltered] = useState([]);

  const handleFilter = function (e) {
    e.preventDefault();
    setState(!state);
  };

  useEffect(() => {
    const load = async function () {
      const data = await filterSpaces(filter);
      setSpacesFiltered(data);
      console.log(filter);
    };
    load();
  }, [filter]);
  return (
    <section className="filterSpacesContainer">
      <button className="filterButton" onClick={handleFilter}>
        <img className="filterIcon" src={filterIcon} alt="icono de filtro" />
        Filtro
      </button>
      <header className="filterHeader">
        <h1>Espacios disponibles</h1>
      </header>
      <Modal
        className="filterModal"
        content={
          <FormFilterSpaces onSubmit={filterSpaces} setState={setState} />
        }
        active={state}
        firstBtn={false}
        secondBtn={false}
      />
      <section className="filteredSpacesContainer">
        {spacesFiltered.map((space) => {
          return <SpaceCard space={space} key={space.ID} />;
        }, [])}
      </section>
    </section>
  );
}
