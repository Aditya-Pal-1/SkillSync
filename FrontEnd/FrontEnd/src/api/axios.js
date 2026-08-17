import axios from 'axios';
import { getToken,setToken as saveToken,clearToken } from '../lib/tokenStorage.js';

const api = axios.create({
    // method:"GET",
    baseURL:import.meta.env.VITE_API_URL || "http://localhost:5000",
    withCredentials:true
    // headers:{"Content-Type" :"application/json",
    //     // "Authorization" :`Bearer ${localStorage.getItem("token")}`

    // },
});

api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }

    return config;
});
// api.interceptors.request.use((config)=>{
//     if(!config.headers){
//         config.headers={}
//     }
   
//     if(config.method === "get" &&  config.params){
//         const token = localStorage.getItem("token");//(coming when we add real auth)
//         if(token){
//             config.headers.Authorization = `Bearer ${token}`
//         }
//     }
//     return config;
// });

let onUnauthorized =()=>{};
export function setOnUnautherized(fn){
    onUnauthorized=fn;
}
let onNewToken=()=>{};
export function setOnNewToken(fn){
    onNewToken=fn;
}

api.interceptors.response.use((response)=>response,
    async(error)=>{
        // if(error.response && error.response.status == 401){
        //     localStorage.removeItem("token");
        //     onUnauthorized();
        // }
        const originalRequest = error.config;
        const url = originalRequest?.url || "";
        const isAuthCall =
            url.includes("/auth/login") || 
            url.includes("/auth/register") ||
            url.includes("/auth/refresh");
        const isRetry = originalRequest && originalRequest?.url?.includes("/auth/refresh")? true:false;
        if(error.response?.status == 401 && !originalRequest._retry && !isAuthCall){
            originalRequest._retry = true;
            try{
            const {data} = await api.post("/auth/refresh");
            const newToken = data.token;
            saveToken(newToken,true);
            onNewToken(newToken);
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
            }
            catch(refreshError){
                clearToken();
                onUnauthorized();                // refresh failed too -> real logout
                return Promise.reject(refreshError);
            }
        }
    
        return Promise.reject(error);
    
        }
)
export const bookSlot = (slotId) => api.post("/booking", { slot: slotId }).then((r) => r.data.data);
export const getMyBookings = () => api.get("/booking/me").then((r) => r.data.data);
export const confirmBooking = (id) => api.patch(`/booking/${id}/confirm`).then((r) => r.data.data);
export const completeBooking = (id) => api.patch(`/booking/${id}/complete`).then((r) => r.data.data);
export const cancelBooking = (id) => api.patch(`/booking/${id}/cancel`).then((r) => r.data.data);
export default api;