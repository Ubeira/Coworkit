import "../css/Home/home.css";
import { Suspense, lazy, useEffect } from "react";
import LogoGif from "../components/LogoGif";
import useProfile from "../shared/hooks/useProfile";
import { getUserInfo } from "../http/users";
import useAuth from "../shared/hooks/useAuth";

const WhatYouNeed = lazy(() => import("../components/home/WhatYouNeed"));
const Footer = lazy(() => import("../components/home/Footer"));
const Recomentations = lazy(() => import("../components/home/Recomentations"));
const We = lazy(() => import("../components/home/We"));
//import WhatYouNeed from "../components/home/WhatYouNeed";

export default function Home() {

  return (
    <Suspense fallback={<LogoGif />}>
      <section className="homeContainer">
        <section className="sectionHome">
          <WhatYouNeed />
        </section>

        <section className="sectionRecomendations">
          <Recomentations />
        </section>
        <section className="sectionHome parallaxContainer">
          <We />
        </section>
        <section className="sectionFooter">
          <Footer />
        </section>
      </section>
    </Suspense>
  );
}
