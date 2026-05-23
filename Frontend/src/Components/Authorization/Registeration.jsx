import { useEffect, useState } from "react";

const RegisterForm = ({email, submitHandler, isLoading}) =>{

    const [passwords, setPasswords] = useState({password : "", confirmPassword : ""});
    const [passMatch, setpassMatch] = useState()

    const handleChange = (e) =>{
        setPasswords({...passwords, [e.target.name] : e.target.value});
    }

    useEffect(()=>{
        if(passwords.password == passwords.confirmPassword){
            setpassMatch(true)
        } else {
            setpassMatch(false)
        }
    },[ passwords.password, passwords.confirmPassword])


    return( 
        <form className='flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md' onSubmit={submitHandler}>
            <h2 className='text-2xl font-bold text-gray-900'>Register and Join Us !</h2>
            <input type="text" placeholder='Full Name' className='form-inputs' name='fullname' required/>
            <input type="text" placeholder='Username' className='form-inputs' name='username' required/>
            <input type="email" className='form-inputs text-gray-500' name='email'required value={email} readOnly/>
            <input type="password" placeholder='Password' className='form-inputs' name='password' onChange={handleChange} required/>
            <input type="password" placeholder='Confirm Password' className='form-inputs' name='confirmPassword' onChange={handleChange} required/>
                {!passMatch? <p className='text-red-500 text-xs'>Passwords must match !</p> : ""}
            <button type="submit" className='main-button'>{isLoading ?<i className="fa-duotone fa-solid fa-spinner fa-spin-pulse text-2xl"></i>: "Register"}</button>
        </form>
    )
}

export default RegisterForm;