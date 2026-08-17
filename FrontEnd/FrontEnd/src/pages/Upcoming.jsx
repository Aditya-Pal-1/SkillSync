const Upcoming=({booking})=>{
  const date = new Date(booking.scheduledFor || booking.scheduleFor);
  return <div className="booking-row"><div className="booking-main"><div className="booking-title">{booking.skill?.name || "Skill session"}</div><div className="booking-meta"><span>📅 {date.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</span><span>🕐 {date.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</span><span>👨‍🏫 {booking.admin?.name || "Mentor"}</span></div></div><span className={`status ${booking.status}`}>{booking.status}</span></div>;
};
export default Upcoming;
