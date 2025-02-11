export const verifyToken = (req, res, next) => {
    console.log("🍪 All Cookies:", req.cookies);  // Debugging step
    const token = req.cookies?.access_token;

    if (!token) {
        console.log("🚫 No token found!");  
        return next(createError(401, "Not Authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            console.log("❌ Invalid token!", err);  
            return next(createError(403, "Token is not valid"));
        }
        req.user = user;
        console.log("✅ User verified:", user);  
        next();
    });
};
