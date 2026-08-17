import NavBar from "./Components/NavBar";
import SkillPage from "./pages/SkillPage";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Profile from "./pages/Profile";
import SkillDetail from "./pages/SkillDetail.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import MySlots from "./pages/MySlots.jsx";
import EventList from "./pages/EventList";

const App = () => (
  <div className="app-shell">
    <NavBar appName="SkillSync" />
    <main className="app-main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<SkillPage />} />
        <Route path="/skills/:skillId" element={<SkillDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/slots" element={<ProtectedRoute><MySlots /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><EventList /></ProtectedRoute>} />
        <Route path="*" element={<div className="empty-state"><div className="empty-icon">?</div><h2>Page not found</h2></div>} />
      </Routes>
    </main>
  </div>
);
export default App;
