import{asyncHandler} from "../middleware/asyncHandler.js";
import Skills from "../models/Skill.js";
import Booking from "../models/Booking.js";
import { AvailabilitySlot } from "../models/AvailabilitySlot.js";


export const getDashboard=asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    if(req.user.role === "admin"){
        const[
            totalSkills,
            totalSlot,
            openSlot,
            totalBookings,
            pendingBookings,
            confimredBooking,
            completedBookings,
            cancelBookings,
            upcomingTeachingList,
            bookingAnalytics,
            monthlyBookings
        ] = await Promise.all([
            Skills.countDocuments({owner : userId}),
            AvailabilitySlot.countDocuments({admin:userId}),
            AvailabilitySlot.countDocuments({
                admin:userId,
                isBooked:false,
                start:{$gt : new Date()}
            }),
            Booking.countDocuments({admin:userId}),
            Booking.countDocuments({admin:userId,status:"pending"}),
            Booking.countDocuments({admin:userId,status:"confirmed"}),
            Booking.countDocuments({admin:userId,status:"completed"}),
            Booking.countDocuments({admin:userId,status:"cancelled"}),
            Booking.find({
                admin:userId,
                status:{$in:["pending","confirmed"]},
                scheduledFor:{$gt:new Date()}
            }).populate("skill","name").populate("user","name").sort({scheduledFor:1}).limit(5),
            
            Booking.aggregate([
                {
                    $match:{
                        admin:userId
                    }
                },
                {
                    $group:{
                        _id:"$status",
                        count:{$sum:1}
                    }
                }
            ]),
            // monthly booking 
            Booking.aggregate([
                {
                    $match:{
                        admin :userId
                    }
                },{
                    $group:{
                        _id:{
                            year:{$year : "$createdAt"},
                            month:{$month : "$createdAt"}
                        },
                        count:{$sum : 1}
                    }
                },
                {
                    $sort:{
                        "_id.year" :1,
                        "_id.month":1
                    }

                }
            ])
        ]);

        return res.status(201).json({
            success:true,
            role:"admin",
            data:{
                totalSkills,
                totalSlot,
                openSlot,
                totalBookings,
                pendingBookings,
                confimredBooking,
                completedBookings,
                cancelBookings,
                upcomingTeachingList,
                bookingAnalytics,
                monthlyBookings
            }
        })
    }

                const [
                    totalBookings,
                    pendingBookings,
                    confirmedBookings,
                    completedBookings,
                    cancelledBookings,
                    upcomingBookings,
                    upcomingBookingList,
                    notificationList

                ] = await Promise.all([
                    Booking.countDocuments({user : userId}),
                    Booking.countDocuments({ user:userId,status:"pending"}),
                    Booking.countDocuments({ user:userId,status:"confirmed"}),
                    Booking.countDocuments({ user:userId,status:"completed"}),
                    Booking.countDocuments({ user:userId,status:"cancelled"}),
                    Booking.countDocuments({ user:userId ,status:{$in:["pending","confirmed"]},scheduledFor:{$gt:new Date()}}),
                    Booking.find({
                        user:userId,
                        status:{$in:["pending","confirmed"]},
                        scheduledFor:{$gt:new Date()}
                    }).populate("skill","name").
                    populate("admin","name").sort({scheduledFor :1}).limit(5),

                    Booking.find({
                        user:userId,
                        status:{$in:["pending","confirmed","cancelled","completed"]},
                    }).populate("skill","name").sort({updatedAt: -1}).limit(3)
                ]);

                res.status(201).json({
                    success:true,
                    role:"user",
                    data:{
                    totalBookings,
                    pendingBookings,
                    confirmedBookings,
                    completedBookings,
                    cancelledBookings,
                    upcomingBookings,
                    upcomingBookingList,
                    notificationList
                    },
                })
});