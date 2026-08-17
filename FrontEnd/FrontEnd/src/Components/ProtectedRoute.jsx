import { Navigate,useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function ProtectedRoute({children}){
    const{user,loading} = useAuth();
    const location = useLocation();

    console.log("ProtectedRoute");
    console.log("loading:", loading);
    console.log("user:", user);
    if(loading){
        return<p className="text-slate-500">Loading......</p>
    }
    if(!user){
        return <Navigate to="/login" state={{from:location}} />
    }
    console.log("Rendering Dashboard");
    return children;
};
