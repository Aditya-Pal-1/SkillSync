import api from "./axios.js";

export const bookSlot = (slotId) => api.post("/booking", { slot: slotId }).then((response) => response.data.data);

// export const getMyBookings = () =>api.get("/booking/me").then((response) => response.data.data);

export const confirmBooking = (id) =>api.patch(`/booking/${id}/confirm`).then((response) => response.data.data);

export const completeBooking = (id) =>api.patch(`/booking/${id}/complete`).then((response) => response.data.data);

export const cancelBooking = (id) =>api.patch(`/booking/${id}/cancel`).then((response) => response.data.data);
export const getMyBookings = async () => {
  const response = await api.get("/booking/me");

  console.log("API Response:", response);
  console.log("Response Data:", response.data);

  return response.data.data;
};