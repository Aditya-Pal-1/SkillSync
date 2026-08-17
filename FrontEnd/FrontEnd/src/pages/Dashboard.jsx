import { useAuth } from "../context/authContext.jsx";
import { getDashboard } from "@/api/dashboard.js";
import { useQuery } from "@tanstack/react-query";
import Upcoming from "./Upcoming.jsx";
import NotificationCard from "./NotificationCard.jsx";
import UpcomingTeachingLists from "./UpcomingTeachingLists.jsx";
import BookingStatusCharts from "./BookingStatusCharts.jsx";
import MonthlyBookingCharts from "./MonthlyBookingCharts.jsx";
import {
  BarChart3,
  CalendarCheck2,
  Clock3,
  GraduationCap,
  Users,
  Bell,
} from "lucide-react";

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="stat-card">
    <div style={{ position: "relative", zIndex: 1, color: "#6668d8" }}>
      <Icon size={19} />
    </div>
    <div className="stat-label">{title}</div>
    <div className="stat-value">{value ?? 0}</div>
  </div>
);
const Empty = ({ text }) => (
  <div className="empty-state">
    <div className="empty-icon">
      <CalendarCheck2 size={20} />
    </div>
    <h2>Nothing here yet</h2>
    <p>{text}</p>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const {
    data: result,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["dashboard"], queryFn: getDashboard });
  if (isLoading)
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <BarChart3 size={20} />
        </div>
        <h2>Preparing your dashboard</h2>
        <p>Loading your latest activity...</p>
      </div>
    );
  if (isError)
    return <div className="form-error">Could not load dashboard.</div>;
  const data = result?.data ?? {};
  const admin = user?.role === "admin";

  return (
    <section className="w-full">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Overview</div>
          <h1 className="page-title">Welcome back, {user?.name}</h1>
          <p className="page-subtitle">
            A quick view of your learning and teaching activity.
          </p>
        </div>
        <div className="status confirmed">Live overview</div>
      </div>
      {admin ? (
        <>
          <div className="dashboard-grid">
            <StatCard
              title="My Skills"
              value={data.totalSkills}
              icon={GraduationCap}
            />
            <StatCard
              title="Total slots"
              value={data.totalSlot}
              icon={Clock3}
            />
            <StatCard
              title="Open slots"
              value={data.openSlot}
              icon={CalendarCheck2}
            />
            <StatCard
              title="Total bookings"
              value={data.totalBookings}
              icon={Users}
            />
          </div>
          <div className="dashboard-section">
            <div className="section-row">
              <div>
                <h2 className="section-title">Booking analytics</h2>
                <p className="page-subtitle">
                  Track your booking pipeline and monthly activity.
                </p>
              </div>
            </div>
            <div className="dashboard-charts">
              <div className="surface chart-card">
                <BookingStatusCharts data={data} />
              </div>
              <div className="surface chart-card">
                <MonthlyBookingCharts data={data.monthlyBookings || []} />
              </div>
            </div>
          </div>
          <div className="dashboard-section">
            <div className="dashboard-grid">
              <StatCard
                title="Pending"
                value={data.pendingBookings}
                icon={Clock3}
              />
              <StatCard
                title="Confirmed"
                value={data.confimredBooking}
                icon={CalendarCheck2}
              />
              <StatCard
                title="Completed"
                value={data.completedBookings}
                icon={GraduationCap}
              />
              <StatCard
                title="Cancelled"
                value={data.cancelBookings}
                icon={Bell}
              />
            </div>
          </div>
          <div className="dashboard-section">
            <div className="section-row">
              <div>
                <h2 className="section-title">Upcoming teaching</h2>
                <p className="page-subtitle">Your next mentor sessions.</p>
              </div>
            </div>
            {data.upcomingTeachingList?.length ? (
              <div className="list-stack">
                {data.upcomingTeachingList.map((b) => (
                  <UpcomingTeachingLists key={b._id} booking={b} />
                ))}
              </div>
            ) : (
              <Empty text="No upcoming teaching sessions." />
            )}
          </div>
        </>
      ) : (
        <>
          <div className="dashboard-grid">
            <StatCard
              title="Total bookings"
              value={data.totalBookings}
              icon={CalendarCheck2}
            />
            <StatCard
              title="Upcoming"
              value={data.upcomingBookings}
              icon={Clock3}
            />
            <StatCard
              title="Pending"
              value={data.pendingBookings}
              icon={BarChart3}
            />
            <StatCard
              title="Confirmed"
              value={data.confirmedBookings}
              icon={GraduationCap}
            />
          </div>
          <div className="dashboard-section">
            <div className="section-row">
              <div>
                <h2 className="section-title">Upcoming learning</h2>
                <p className="page-subtitle">
                  Sessions you have booked with mentors.
                </p>
              </div>
            </div>
            {data.upcomingBookingList?.length ? (
              <div className="list-stack">
                {data.upcomingBookingList.map((b) => (
                  <Upcoming key={b._id} booking={b} />
                ))}
              </div>
            ) : (
              <Empty text="No upcoming bookings." />
            )}
          </div>
          <div className="dashboard-section">
            <div className="section-row">
              <div>
                <h2 className="section-title">Notifications</h2>
                <p className="page-subtitle">
                  Recent changes to your bookings.
                </p>
              </div>
            </div>
            {data.notificationList?.length ? (
              <div className="list-stack">
                {data.notificationList.map((n) => (
                  <NotificationCard key={n._id} notification={n} />
                ))}
              </div>
            ) : (
              <Empty text="You're all caught up." />
            )}
          </div>
          <div className="dashboard-section">
            <div className="dashboard-grid">
              <StatCard
                title="Completed"
                value={data.completedBookings}
                icon={GraduationCap}
              />
              <StatCard
                title="Cancelled"
                value={data.cancelledBookings}
                icon={Bell}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};
export default Dashboard;
