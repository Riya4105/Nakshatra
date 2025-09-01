import React, { useState } from 'react';
import { Star, Upload, User, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Gallery: React.FC = () => {
  const { user } = useAuth();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [filter, setFilter] = useState('all');

  const photographs = [
    {
      id: 1,
      title: 'Orion Nebula',
      photographer: 'Sarah Chen',
      date: '2024-02-15',
      description: 'A stunning view of the Orion Nebula captured with a 200mm telescope.',
      image: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=800',
      category: 'Deep Space',
      likes: 24,
    },
    {
      id: 2,
      title: 'Jupiter and Moons',
      photographer: 'Mike Rodriguez',
      date: '2024-02-20',
      description: 'Jupiter with its four largest moons clearly visible.',
      image: 'https://images.pexels.com/photos/2152/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=800',
      category: 'Planetary',
      likes: 18,
    },
    {
      id: 3,
      title: 'Milky Way Core',
      photographer: 'Emily Watson',
      date: '2024-02-25',
      description: 'The bright core of our galaxy captured during summer.',
      image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Wide Field',
      likes: 32,
    },
    {
      id: 4,
      title: 'Andromeda Galaxy',
      photographer: 'David Park',
      date: '2024-03-01',
      description: 'Our neighboring galaxy in all its spiral glory.',
      image: 'https://images.pexels.com/photos/355906/pexels-photo-355906.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Deep Space',
      likes: 28,
    },
    {
      id: 5,
      title: 'Saturn\'s Rings',
      photographer: 'Lisa Zhang',
      date: '2024-03-05',
      description: 'The majestic rings of Saturn in stunning detail.',
      image: 'https://images.pexels.com/photos/2034892/pexels-photo-2034892.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Planetary',
      likes: 21,
    },
    {
      id: 6,
      title: 'Horsehead Nebula',
      photographer: 'Alex Kumar',
      date: '2024-03-08',
      description: 'The iconic dark nebula silhouetted against bright emission nebula.',
      image: 'https://images.pexels.com/photos/33109/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      category: 'Deep Space',
      likes: 35,
    },
  ];

  const categories = ['all', 'Deep Space', 'Planetary', 'Wide Field'];

  const filteredPhotographs = filter === 'all' 
    ? photographs 
    : photographs.filter(photo => photo.category === filter);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Celestial Gallery
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore breathtaking astrophotography captured by our talented community members. 
            Share your own cosmic discoveries with the world.
          </p>
          
          {user && (
            <button
              onClick={() => setShowUploadForm(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              <Upload className="w-5 h-5" />
              Upload Photo
            </button>
          )}
          
          <a
            href="/photo-voting"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ml-4"
          >
            <Star className="w-5 h-5" />
            Vote for Photos
          </a>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === category
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-purple-500/20'
              }`}
            >
              {category === 'all' ? 'All Photos' : category}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotographs.map((photo) => (
            <div
              key={photo.id}
              className="group bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm font-medium rounded-full backdrop-blur-sm border border-purple-500/30">
                    {photo.category}
                  </span>
                </div>

                {/* Likes */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 px-3 py-1 bg-slate-800/80 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    {photo.likes}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">
                  {photo.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {photo.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{photo.photographer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(photo.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Form Modal */}
        {showUploadForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Upload Photo</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                    placeholder="e.g., Orion Nebula"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                  >
                    <option value="">Select category</option>
                    <option value="Deep Space">Deep Space</option>
                    <option value="Planetary">Planetary</option>
                    <option value="Wide Field">Wide Field</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-400 focus:outline-none resize-none"
                    placeholder="Describe your photograph..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Image *
                  </label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      JPG, PNG up to 10MB
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Call to Action */}
        {!user && (
          <div className="mt-20 text-center bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Share Your Cosmic Vision
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our community to upload your own astrophotography and be part of our celestial gallery.
            </p>
            <a
              href="/signup"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              <Star className="w-5 h-5" />
              Join AstroClub
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;