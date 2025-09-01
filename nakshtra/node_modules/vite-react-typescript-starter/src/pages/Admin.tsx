import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Camera, Trophy, BarChart3, Download, Eye, Trash2, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Registration {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  userName: string;
  userEmail: string;
  phone: string;
  college: string;
  yearOfStudy: string;
  registrationDate: string;
  paymentStatus: 'paid' | 'pending' | 'free';
  amount: number;
}

interface Photo {
  id: string;
  title: string;
  photographer: string;
  photographerId: string;
  description: string;
  imageUrl: string;
  category: string;
  uploadDate: string;
  votes: number;
  voters: string[];
}

const Admin: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
      return;
    }

    // Load mock data
    loadMockData();
  }, [user, navigate]);

  const loadMockData = () => {
    // Mock registrations
    const mockRegistrations: Registration[] = [
      {
        id: '1',
        userId: '1',
        eventId: 'star-gazing',
        eventTitle: 'Star Gazing Night',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        phone: '+91 98765 43210',
        college: 'Delhi University',
        yearOfStudy: '3rd Year Computer Science',
        registrationDate: '2024-03-01',
        paymentStatus: 'free',
        amount: 0,
      },
      {
        id: '2',
        userId: '2',
        eventId: 'telescope-workshop',
        eventTitle: 'Telescope Making Workshop',
        userName: 'Sarah Chen',
        userEmail: 'sarah@example.com',
        phone: '+91 87654 32109',
        college: 'IIT Delhi',
        yearOfStudy: '2nd Year Physics',
        registrationDate: '2024-03-02',
        paymentStatus: 'paid',
        amount: 500,
      },
      {
        id: '3',
        userId: '3',
        eventId: 'celestial-photography',
        eventTitle: 'Celestial Photography Exhibition',
        userName: 'Mike Rodriguez',
        userEmail: 'mike@example.com',
        phone: '+91 76543 21098',
        college: 'Jamia Millia Islamia',
        yearOfStudy: 'Software Engineer',
        registrationDate: '2024-03-03',
        paymentStatus: 'pending',
        amount: 300,
      },
    ];

    // Mock photos with voting
    const mockPhotos: Photo[] = [
      {
        id: '1',
        title: 'Orion Nebula',
        photographer: 'Sarah Chen',
        photographerId: '2',
        description: 'A stunning view of the Orion Nebula captured with a 200mm telescope.',
        imageUrl: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=800',
        category: 'Deep Space',
        uploadDate: '2024-02-15',
        votes: 24,
        voters: ['1', '3', '4', '5'],
      },
      {
        id: '2',
        title: 'Jupiter and Moons',
        photographer: 'Mike Rodriguez',
        photographerId: '3',
        description: 'Jupiter with its four largest moons clearly visible.',
        imageUrl: 'https://images.pexels.com/photos/2152/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=800',
        category: 'Planetary',
        uploadDate: '2024-02-20',
        votes: 18,
        voters: ['1', '2', '5'],
      },
      {
        id: '3',
        title: 'Milky Way Core',
        photographer: 'Emily Watson',
        photographerId: '4',
        description: 'The bright core of our galaxy captured during summer.',
        imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Wide Field',
        uploadDate: '2024-02-25',
        votes: 32,
        voters: ['1', '2', '3', '6'],
      },
    ];

    // Mock users
    const mockUsers = JSON.parse(localStorage.getItem('users') || '[]');

    setRegistrations(mockRegistrations);
    setPhotos(mockPhotos);
    setUsers(mockUsers);
  };

  const exportData = (data: any[], filename: string) => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');
    
    return csvContent;
  };

  const deleteRegistration = (id: string) => {
    if (confirm('Are you sure you want to delete this registration?')) {
      setRegistrations(prev => prev.filter(reg => reg.id !== id));
    }
  };

  const deletePhoto = (id: string) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      setPhotos(prev => prev.filter(photo => photo.id !== id));
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-8">You don't have permission to access this page.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-300">Manage events, users, and club activities</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-slate-800/30 p-2 rounded-xl">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'registrations', label: 'Registrations', icon: Calendar },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'photos', label: 'Photo Gallery', icon: Camera },
            { id: 'voting', label: 'Photo Voting', icon: Trophy },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'text-gray-300 hover:bg-slate-700/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold text-white">{users.length}</span>
              </div>
              <h3 className="text-lg font-semibold text-purple-300">Total Users</h3>
              <p className="text-gray-400 text-sm">Registered members</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">{registrations.length}</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-300">Event Registrations</h3>
              <p className="text-gray-400 text-sm">Total registrations</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Camera className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold text-white">{photos.length}</span>
              </div>
              <h3 className="text-lg font-semibold text-green-300">Photo Submissions</h3>
              <p className="text-gray-400 text-sm">Gallery uploads</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <span className="text-2xl font-bold text-white">
                  ₹{registrations.reduce((total, reg) => total + reg.amount, 0)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-yellow-300">Total Revenue</h3>
              <p className="text-gray-400 text-sm">From paid events</p>
            </div>
          </div>
        )}

        {/* Registrations Tab */}
        {activeTab === 'registrations' && (
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-300">Event Registrations</h2>
              <button
                onClick={() => exportData(registrations, 'registrations.csv')}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-3 px-4 text-gray-300">User</th>
                    <th className="text-left py-3 px-4 text-gray-300">Event</th>
                    <th className="text-left py-3 px-4 text-gray-300">College</th>
                    <th className="text-left py-3 px-4 text-gray-300">Date</th>
                    <th className="text-left py-3 px-4 text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 text-gray-300">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((registration) => (
                    <tr key={registration.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-white font-medium">{registration.userName}</div>
                          <div className="text-gray-400 text-xs">{registration.userEmail}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{registration.eventTitle}</td>
                      <td className="py-3 px-4 text-gray-300">{registration.college}</td>
                      <td className="py-3 px-4 text-gray-300">
                        {new Date(registration.registrationDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          registration.paymentStatus === 'paid' 
                            ? 'bg-green-500/20 text-green-300'
                            : registration.paymentStatus === 'pending'
                            ? 'bg-orange-500/20 text-orange-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {registration.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {registration.amount === 0 ? 'Free' : `₹${registration.amount}`}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="text-blue-400 hover:text-blue-300 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteRegistration(registration.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-300">User Management</h2>
              <button
                onClick={() => exportData(users, 'users.csv')}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-3 px-4 text-gray-300">Name</th>
                    <th className="text-left py-3 px-4 text-gray-300">Email</th>
                    <th className="text-left py-3 px-4 text-gray-300">Phone</th>
                    <th className="text-left py-3 px-4 text-gray-300">College</th>
                    <th className="text-left py-3 px-4 text-gray-300">Year/Profession</th>
                    <th className="text-left py-3 px-4 text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                      <td className="py-3 px-4 text-white font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-gray-300">{user.email}</td>
                      <td className="py-3 px-4 text-gray-300">{user.phone || 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-300">{user.college || 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-300">{user.yearOfStudy || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="text-blue-400 hover:text-blue-300 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-300">Photo Gallery Management</h2>
              <button
                onClick={() => exportData(photos, 'photos.csv')}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-slate-700/30 border border-slate-600/50 rounded-xl overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{photo.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">by {photo.photographer}</p>
                    <p className="text-gray-400 text-xs mb-3">{photo.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{photo.votes}</span>
                      </div>
                      <button
                        onClick={() => deletePhoto(photo.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Voting Tab */}
        {activeTab === 'voting' && (
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-300 mb-6">Photo Voting Results</h2>
            
            <div className="space-y-4">
              {photos
                .sort((a, b) => b.votes - a.votes)
                .map((photo, index) => (
                  <div key={photo.id} className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-500 text-black' :
                      index === 1 ? 'bg-gray-400 text-black' :
                      index === 2 ? 'bg-orange-600 text-white' :
                      'bg-slate-600 text-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{photo.title}</h3>
                      <p className="text-gray-300 text-sm">by {photo.photographer}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-400 mb-1">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="text-lg font-bold">{photo.votes}</span>
                      </div>
                      <p className="text-gray-400 text-xs">{photo.voters.length} voters</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;