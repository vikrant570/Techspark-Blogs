const LoginForm = ({setIsUser, submitHandler})=>{
    return(
        <form className='flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md' onSubmit={submitHandler}>
            <h2 className='text-2xl font-bold text-gray-900'>Login to Your Account</h2>
            <input type="text" placeholder='Username or Email' className='form-inputs' name='usernameORemail' required/>
            <input type="password" placeholder='Password' className='form-inputs' name='pass' required/>
            <p>Not a user ? <span className='text-blue-500 font-semibold hover:text-blue-700 ease-in-out duration-200 cursor-pointer' onClick={() => setIsUser(false)}>Register</span></p>
            <button type="submit" className='main-button'>Login</button>
        </form>
    )
}

export default LoginForm;