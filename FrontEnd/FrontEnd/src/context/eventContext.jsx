import { useState,createContext,useContext, useEffect } from "react";
import { createEvent as createEventApi,
    getAllEvents as getAllEventsApi,
    updateEvent as updateEventApi,
    deleteEvent as deleteEventApi,
    getEventById as getEventByIdApi
} from "@/api/event.js";


const EventContext = createContext();
export const EventProvider=({children})=>{
    const[events,setEvents] = useState([]);
    const[loading, setLoading] = useState(false);
    const[error,setError] = useState(null);

     const getAllEvents=async()=>{
        try{
            setLoading(true);
            setError(null);
            const data = await getAllEventsApi();
            setEvents(data);
            return data;
        }
        catch(err){
            setError(err);
            throw err;
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        getAllEvents();
    },[])

   
    const getEventById=async(eventId)=>{
        try{
            setLoading(true);
            setError(null);
            const data = await getEventByIdApi(eventId);
            return data;
        }
        catch(err){
            setError(err);
            throw err;
        }
        finally{
            setLoading(false);
        }
    };
    const createEvent=async(eventData)=>{
        try{
            setError(null);
            setLoading(true);
            const data = await createEventApi(eventData);
            setEvents((prevEvents)=>[...prevEvents,data])
            return data;
        }catch(err){
            setError(err);
            throw err;
        }
        finally{
            setLoading(false);
        }
    }
    const updateEvent=async(eventId,eventData)=>{
        try{
            setError(null);
            setLoading(true);
            const updateEvent = await updateEventApi(eventId,eventData);
            setEvents((prevEvent)=>prevEvent.map((event)=>event._id === eventId ? updateEvent : event));
            return updateEvent;
        }
        catch(err){
            setError(err);
            throw err;
        }
        finally{
            setLoading(false);
        }
    }
    const deleteEvent=async(eventId)=>{
        try{
            setLoading(true);
            setError(null);
            const deletedEvent = await deleteEventApi(eventId);
            setEvents((prevEvent)=>prevEvent.filter((event)=>event._id !== eventId))
            return deletedEvent;
        }
        catch(err){
            setError(err);
            throw err;
        }
        finally{
            setLoading(false);
        }
    }
    const value={
        events,loading,error,getAllEvents,getEventById,createEvent,updateEvent,deleteEvent
    }
    return(
        <EventContext.Provider value={value} >
            {children}
        </EventContext.Provider>
    )
};

export const useEvent=()=>{
    const context = useContext(EventContext);
    if (!context) {
    throw new Error(
      "useEvent must be used inside EventProvider"
    );
  }
  return context;
};  