import {useNavigate, useOutletContext} from "react-router-dom";
import { getMyInfo } from "../../server/loginRegister";
import { useAppContext } from "../../Context";

const CreatePostBar = () =>{
    const {openForm} = useOutletContext();
    const {user, isLoggedIn} = useAppContext();
    const navigate = useNavigate();

    const verifyLogin = async () =>{
        const data = await getMyInfo();
        if(data == false){
            openForm();
        } else if (data.user){
            navigate('/createPost');
        }
    }

    return(
        <div className="w-7/12 h-52 p-4 flex flex-col items-center justify-between rounded-3xl shadow-black/40 shadow-md">
            <span className="self-start">
                <i className="fa-duotone fa-regular fa-user m-2 text-white bg-slate-900 rounded-full p-3"></i>
                <span>{isLoggedIn ? user?.username : "Login/Register"}</span>
            </span>
            <input
                type="text"
                placeholder="What's on your mind ?"
                className="flex-grow h-10 bg-white border border-gray-300 rounded-xl px-2 mx-2 w-full outline-none"
            />
            <div className="flex flex-row w-full justify-between mt-1 px-5">
                <div className="flex items-center space-x-4 text-2xl">
                    {/* Dummy Icons for Actions */}
                    <i className="cursor-pointer text-orange-600 fa-duotone fa-solid fa-images"></i>
                    <i className="cursor-pointer text-blue-600 fa-solid fa-video"></i>
                    <i className="cursor-pointer text-green-600 fa-solid fa-paperclip"></i>
                </div>
                <button className="main-button" onClick={verifyLogin}>Create</button>
            </div>
        </div>
    )
}
export default CreatePostBar;