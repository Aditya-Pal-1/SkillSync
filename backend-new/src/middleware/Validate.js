export const Validate = (schema) => (req, res, next) => {
    console.log("🔥 VALIDATE START");
    console.log("BODY:", req.body);
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.issues.map((issue) => ({ 
            field: issue.path.join('.'),
            message: issue.message
        }))
        return res.status(400).json({ errors });
    };
    req.body = result.data;
    next();
};