const jwt = require('jsonwebtoken');

//IS LOGGED IN TOKEN VERIFIER
const isLoggedIn = async (req, res, next) =>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                  success : false , 
                  message : "Please login first to access this feature !"
                })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            success : false, 
            message : "Authorization revoked !", 
            error : err.message
        })
    }
}

module.exports = isLoggedIn;