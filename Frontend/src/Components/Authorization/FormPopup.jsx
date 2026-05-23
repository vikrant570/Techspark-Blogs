import { useState, useRef} from "react"
import RegisterForm from "./Registeration"
import LoginForm from "./Login"
import AuthAnimation from "../UI/AuthAnimation"
import {loginRegisterUser, requestVerification, verifyOtp } from '../../server/loginRegister'
import { useAppContext } from "../../Context"

const FormPopup = ({closeForm}) =>{
    const [isUser, setIsUser] = useState(false);
    const [verificationAsked, setVerificationAsked] = useState(false);
    const [email,setEmail] = useState('')
    const formRef = useRef(null);
    const [otpVerfied, setotpVerified] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const {setIsLoggedIn} = useAppContext()

    const closePopup = (e) =>{
        if(!(formRef.current.contains(e.target))){
            closeForm();
        }
    }

    const [isAuthorized, setisAuthorized] = useState(null);
    const [backendMessage, setBackendMessage] = useState("");

    const askVerfication = async (e) =>{
        setisLoading(true)
        const response = await requestVerification(e, setEmail);
        
        if(response.success == false){
            setBackendMessage(response.message)
            setisAuthorized(false);
            return
        } 
        setVerificationAsked(true);
        
        setisLoading(false)
    }

    const otpVerification = async (e) =>{
        setisLoading(true)
        const response = await verifyOtp(e, email);

        if(response.success == false){
            setBackendMessage(response.message);
            setotpVerified(false);
            setisLoading(false);
            return
        }
        setotpVerified(true);
        
        setisLoading(false);
    }

    const finalSubmitHandler = async (e) =>{
        setisLoading(true)
        const response = await loginRegisterUser(e,isUser);
        setBackendMessage(response.message);
        setisAuthorized(response.success); 
        if(response.success == true) setIsLoggedIn(true)
        setisLoading(false)
    }

    return (
        <div className="backdrop-blur-sm w-full h-full mt-5 bg-black/25 fixed top-0 left-0 flex items-center justify-center z-40" onClick={closePopup}>
            <dialog className="rounded-xl shadow-black/65 shadow-sm w-1/3 m-auto flex flex-col justify-center z-40" ref={formRef} open>
                {
                    isAuthorized !== null ? 
                    (<AuthAnimation closeForm={closeForm} backendMessage={backendMessage}/>):
                    (
                        isUser ? 
                        <LoginForm setIsUser={setIsUser} submitHandler={finalSubmitHandler} /> : 
                            otpVerfied ? <RegisterForm email={email} submitHandler={finalSubmitHandler} isLoading={isLoading}/> : 
                                (
                                    verificationAsked ?
                                    <form onSubmit={otpVerification} className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md">
                                        <h2 className='text-2xl font-bold text-gray-900'>Enter OTP sent to</h2>
                                        <h3 className="text-gray-500">{email}</h3>
                                        <p>OTP expires in 90s.</p>
                                        <input type="text" name="otp" placeholder="_ _ _ _ _ _ _" className="form-inputs text-center" defaultValue=""/>
                                        {backendMessage.includes("Failed") && <p className="text-red-600 text-xs">Enter correct OTP!</p>}
                                        <button type="submit" className='main-button'>{isLoading ?<i className="fa-duotone fa-solid fa-spinner fa-spin-pulse text-2xl"></i>: "Verify"}</button>
                                    </form>
                                        :
                                        <form id="first-step" className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md" onSubmit={askVerfication}>
                                        <h2 className='text-2xl font-bold text-gray-900'>Enter your email</h2>
                                        <input type="email" name="email" placeholder="Email" className="form-inputs"/>
                                        <p>Already a user ? <span className='text-blue-500 font-semibold hover:text-blue-700 ease-in-out duration-200 cursor-pointer' onClick={() => setIsUser(true)}>Login</span></p>
                                        <button type="submit" className='main-button'>{isLoading?<i className="fa-duotone fa-solid fa-spinner fa-spin-pulse text-2xl"></i>:"Register"}</button>
                                    </form>
                                )
                    )
                }
                
            </dialog>
        </div>
    )
}

export default FormPopup;