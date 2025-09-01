import React, { useState } from 'react';
import { User, Mail, Phone, GraduationCap, Calendar, Star, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+91 98765 43210',
    college: user?.college || 'Delhi University',
    yearOfStudy: user?.yearOfStudy || '3rd Year Computer Science',
    joinDate: '2024-01-15',
  });

  // Update profileData when user changes
  React.useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: user.phone || '+91 98765 43210',
        college: user.college || 'Delhi University',
        yearOfStudy: user.yearOfStudy || '3rd Year Computer Science',
        joinDate: '2024-01-15',
      });
    }
  }, [user]);

  // Mock registration data
  const registrations = [
    {
      id: 'star-gazing',
      title: 'Star Gazing Night',
      date: 'March 15, 2024',
      time: '8:00 PM',
      status: 'Registered',
      price: 0,
      registrationDate: '2024-03-01',
    },
    {
      id: 'telescope-workshop',
      title: 'Telescope Making Workshop',
      date: 'March 20, 2024',
      time: '2:00 PM',
      status: 'Confirmed',
      price: 500,
      registrationDate: '2024-03-02',
    },
    {
      id: 'celestial-photography',
      title: 'Celestial Photography Exhibition',
      date: 'March 25, 2024',
      time: '6:00 PM',
      status: 'Pending Payment',
      price: 300,
      registrationDate: '2024-03-03',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const success = await updateProfile({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      college: profileData.college,
      yearOfStudy: profileData.yearOfStudy,
    });
    
    if (success) {
      alert('Profile updated successfully!');
      setIsEditing(false);
    } else {
      alert('Failed to update profile. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Registered':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Pending Payment':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Please Sign In</h1>
          <p className="text-gray-300 mb-8">You need to be logged in to view your profile.</p>
          <button
            onClick={() => window.location.href = '/signin'}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-gray-300">Manage your account and view your astronomical journey</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
                <p className="text-purple-300">AstroClub Member</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">{profileData.college}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Star className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">{profileData.yearOfStudy}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">Joined {new Date(profileData.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile Details & Registrations */}
          <div className="lg:col-span-2 space-y-8">
            {/* Edit Profile Form */}
            {isEditing && (
              <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-purple-300 mb-6">Edit Profile</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      College/Institution
                    </label>
                    <input
                      type="text"
                      name="college"
                      value={profileData.college}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Year of Study / Profession
                    </label>
                    <input
                      type="text"
                      name="yearOfStudy"
                      value={profileData.yearOfStudy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Event Registrations */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-purple-300 mb-6">Your Event Registrations</h3>
              
              {registrations.length === 0 ? (
                <div className="text-center py-8">
                  <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-4">You haven't registered for any events yet.</p>
                  <a
                    href="/events"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    <Star className="w-4 h-4" />
                    Browse Events
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {registrations.map((registration) => (
                    <div
                      key={registration.id}
                      className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-6 hover:border-purple-500/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-2">
                            {registration.title}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-300">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {registration.date} at {registration.time}
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(registration.status)}`}>
                          {registration.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          Registered on {new Date(registration.registrationDate).toLocaleDateString()}
                        </div>
                        <div className="text-lg font-semibold text-purple-300">
                          {registration.price === 0 ? 'Free' : `₹${registration.price}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-300 mb-2">
                  {registrations.length}
                </div>
                <p className="text-gray-300">Events Registered</p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-300 mb-2">
                  {registrations.filter(r => r.status === 'Confirmed').length}
                </div>
                <p className="text-gray-300">Events Attended</p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-300 mb-2">
                  ₹{registrations.reduce((total, r) => total + r.price, 0)}
                </div>
                <p className="text-gray-300">Total Spent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;