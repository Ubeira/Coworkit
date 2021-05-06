import "../../css/bookings/bookingsNavBar.css";
import { NavLink } from 'react-router-dom';
import NavBar from '../nav/NavBar';

export default function BookingsNavBar() {
    const itemClass = "navItem";
    const secItemClass ="bookingsNavItem";
    const mainClass="main";
    const BookingsTypesList = (
      <>
        <NavLink exact to="/bookings" className={`${mainClass} ${itemClass} ${secItemClass}`}>
          Actuales
        </NavLink>
        <NavLink to="/bookings/finished" className={`${mainClass} ${itemClass} ${secItemClass}`}>
          Finalizadas
        </NavLink>
        <NavLink to="/bookings/pending"  className={` ${mainClass} ${itemClass} ${secItemClass}`}>
          Pendientes
        </NavLink>
      </>
    );
    
    
      return (
          <div className="bookingsNavBar">
              <NavBar>{BookingsTypesList}</NavBar>

          </div>
        )
}
