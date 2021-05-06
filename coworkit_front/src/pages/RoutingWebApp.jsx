import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
  } from "react-router-dom";
import Header from "../components/Header";
import { AuthProvider } from "../shared/context/authContext";
import { BookingsProvider } from "../shared/context/bookingContext";
import Admin from "./Admin";
import Bookings from "./Bookings";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import Spaces from "./Spaces";
import Space from "./Space";
import EditUser from "./EditUser";
import ErrorPage from "./ErrorPage";
import NotFound from "./NotFound";

export default function RoutingWebApp() {
    return (
        <Router>
        <Header />
        <AuthProvider>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/admin">
              <Admin/>
            </Route>
            <Route exact path="/bookings">
              <BookingsProvider>
                <Bookings />
              </BookingsProvider>
            </Route>
            <Route exact path="/bookings/finished">
              <Redirect to={"/bookings"} />
            </Route>
            <Route exact path="/bookings/pending">
              <Redirect to={"/bookings"} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/spaces">
              <Spaces />
            </Route>
            <Route exact path="/spaces/:spaceId">
              <Space />
            </Route>
            <Route exact path="/profile/edit">
              <EditUser />
            </Route>
            <Route exact path="/error">
              <ErrorPage />
            </Route>
            <Route exact path="/login"></Route>
            {/* <Route component={NotFound}></Route> */}
          </Switch>
        </AuthProvider>
      </Router>
    )
}
