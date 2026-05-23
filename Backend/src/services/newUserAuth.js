const otps = require('../Models/otp');

const otpVerification = async (req,res) =>{
    const {otp, email} = req.body;
    const otpEntered = Number.parseInt(otp)
    
    try{
        const user = await otps.findOne({otp : otpEntered, email});

        if(!user){
            return res.json({success: false, message: "Validation Failed ! OTP Invalid or expired."})
        }
        await otps.deleteOne({otp : otpEntered, email:email});
        res.status(200).json({success: true, message: "Otp verified Successfully."})

    } catch(err){
        res.status(500).json({success:false, message :"Internal Server Error"})
    }
}

module.exports = otpVerification;