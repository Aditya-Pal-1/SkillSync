import { useAuth } from "../context/authContext.jsx";
const Card = ({children}) =>{
     const user = useAuth().user;
     console.log("User in Card component:", user); // Log the user object to see its structure
     if (!user) {
       return <div>Loading...</div>; // or any other loading indicator
     }
     return <div className="rounded-xl border bg-grey p-5 shadow-sm font-bold">{children}</div>;
}

export default Card;