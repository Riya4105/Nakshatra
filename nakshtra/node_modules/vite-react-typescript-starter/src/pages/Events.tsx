import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';

const Events: React.FC = () => {
  const events = [
    {
      id: 'star-gazing',
      title: 'Star Gazing Night',
      description: 'Join us for an enchanting evening under the stars. Perfect for beginners and experienced stargazers alike.',
      date: 'March 15, 2024',
      time: '8:00 PM - 11:00 PM',
      location: 'Observatory Deck, Science Building',
      price: 0,
      type: 'Free',
      slots: 23,
      image: 'https://images.pexels.com/photos/355906/pexels-photo-355906.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Observation'
    },
    {
      id: 'telescope-workshop',
      title: 'Telescope Making Workshop',
      description: 'Learn to build your own telescope from scratch. All materials provided in this hands-on workshop.',
      date: 'March 20, 2024',
      time: '2:00 PM - 6:00 PM',
      location: 'Engineering Workshop, Block C',
      price: 500,
      type: 'Workshop',
      slots: 15,
      image: 'https://images.pexels.com/photos/2034892/pexels-photo-2034892.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Educational'
    },
    {
      id: 'celestial-photography',
      title: 'Celestial Photography Exhibition',
      description: 'Showcase your astrophotography skills and view stunning images captured by fellow enthusiasts.',
      date: 'March 25, 2024',
      time: '6:00 PM - 9:00 PM',
      location: 'Art Gallery, Main Campus',
      price: 300,
      type: 'Exhibition',
      slots: 50,
      image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Photography'
    },
    {
      id: 'astronomy-quiz',
      title: 'Astronomy Quiz Competition',
      description: 'Test your knowledge of the cosmos in our exciting quiz competition with amazing prizes.',
      date: 'March 30, 2024',
      time: '3:00 PM - 5:00 PM',
      location: 'Auditorium, Main Building',
      price: 200,
      type: 'Competition',
      slots: 40,
      image: 'https://images.pexels.com/photos/33109/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      category: 'Competition'
    },
    {
      id: 'space-debate',
      title: 'Space Debate Competition',
      description: 'Engage in thought-provoking debates about space exploration, colonization, and the future of humanity.',
      date: 'April 5, 2024',
      time: '4:00 PM - 7:00 PM',
      location: 'Conference Hall, Library',
      price: 150,
      type: 'Debate',
      slots: 32,
      image: 'https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Discussion'
    }
  ];

  // Add link to photo voting for celestial photography event
  const enhancedEvents = events.map(event => {
    if (event.id === 'celestial-photography') {
      return {
        ...event,
        description: event.description + ' Participate in our photo contest and vote for your favorites!'
      };
    }
    return event;
  });

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Astronomy Events
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the universe through our carefully curated events. From stargazing sessions to hands-on workshops, 
            there's something for every space enthusiast.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {enhancedEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                
                {/* Event Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
                    event.price === 0 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {event.price === 0 ? 'Free Event' : `₹${event.price}`}
                  </span>
                </div>

                {/* Slots Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30 backdrop-blur-sm">
                    {event.slots} seats left
                  </span>
                </div>

                {/* Category */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-gray-300 backdrop-blur-sm">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{event.slots} spots available</span>
                  </div>
                </div>

                <Link
                  to={`/events/${event.id}`}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 text-center block"
                >
                  View Details & Register
                </Link>
                
                {event.id === 'celestial-photography' && (
                  <a
                    href="/photo-voting"
                    className="w-full mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-2 px-6 rounded-lg font-medium transition-all transform hover:scale-105 text-center block text-sm"
                  >
                    Vote for Photos
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We're always organizing new events and workshops. Stay connected with us to never miss an astronomical adventure!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            <Star className="w-5 h-5" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Events;