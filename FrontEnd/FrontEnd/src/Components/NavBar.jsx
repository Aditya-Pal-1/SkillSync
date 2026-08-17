import { NavLink, Link } from "react-router-dom";
import { Bell, LayoutDashboard, Search, CalendarDays, Clock3, UserRound, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "../context/authContext.jsx";

const Navbar = ({ appName }) => {
  const { user, logout } = useAuth();
  const linkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;
  const initials = user?.name?.trim()?.split(/\s+/).map((x) => x[0]).slice(0,2).join("").toUpperCase() || "U";

  return (
    <header className="topbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark"><Sparkles size={18} /></span>
          {appName}
        </Link>
        <nav className="nav-links">
          <NavLink to="/skills" className={linkClass}><Search size={15}/> Explore</NavLink>
          {user && <NavLink to="/dashboard" className={linkClass}><LayoutDashboard size={15}/> Dashboard</NavLink>}
          {user && <NavLink to="/slots" className={linkClass}><Clock3 size={15}/> My Slots</NavLink>}
          {user && <NavLink to="/bookings" className={linkClass}><CalendarDays size={15}/> Bookings</NavLink>}
          {user && <NavLink to="/events" className={linkClass}><CalendarDays size={15}/> Events</NavLink>}
        </nav>
        <div className="nav-user">
          {user ? (
            <>
              <NavLink to="/profile" className={linkClass} title="Profile"><UserRound size={15}/></NavLink>
              <span className="avatar">{initials}</span>
              <span className="user-name">{user.name}</span>
              <button className="btn-ghost" onClick={logout} title="Sign out"><LogOut size={15}/></button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">Sign in</Link>
              <Link to="/register" className="btn-primary">Get started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
