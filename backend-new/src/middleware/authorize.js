export const authorize=(...roles)=>{
    return(req,res,next)=>{
        console.log("AUTHORIZE MIDDLEWARE");
        console.log("req.user:", req.user);
        console.log("req.user.role:", req.user?.role);
        console.log("allowed roles:", roles);
        if(!req.user){
            return res.status(401).json({error:"Unauthorized"});
        }
        if(!roles.includes(req.user.role)){
            return res.status(403).json({error:"You are not authorized to perform this action"});
        }
        next();
    };
    
};
