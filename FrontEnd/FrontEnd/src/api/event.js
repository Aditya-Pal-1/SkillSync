import api from "./axios.js";

export async function createEvent(eventData){
    const res = await api.post("/event",eventData);
    return res.data;
}

export async function getAllEvents() {
    const res = await api.get("/event");
    return res.data;
}

export async function getEventById(eventId) {
    const res = await api.get(`/event/${eventId}`);
    if(!res){
        return res.status(404).json({error : "No event found by this Id"})
    }
    return res.data;
}
export async function updateEvent(eventId,eventData) {
    const res = await api.patch(`/event/${eventId}`,eventData);
    return res.data;
}
export async function deleteEvent(eventId) {
    const res = await api.delete(`/event/${eventId}`);
    return res.data;
}
