import Button from "@material-ui/core/Button";
import "../../css/packs/packs.css";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import useBookings from "../../shared/hooks/useBookings";
export default function Packs({ setState, packs, setPack }) {
  const { filter, setFilter } = useBookings();
  return (
    <section className="packsContainer">
      {packs.map((pack) => {
        return (
          <ButtonGroup
            className="materialUi"
            orientation="vertical"
            variant="contained"
            color="default"
            aria-label=""
            key={`pack${pack.ID}`}
            onClick={() => {
              setState(false);
              setFilter({ ...filter, packId: pack.ID });
            }}
          >
            <label htmlFor={pack.ID} className="packCard">
              <h2>{pack.type}</h2>
              <img src={pack.photo} alt={`Foto pack ${pack.type}`} />
              <p>{pack.content}</p>
              <h2>{pack.price} €/día</h2>
            </label>

            <Button type="submit" name="packId" id={pack.ID} value={pack.ID}>
              Seleccionar
            </Button>
          </ButtonGroup>
        );
      })}
    </section>
  );
}
