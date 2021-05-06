import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
import LogoGif from "../components/LogoGif";
import "../css/bookings/bookings.css";
import "../css/bookings/reservationFrame.css";

const CurrentBookings = lazy(() =>
  import("../components/bookings/CurrentBookings")
);
const FinishedBookings = lazy(() =>
  import("../components/bookings/FinishedBookings")
);
const PendingBookings = lazy(() =>
  import("../components/bookings/PendingBookings")
);

export default function Bookings() {
  return (
    <Suspense fallback={<LogoGif />}>
      <Router>
        <Switch>
          <Route exact path="/bookings">
            <CurrentBookings />
          </Route>
          <Route exact path="/bookings/finished">
            <FinishedBookings />
          </Route>
          <Route exact path="/bookings/pending">
            <PendingBookings />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}
