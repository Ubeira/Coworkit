import { iconStorage } from "../../shared/utils/iconStorage";
import "../../css/EasterEgg.css";

export default function EasterEgg() {
  return (
    <div id="easterEggContainer">
      <span>¿Estabas intentando eliminar tu propio usuario, en serio?</span>
      <div id="easterEggDiv">{iconStorage("alertUser")}</div>
      <span>
        Entendemos que ser adminstrador puede ser difícil en ocasiones <br />
        De momento, tómate un descanso y vuelve cunado te sientas mejor :D
        <br />
        <form action="https://es.wikihow.com/relajarse">
          <input type="submit" value="Relajarme" />
        </form>
      </span>
    </div>
  );
}
