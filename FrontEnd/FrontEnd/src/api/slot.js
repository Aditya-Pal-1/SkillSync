import api from "./axios.js";

export const getOpenSlot = (skillId) =>api.get(`/slot/skill/${skillId}`).then((r) => r.data.data);
export const getMySlots = () => api.get("/slot/mine").then((r) => r.data.data);
export const createSlot = (payload) => api.post("/slot", payload).then((r) => r.data.data);
export const deleteSlot = (id) => api.delete(`/slot/${id}`).then((r) => r.data);