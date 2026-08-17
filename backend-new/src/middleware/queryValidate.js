export const queryValidate=(schema)=>(req,res,next)=>{
    const result = schema.safeParse(req.query);
    if(!result.success){
        const errors = result.error.issues.map((issue)=>({
            field: issue.path.join('.'),
            message: issue.message
        }))
        return res.status(400).json({errors});
    }
    Object.assign(req.query, result.data);
    next();
}