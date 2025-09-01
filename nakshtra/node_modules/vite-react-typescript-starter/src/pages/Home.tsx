import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Star, Telescope } from 'lucide-react';

const Home: React.FC = () => {
  const upcomingEvents = [
    {
      id: 'star-gazing',
      title: 'Star Gazing Night',
      date: 'March 15, 2024',
      time: '8:00 PM',
      type: 'Free',
      slots: 23,
    },
    {
      id: 'telescope-workshop',
      title: 'Telescope Making Workshop',
      date: 'March 20, 2024',
      time: '2:00 PM',
      type: 'Paid',
      price: 500,
    },
    {
      id: 'celestial-photography',
      title: 'Celestial Photography Exhibition',
      date: 'March 25, 2024',
      time: '6:00 PM',
      type: 'Paid',
      price: 300,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Explore the
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Cosmos
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our astronomy club and embark on a journey through the infinite wonders of space
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/events"
              className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Explore Events
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/gallery"
              className="px-8 py-4 border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 rounded-lg font-semibold transition-all hover:scale-105"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              About AstroClub
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We are a passionate community of stargazers, astrophotographers, and space enthusiasts 
              dedicated to exploring and sharing the wonders of the universe.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 hover:border-purple-400/40 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-300">Observation</h3>
              <p className="text-gray-300 leading-relaxed">
                Regular stargazing sessions with professional telescopes and expert guidance to explore celestial objects.
              </p>
            </div>

            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 hover:border-purple-400/40 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
                <Telescope className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-300">Education</h3>
              <p className="text-gray-300 leading-relaxed">
                Workshops, lectures, and hands-on activities to deepen your understanding of astronomy and space science.
              </p>
            </div>

            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 hover:border-purple-400/40 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-pink-300">Community</h3>
              <p className="text-gray-300 leading-relaxed">
                Connect with fellow astronomy enthusiasts and share your passion for the cosmos in a welcoming environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join us for exciting astronomical events and educational experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.type === 'Free' 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {event.type === 'Free' ? 'Free Event' : `₹${event.price}`}
                  </span>
                  {event.slots && (
                    <span className="text-sm text-orange-300 font-medium">
                      {event.slots} seats left
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{event.title}</h3>
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 mb-4">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <Link
                  to={`/events/${event.id}`}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-all text-center block"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              View All Events
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Become a member of our astronomy club and start your journey into the cosmos today
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Sign Up Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;