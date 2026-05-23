const Contact = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-40 flex items-center justify-center text-slate-900">
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="mt-2 text-lg">Get in touch with our team today!</p>
        </div>
        {/* <div className="absolute inset-0 bg-slate-900 opacity-50"></div> */}
      </section>
      <div className="bg-slate-900 text-gray-200">
        {/* Contact Form Section */}
        <section className="max-w-4xl mx-auto py-12 px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
              <form>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full p-3 mb-4 bg-gray-200 text-slate-900 rounded outline-none"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full p-3 mb-4 bg-gray-200 text-slate-900 rounded outline-none"
                />
                <textarea
                  placeholder="Your message here..."
                  className="w-full p-3 mb-4 bg-gray-200 text-slate-900 rounded h-32 outline-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-gray-200 p-3 rounded hover:bg-orange-600 transition font-bold"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Contact Info Cards */}
            <div className="grid gap-6">
              <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">
                  Punjabi University
                </h3>
                <p>147001, Phlauli, Patiala</p>
              </div>
              <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p>+91 76579-18XXX</p>
              </div>
              <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p>support@mywebsite.com</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
