import api from "./axios";
export async function registerUser({name,email,password,role}){
    const res =  await api.post("/auth/register",{name,email,password,role})
    console.log("user added" , res.data);
    return res.data;
}
export async function loginUser({email,password}){
    const res = await api.post("/auth/login",{email,password});
    console.log("user logged in" , res.data);
    return res.data;
}

export async function fetchCurrentUser(token) {
        const res  = await api.get("/auth/me",{token});
        return res.data;
}

export async function logoutUser() {
    localStorage.removeItem("token");
}
export async function updateUser(payload) {
    const res = await api.put("/auth/updateMe", payload);
    return res.data;
}
export async function refreshToken() {
    api.defaults.headers["Autherization"] =`Bearer ${localStorage.getItem("RefreshToken")}`
    const res = await api.post("/auth/refresh-token");
    const {accesstoken} = res.data;
    localStorage.setItem("token",accesstoken);
    api.defaults.headers["Autherization"] = `Bearer ${accesstoken}`
    return res.data;
}