import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Star, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import PaymentModal from '../components/PaymentModal';

const EventDetails: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    college: '',
    yearOfStudy: '',
  });

  const events = {
    'star-gazing': {
      id: 'star-gazing',
      title: 'Star Gazing Night',
      description: 'Join us for an enchanting evening under the stars, where we\'ll explore constellations, planets, and deep space objects through our high-quality telescopes. This event is perfect for beginners and experienced stargazers alike.',
      fullDescription: 'Experience the magic of the night sky in our comprehensive stargazing session. We\'ll begin with an orientation about celestial navigation, followed by guided observation of prominent constellations, planets, and if conditions permit, some fascinating deep space objects like galaxies and nebulae. Our experienced astronomers will be on hand to answer questions and share their knowledge. Bring warm clothing as temperatures can drop significantly during evening hours.',
      date: 'March 15, 2024',
      time: '8:00 PM - 11:00 PM',
      location: 'Observatory Deck, Science Building',
      price: 0,
      type: 'Free',
      slots: 23,
      image: 'https://images.pexels.com/photos/355906/pexels-photo-355906.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Observation',
      requirements: ['Warm clothing', 'Comfortable shoes', 'Red flashlight (optional)'],
      whatToExpect: [
        'Constellation identification and mythology',
        'Planet observation through telescopes',
        'Deep space object viewing',
        'Astrophotography basics',
        'Q&A with experienced astronomers'
      ]
    },
    'telescope-workshop': {
      id: 'telescope-workshop',
      title: 'Telescope Making Workshop',
      description: 'Learn to build your own telescope from scratch in this comprehensive hands-on workshop. All materials and tools are provided.',
      fullDescription: 'This intensive workshop will guide you through the complete process of building a functional refractor telescope. You\'ll learn about optical principles, lens grinding, tube construction, and mounting systems. By the end of the session, you\'ll have your own telescope to take home and continue your astronomical journey. The workshop is suitable for ages 12 and above.',
      date: 'March 20, 2024',
      time: '2:00 PM - 6:00 PM',
      location: 'Engineering Workshop, Block C',
      price: 500,
      type: 'Workshop',
      slots: 15,
      image: 'https://images.pexels.com/photos/2034892/pexels-photo-2034892.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Educational',
      requirements: ['Safety glasses will be provided', 'Notebook and pen', 'Enthusiasm to learn!'],
      whatToExpect: [
        'Optical theory and telescope design',
        'Hands-on lens assembly',
        'Tube construction and focusing mechanism',
        'Mount building and alignment',
        'Testing and calibration',
        'Take home your completed telescope'
      ]
    },
    'celestial-photography': {
      id: 'celestial-photography',
      title: 'Celestial Photography Exhibition',
      description: 'Showcase your astrophotography skills and view stunning images captured by fellow enthusiasts from around the world.',
      fullDescription: 'This exhibition celebrates the art and science of astrophotography. Participants can submit their celestial images for display, while visitors can enjoy a curated collection of breathtaking space photography. The event includes workshops on astrophotography techniques, equipment reviews, and tips for capturing the perfect shot of celestial objects.',
      date: 'March 25, 2024',
      time: '6:00 PM - 9:00 PM',
      location: 'Art Gallery, Main Campus',
      price: 300,
      type: 'Exhibition',
      slots: 50,
      image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Photography',
      requirements: ['Camera (optional)', 'Photo submissions due March 20th'],
      whatToExpect: [
        'Stunning astrophotography displays',
        'Photography technique workshops',
        'Equipment demonstration',
        'Judging and awards ceremony',
        'Networking with photographers',
        'Refreshments and prizes'
      ]
    },
    'astronomy-quiz': {
      id: 'astronomy-quiz',
      title: 'Astronomy Quiz Competition',
      description: 'Test your knowledge of the cosmos in our exciting quiz competition featuring multiple rounds and amazing prizes.',
      fullDescription: 'Challenge yourself in our comprehensive astronomy quiz covering topics from basic celestial mechanics to cutting-edge space missions. The competition features multiple rounds including rapid-fire questions, visual identification, and problem-solving challenges. Great prizes await the winners, including telescope equipment and astronomy books.',
      date: 'March 30, 2024',
      time: '3:00 PM - 5:00 PM',
      location: 'Auditorium, Main Building',
      price: 200,
      type: 'Competition',
      slots: 40,
      image: 'https://images.pexels.com/photos/33109/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Competition',
      requirements: ['Basic astronomy knowledge', 'Pen and paper', 'Competitive spirit!'],
      whatToExpect: [
        'Multiple rounds of challenging questions',
        'Visual identification challenges',
        'Team and individual categories',
        'Prizes for top performers',
        'Certificate of participation',
        'Fun and learning combined'
      ]
    },
    'space-debate': {
      id: 'space-debate',
      title: 'Space Debate Competition',
      description: 'Engage in thought-provoking debates about space exploration, colonization, ethics, and the future of humanity among the stars.',
      fullDescription: 'This debate competition explores controversial and fascinating topics in space exploration. Teams will argue positions on subjects like Mars colonization ethics, space commercialization, asteroid mining rights, and the search for extraterrestrial life. Judges include faculty members and space industry professionals.',
      date: 'April 5, 2024',
      time: '4:00 PM - 7:00 PM',
      location: 'Conference Hall, Library',
      price: 150,
      type: 'Debate',
      slots: 32,
      image: 'https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Discussion',
      requirements: ['Research preparation', 'Formal attire preferred', 'Team of 2-3 members'],
      whatToExpect: [
        'Structured debate format',
        'Thought-provoking space topics',
        'Expert panel judges',
        'Prizes for best arguments',
        'Networking opportunities',
        'Certificate of participation'
      ]
    }
  };

  const event = events[eventId as keyof typeof events];

  if (!event) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Event Not Found</h1>
          <p className="text-gray-300 mb-8">The event you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/events')}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: event.id,
      title: event.title,
      price: event.price,
      image: event.image,
    });
    alert('Event added to cart successfully!');
  };

  const handleDirectRegister = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    if (event.price === 0) {
      setShowRegistrationForm(true);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save registration data
    const registration = {
      id: Date.now().toString(),
      userId: user?.id,
      eventId: event.id,
      eventTitle: event.title,
      userName: registrationData.fullName,
      userEmail: registrationData.email,
      phone: registrationData.phone,
      college: registrationData.college,
      yearOfStudy: registrationData.yearOfStudy,
      registrationDate: new Date().toISOString().split('T')[0],
      paymentStatus: event.price === 0 ? 'free' : 'paid',
      amount: event.price,
    };
    
    const existingRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    existingRegistrations.push(registration);
    localStorage.setItem('registrations', JSON.stringify(existingRegistrations));
    
    alert('Registration successful! You will receive a confirmation email shortly.');
    setShowRegistrationForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentSuccess = () => {
    // Save registration data after payment
    const registration = {
      id: Date.now().toString(),
      userId: user?.id,
      eventId: event.id,
      eventTitle: event.title,
      userName: user?.name,
      userEmail: user?.email,
      phone: user?.phone || '',
      college: user?.college || '',
      yearOfStudy: user?.yearOfStudy || '',
      registrationDate: new Date().toISOString().split('T')[0],
      paymentStatus: 'paid',
      amount: event.price,
    };
    
    const existingRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    existingRegistrations.push(registration);
    localStorage.setItem('registrations', JSON.stringify(existingRegistrations));
    
    alert('Payment successful! Registration confirmed. You will receive confirmation details via email.');
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/events')}
          className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </button>

        {/* Event Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  event.price === 0 
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                } backdrop-blur-sm`}>
                  {event.price === 0 ? 'Free Event' : `₹${event.price}`}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-sm font-medium rounded-full mb-4">
                {event.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {event.title}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Event Details */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{event.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{event.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{event.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{event.slots} spots available</span>
                </div>
              </div>
            </div>

            {/* Registration Actions */}
            <div className="space-y-4">
              {event.price === 0 ? (
                <button
                  onClick={handleDirectRegister}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105"
                >
                  Register for Free
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleDirectRegister}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105"
                  >
                    Register Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-300">About This Event</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {event.fullDescription}
            </p>
            
            <h3 className="text-xl font-semibold mb-4 text-white">Requirements</h3>
            <ul className="space-y-2 mb-6">
              {event.requirements.map((req, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <Star className="w-4 h-4 text-purple-400" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-300">What to Expect</h2>
            <ul className="space-y-3">
              {event.whatToExpect.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Registration Form Modal */}
        {showRegistrationForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Event Registration</h2>
              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={registrationData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={registrationData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={registrationData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    College/Institution *
                  </label>
                  <input
                    type="text"
                    name="college"
                    required
                    value={registrationData.college}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Year of Study / Profession *
                  </label>
                  <input
                    type="text"
                    name="yearOfStudy"
                    required
                    value={registrationData.yearOfStudy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationForm(false)}
                    className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={event.price}
          eventTitle={event.title}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </div>
    </div>
  );
};

export default EventDetails;