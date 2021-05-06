//import { IntlProvider } from "react-intl";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./css/main.css";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./shared/context/authContext.js";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Spaces from "./pages/Spaces.jsx";
import Space from "./pages/Space.jsx";
import Header from "./components/Header.jsx";
import Admin from "./pages/Admin.jsx";
import "./css/global.css";
import Bookings from "./pages/Bookings.jsx";
import { BookingsProvider } from "./shared/context/bookingContext.jsx";
import { ProfileProvider } from "./shared/context/profileContext.jsx";
import { SpacesProvider } from "./shared/context/spacesContext.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import RoutingWebApp from "./pages/RoutingWebApp.jsx";
import FinishedBookings from "./components/bookings/FinishedBookings.jsx";
import PendingBookings from "./components/bookings/PendingBookings.jsx";
import Footer from "./components/home/Footer.jsx";
import RecoverPassword from "./pages/RecoverPassword.jsx";
import UserConfirm from "./pages/UserConfirm.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Recomentations from "./components/home/Recomentations.jsx";
import { FormEditSpace } from "./components/users/FormUtils.jsx";
import ConfigurateSpace from "./components/spaces/ConfigurateSpace.jsx";
import PrivateRoute from "./shared/guards/PrivateRoute";
import PublicRoute from "./shared/guards/PublicRoute";
import AdminRoute from "./shared/guards/AdminRoute";

function App() {
  return (
    // <IntlProvider>
    <Router>
      <AuthProvider>
        {/* <ProfileProvider> */}
        <Header />
        {/* </ProfileProvider> */}
        <Switch>
          <Route exact path="/login">
            <PublicRoute>
              <Login />
            </PublicRoute>
          </Route>
          <Route exact path="/admin">
            <AdminRoute>
              <Admin />
            </AdminRoute>
          </Route>
          <Route exact path="/bookings">
            <PrivateRoute>
              <BookingsProvider>
                <Bookings />
              </BookingsProvider>
            </PrivateRoute>
          </Route>
          <Route exact path="/bookings/finished">
            <PrivateRoute>
              <BookingsProvider>
                <FinishedBookings />
              </BookingsProvider>
            </PrivateRoute>
          </Route>
          <Route exact path="/bookings/pending">
            <PrivateRoute>
              <BookingsProvider>
                <PendingBookings />
              </BookingsProvider>
            </PrivateRoute>
          </Route>
          <Route exact path="/profile">
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          </Route>
          <Route exact path="/register">
            <PublicRoute>
              <Register />
            </PublicRoute>
          </Route>
          <Route exact path="/spaces">
            <BookingsProvider>
              <Spaces />
            </BookingsProvider>
          </Route>
          <Route exact path="/spaces/:spaceId">
            <BookingsProvider>
              <Space />
            </BookingsProvider>
          </Route>
          {/*      <Route exact path="/profile/edit"></Route>*/}
          <Route exact path="/error">
            <ErrorPage />
          </Route>
          <Route exact path="/login"></Route>
          <Route exact path="/recoverPassword">
            <RecoverPassword />
          </Route>
          <Route exact path="/users/validate/:recoveryPassword">
            <UserConfirm />
          </Route>
          {/*     <Route exact path="/users/changePassword/:changePasswordCode">
            <ChangePassword />
          </Route>*/}
          <Route exact path="/users/resetPassword/:recoverCode">
            <ResetPassword />
          </Route>

          <Route exact path="/">
            {/* <ProfileProvider> */}
            <BookingsProvider>
              <Home />
            </BookingsProvider>
            {/* </ProfileProvider> */}
          </Route>
          <Route exact path="/test">
            <ConfigurateSpace />
          </Route>
          <Route component={NotFound}></Route>
        </Switch>
      </AuthProvider>
    </Router>
    // </IntlProvider>
    // <Router>
    //   <Switch>
    //     <Route exact path="/*">
    //       <RoutingWebApp />
    //     </Route>
    //     <Route component={NotFound}></Route>
    //   </Switch>
    // </Router>
  );
}

export default App;
