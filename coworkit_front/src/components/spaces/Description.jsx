export default function Description(props) {
  return (
    <article className="descriptionContainer">
      <header>
        <h2>Características</h2>
      </header>

      <section>
        <ul className="spaceDetails">
          <li>{props.type}</li>
          <li>Aforo: {props.capacity}</li>
          <li>Precio: {props.price} €/día</li>
        </ul>
        <p>{props.description}</p>
      </section>
    </article>
  );
}
