import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-16">
      {/* Hero / Mission */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Social Development Events
        </h1>
        <p className=" text-lg md:text-xl">
          Connecting communities through meaningful events. Join, contribute,
          and make a real impact in your area.
        </p>
      </section>

      {/* Our Mission */}
      <section className="">
        
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className=" mb-2">
            Our mission is to bring people together for social development and
            community upliftment through impactful events.
          </p>
          <p className="">
            We believe that small actions create big change. By volunteering,
            donating, and participating in events, everyone can contribute to a
            better society.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl text-black font-semibold mb-2">Community</h3>
            <p className="text-black">
              Fostering strong bonds and collaboration for local development.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl text-black font-semibold mb-2">Impact</h3>
            <p className="text-black">
              Creating tangible changes in society through every event.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl text-black font-semibold mb-2">Sustainability</h3>
            <p className="text-black">
              Promoting eco-friendly and long-lasting initiatives.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl text-black font-semibold mb-2">Inclusivity</h3>
            <p className="text-black">
              Welcoming everyone to participate and contribute, regardless of
              background.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-50 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl text-black font-semibold mb-2">Find Events</h3>
            <p className="text-black">
              Browse upcoming events in your area and select where you want to
              participate.
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl text-black font-semibold mb-2">Join & Participate</h3>
            <p className="text-black">
              Sign up and join events with a single click, making your
              contribution count.
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl text-black font-semibold mb-2">Make Impact</h3>
            <p className="text-black">
              Your participation helps improve communities, protect the
              environment, and support those in need.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold mb-6">Our Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div>
            <h3 className="text-3xl font-bold text-purple-700">150+</h3>
            <p className="">Events Organized</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-purple-700">5000+</h3>
            <p className="">Volunteers Joined</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-purple-700">10k+</h3>
            <p className="">Beneficiaries Reached</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-purple-700">100+</h3>
            <p className="">Communities Impacted</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-purple-50 p-12 rounded-xl">
        <h2 className="text-3xl text-black md:text-4xl font-bold mb-4">
          Join Our Movement
        </h2>
        <p className="text-gray-700 mb-6">
          Participate in events, volunteer, or donate to help make a real
          difference in society.
        </p>
        <a
          href="/events"
          className="inline-block px-8 py-3 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white rounded-full hover:from-gray-600 hover:to-gray-500 transition"
        >
          Explore Events
        </a>
      </section>
    </div>
  );
};

export default About;
