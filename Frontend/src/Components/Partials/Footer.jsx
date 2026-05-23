const Footer=()=>{
    return(
        <div id="footer" className="bg-slate-900 w-full p-5 text-gray-100/90 mt-10 flex flex-row justify-between items-center">
            <div id="social-links" className="self-start text-3xl flex flex-col gap-3">
                <h1 className='font-lobster text-highlight text-5xl'>My Blog</h1>
                <span className="flex felx-row gap-4">
                    <a href="#"><i className="fa-brands fa-instagram"></i></a> 
                    <a href="#"><i className="fa-brands fa-facebook"></i></a> 
                    <a href="#"><i className="fa-brands fa-twitter"></i></a> 
                </span>
            </div>

            <div id="contact-us" className="font-light">
                <h3>CONTACT US</h3>
                <h4>adminblogspot@gmail.com</h4>
                <br />
                <p>Punjabi University Patiala, <br /> Phalauli, 147001 <br/> <br /> +91 76564-211XX</p>
            </div>

            <div id="subscribe" className="font-light self-start w-56">
                <h3>SUBSCRIBE</h3>
                <p>Get access to our BETA features and premium products</p>
                <br />
                <a href="#" className="main-button rounded-md hover:shadow-none">SUBSCRIBE</a>
            </div>
        </div>
    )
}

export default Footer;