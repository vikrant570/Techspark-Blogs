const About = () => {
  return (
    <>
      <div className="bg-white text-gray-800 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-white h-36 flex items-center justify-center">
          <div className="text-center z-10">
            <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
            <p className="mt-2 text-lg">
              Learn more about our journey and team!
            </p>
          </div>
        </section>

        {/* About Content Section */}
        <section className="max-w-4xl mx-auto py-12 px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 text-gray-200 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="mb-4">
                Launched in 2020, we’re a vibrant blog dedicated to exploring
                the latest technologies. Our mission is to keep readers updated
                with cutting-edge tech insights.
              </p>
              <p>
                With a focus on innovation and detailed analysis, we’ve grown
                into a go-to resource for tech enthusiasts and professionals
                alike.
              </p>
            </div>

            {/* Team Info Cards */}
            <div className="grid gap-6">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Founder</h3>
                <p>Vikrant Singh, Patiala</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Team Size</h3>
                <p>XX dedicated professionals</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Headquarters</h3>
                <p>147002, Urban Estate, Patiala</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
