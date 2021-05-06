import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";

export default function UserConfirm() {
  const { recoveryPassword } = useParams();
  const { validateUser } = useAuth();
  const [message, setMessage] = useState();

  useEffect(() => {
    const load = async () => {
      setMessage(await validateUser(recoveryPassword));
    };
    load();
  }, [recoveryPassword, validateUser]);

  return (
    <div className="fatherForms">
      <section className="container validationEmail">
        {message?.status === "error" && (
          <main>
            <h1 className="error">{message?.message}</h1>
          </main>
        )}
        {message?.status !== "error" && (
          <main>
            <h1>Email confirmado!!</h1>
            <p>
              Bienvenid@ a Coworkit, esperamos que disfrute de nuestros
              servicios.
            </p>
          </main>
        )}
      </section>
    </div>
  );
}
