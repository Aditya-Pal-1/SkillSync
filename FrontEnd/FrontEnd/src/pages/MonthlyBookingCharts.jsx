import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const MonthlyBookingCharts = ({ data }) => {
  const chartData = data.map((item) => ({
    month: `${item._id.month}/${item._id.year}`,
    booking: item.count,
  }));
  return (
    <div>
      <h2 className="section-title">Bookings over time</h2>
      <div style={{ height: 300, marginTop: 8 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef0f5" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="booking"
              stroke="#5B5CE2"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default MonthlyBookingCharts;
