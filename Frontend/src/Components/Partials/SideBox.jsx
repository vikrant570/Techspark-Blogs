const SideBox = () =>{
    return(
        <>
            <div className="w-2/5 h-fit bg-slate-900 rounded-3xl flex flex-row">
                <div className="p-4 rounded-xl">
                    <div className="relative w-fit h-fit max-h-80 overflow-hidden rounded-md z-0 aspect-square">
                        <img
                            src="https://res.cloudinary.com/dut8fdtro/image/upload/v1753341046/blogspot/posts/user-123/image-17100.png"
                            className="w-44 h-44 object-cover transition-opacity duration-300 z-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </div>
                <div className="text-gray-200 self-center text-left ml-5">
                    <h2 className="text-2xl font-bold">Must Check Out ...</h2>
                    <hr />
                    <ul className="list-disc mt-4">
                        <li className="hover:text-blue-400 ease-in-out duration-500 cursor-pointer underline">Hot topics</li>
                        <li className="hover:text-blue-400 ease-in-out duration-500 cursor-pointer underline">Trending</li>
                        <li className="hover:text-blue-400 ease-in-out duration-500 cursor-pointer underline">Categories</li>
                        <li className="hover:text-blue-400 ease-in-out duration-500 cursor-pointer underline">Latest</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideBox