const AuthAnimation = ({closeForm, backendMessage}) =>{
    return(
        <div className="p-6 bg-white self-center flex flex-col justify-center w-full rounded-xl text-center ">
            <div className="bg-gray-200 rounded-md p-4 pt-10">
                {
                    backendMessage.includes("Failed") ? 
                    <i className="fa-regular fa-circle-xmark fa-bounce text-8xl text-red-700 mt-5"></i>
                        :
                    <i className="fa-sharp fa-regular fa-circle-check fa-bounce text-8xl text-green-500 mt-5"></i>
                }
                <h3 className="text-xl py-2">{backendMessage}</h3>
            </div>
            <br />
            <input type="button" value="Continue" onClick={closeForm} className="main-button justify-self-center"/>
        </div>
    )
}

export default AuthAnimation;