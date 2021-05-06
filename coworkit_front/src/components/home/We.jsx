import "../../css/Home/parallax.css";

export default function we() {
  return (
    <>
      <header>
        <h1 id="us" className="principal">Nosotros</h1>
      </header>
      <article className="we">
        <div>
          <section className="section parallax bg1 bg">
            <article>
              <ul>
                <li>Desarrollador Full-Stack</li>
                <li>Ingeniero de energías</li>
                <li>Programador robótico industrial</li>
              </ul>
            </article>
          </section>
          <section className="section static static1"></section>
        </div>
        <div>
          <section className="section static static2"></section>
          <section className="section parallax bg2 bg ">
            <article>
              <ul>
                <li>Desarrollador Full-Stack</li>
                <li>Físico</li>
              </ul>
            </article>
          </section>
        </div>
        <div>
          <section className="section parallax bg3 bg">
            <article>
              <ul>
                <li>Desarrollador Full-Stack</li>
                <li>Administrador de sistemas</li>
              </ul>
            </article>
          </section>
          <section className="section static static3"></section>
        </div>
      </article>
    </>
  );
}
