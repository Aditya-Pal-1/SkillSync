import { createContext,useState,useEffect, useContext} from "react";
import api from "@/api/axios.js";
import { setOnUnautherized,setOnNewToken } from "../api/axios.js";
import { loginUser, registerUser, fetchCurrentUser, logoutUser } from "../api/auth.js";
import { getToken, setToken as saveToken, clearToken } from "../lib/tokenStorage.js";
import { data } from "react-router-dom";
const AuthContext = createContext();
export  function AuthProvider({children}) {
    const[user,setUser] = useState(null);
    const[token,setToken] = useState(()=>localStorage.getItem("token"));
    const[loading,setLoading]=useState(true);
    const setUserFromProfile=(user)=>setUser(user);

    useEffect(()=>{
        setOnUnautherized(()=>{
            clearToken();
            setToken(null);
            setUser(null)
        })
        setOnNewToken((t)=>{
            saveToken(t,true);
            setToken(t);
        });
    },[])
    useEffect(() => {
    if (!token) {
        setUser(null);
        setLoading(false);
        return;
    }

    fetchCurrentUser()
    .then((data)=>setUser(data.user))
    .catch(()=>{
        clearToken();
        setToken(null);
    })
    .finally(()=>setLoading(false));

    // api.get("/auth/me")
    //     .then((response) => {
    //         console.log("ME API:", response.data);
    //         setUser(response.data.user);
    //     })
    //     .catch((err) => {
    //         console.log("ME Error:", err.response?.data);
    //         localStorage.removeItem("token");
    //         setToken(null);
    //         setUser(null);
    //     })
    //     .finally(() => {
    //         setLoading(false);
    //     });

}, [token]);

//     useEffect(() => {
//     if (!token) {
//         setLoading(false);
//         return;
//     }
//     api("/auth/me").then((data)=>{setUser(data.user)})
//     .catch((err)=>{
//         console.log(err?.data);
//          localStorage.removeItem("token");
//         setToken(null);
//     }).finally(() => {
//             setLoading(false);
//         });
    
//     // api("/auth/me")
//     //     .then((response) => {
//     //         console.log("ME API:", response.data);
//     //         setUser(response.data.user);
//     //     })
//     //     .catch((err) => {
//     //         console.log(err.response?.data);
//     //         localStorage.removeItem("token");
//     //         setToken(null);
//     //     })
//     //     .finally(() => {
//     //         setLoading(false);
//     //     });
// }, [token]);


async function login({email,password}){
        const data = await loginUser({email,password});
        if(!data.token || !data.user){
            throw new Error("Login Failed  : Invalid response from server");
        }
        saveToken(data.token,true);
        setToken(data.token);
        setUser(data.user);
    }
async function register({name,email,password,role}){
        const data = await registerUser({name,email,password,role});
        if(!data.token || !data.user){
            throw new Error("Registration Failed  : Invalid response from server");
        }
        saveToken(data.token,true);
        setToken(data.token);
        setUser(data.user);
    }

async function logout(){
        try{
            await logoutUser();
        }catch{

        }
        clearToken();
        setToken(null);
        setUser(null)
    }

    return(
        <AuthContext.Provider
            value={{user,loading,token,login,register,logout,setUserFromProfile}}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx){
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
}

