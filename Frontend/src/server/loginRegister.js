import axios from "axios";
const BASE_URL = 'http://localhost:7000/blogspot/users/'

export const loginRegisterUser = async (e, isUser) =>{
   e.preventDefault();
   const formdata = new FormData(e.target);
   const data = Object.fromEntries(formdata);
   
   if(isUser){
           const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.usernameORemail);
           isEmail ? data.email = data.usernameORemail : data.username = data.usernameORemail;
   }
   try{
    const url = isUser ? `${BASE_URL}login` : `${BASE_URL}register/submission`
    const response = await axios.post(url, data, {withCredentials : true});
    return response.data
   } catch(err){
    return response.data
   }
}

export const requestVerification = async(e, setEmail) =>{
    e.preventDefault()
    const formData = new FormData(e.target);
    setEmail(Object.fromEntries(formData).email);

    const response = await axios.post(`${BASE_URL}register`, Object.fromEntries(formData));
    return response.data;
}

export const verifyOtp = async (e, email) =>{
    e.preventDefault()
    const formData= new FormData(e.target);
    formData.append("email", email)
    const response = await axios.post(`${BASE_URL}register/verify`,Object.fromEntries(formData));
    return response.data;
}

export const getMyInfo = async () =>{
    try{
        const response = await axios.get(`${BASE_URL}myProfile`,{withCredentials : true});
        return response.data
    } catch (err){
        return false
    }
}