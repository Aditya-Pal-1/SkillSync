import express from "express";
import dotenv from "dotenv";
import healthRouter from "./src/routes/healthrouter.js";
import connectDB from "./src/controllers/db.js";
import skillRoutes from "./src/routes/skillRoutes.js";
import  {errorHandler}  from "./src/middleware/errorHandler.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import cors from 'cors'
import authRoutes from './src/routes/authRoutes.js'
import cookieParser from "cookie-parser";
import { slotRoutes } from "./src/routes/slotRoutes.js";
import { eventRoute } from "./src/routes/eventRoutes.js";
import {dashboardRoutes} from './src/routes/dashboardRoutes.js';



dotenv.config();    
connectDB();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const middleware = (req,res,next)=>{
    console.log("Middleware executed");
    next();
}
app.use(cors({origin:"https://skill-sync-iwej-6q9qu6nqx-aditya-teams.vercel.app" || "http://localhost:5173",credentials:true}));
app.use(middleware);
app.use(cookieParser());
app.use('/health',healthRouter);
app.use('/skill',skillRoutes);
app.use('/booking',bookingRoutes);
app.use('/auth',authRoutes);
app.use("/slot",slotRoutes);
app.use('/event',eventRoute);
app.use('/dashboard',dashboardRoutes);

app.use(errorHandler);
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server is running at port ${PORT}`);
})