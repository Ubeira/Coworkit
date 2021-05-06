import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import NavBar from "../nav/NavBar";
import { AdminProvider } from "../../shared/context/adminContext";
import AdminSection from "./AdminSection";
import ConfigurateSpace from "../spaces/ConfigurateSpace";

export default function AdminRouter() {
  return (
    <AdminProvider>
      <Router>
        <NavBar id="adminBar">
          <NavLink to="/admin/users" className="navItem">
            Usuarios
          </NavLink>
          <NavLink to="/admin/spaces" className="navItem">
            Espacios
          </NavLink>
          <NavLink to="/admin/bookings" className="navItem">
            Reservas
          </NavLink>
          <NavLink to="/admin/packs" className="navItem">
            Packs
          </NavLink>
          <NavLink to="/admin/reviews" className="navItem">
            Reseñas
          </NavLink>
          <NavLink to="/admin/reports" className="navItem">
            Reportes
          </NavLink>
        </NavBar>
        <Switch>
          <Route exact path="/admin/users">
            <AdminSection section="users" />
          </Route>
          <Route exact path="/admin/spaces">
            <AdminSection section="spaces" />
          </Route>
          <Route exact path="/admin/bookings">
            <AdminSection section="orders" />
          </Route>
          <Route exact path="/admin/packs">
            <AdminSection section="packs" />
          </Route>
          <Route exact path="/admin/reviews">
            <AdminSection section="reviews" />
          </Route>
          <Route exact path="/admin/reports">
            <AdminSection section="reports" />
          </Route>
          <Route exact path="/admin/spaceConfig">
            <ConfigurateSpace></ConfigurateSpace>
          </Route>
        </Switch>
      </Router>
    </AdminProvider>
  );
}
