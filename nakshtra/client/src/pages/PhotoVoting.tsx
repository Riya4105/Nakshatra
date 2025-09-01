import React, { useState, useEffect } from 'react';
import { Star, Trophy, Camera, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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

const PhotoVoting: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [userVotes, setUserVotes] = useState<string[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    // Load mock photos with voting data
    const mockPhotos: Photo[] = [
      {
        id: '1',
        title: 'Orion Nebula',
        photographer: 'Sarah Chen',
        photographerId: '2',
        description: 'A stunning view of the Orion Nebula captured with a 200mm telescope during winter.',
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
        description: 'Jupiter with its four largest moons clearly visible through our club telescope.',
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
        description: 'The bright core of our galaxy captured during a summer camping trip.',
        imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Wide Field',
        uploadDate: '2024-02-25',
        votes: 32,
        voters: ['1', '2', '3', '6'],
      },
      {
        id: '4',
        title: 'Andromeda Galaxy',
        photographer: 'David Park',
        photographerId: '7',
        description: 'Our neighboring galaxy captured in stunning detail over multiple nights.',
        imageUrl: 'https://images.pexels.com/photos/355906/pexels-photo-355906.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Deep Space',
        uploadDate: '2024-03-01',
        votes: 28,
        voters: ['2', '4', '5', '6'],
      },
      {
        id: '5',
        title: 'Saturn\'s Rings',
        photographer: 'Lisa Zhang',
        photographerId: '8',
        description: 'The majestic rings of Saturn captured during opposition.',
        imageUrl: 'https://images.pexels.com/photos/2034892/pexels-photo-2034892.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Planetary',
        uploadDate: '2024-03-05',
        votes: 21,
        voters: ['1', '3', '4'],
      },
      {
        id: '6',
        title: 'Lunar Eclipse Sequence',
        photographer: 'Alex Kumar',
        photographerId: '9',
        description: 'A composite image showing the progression of a total lunar eclipse.',
        imageUrl: 'https://images.pexels.com/photos/33109/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
        category: 'Lunar',
        uploadDate: '2024-03-08',
        votes: 35,
        voters: ['1', '2', '5', '7', '8'],
      },
    ];

    setPhotos(mockPhotos);
    
    // Load user's votes from localStorage
    const savedVotes = JSON.parse(localStorage.getItem(`votes_${user.id}`) || '[]');
    setUserVotes(savedVotes);
  }, [user, navigate]);

  const handleVote = (photoId: string) => {
    if (!user) return;

    const hasVoted = userVotes.includes(photoId);
    let newUserVotes: string[];
    let newPhotos: Photo[];

    if (hasVoted) {
      // Remove vote
      newUserVotes = userVotes.filter(id => id !== photoId);
      newPhotos = photos.map(photo => 
        photo.id === photoId 
          ? { 
              ...photo, 
              votes: photo.votes - 1,
              voters: photo.voters.filter(voterId => voterId !== user.id)
            }
          : photo
      );
    } else {
      // Add vote
      newUserVotes = [...userVotes, photoId];
      newPhotos = photos.map(photo => 
        photo.id === photoId 
          ? { 
              ...photo, 
              votes: photo.votes + 1,
              voters: [...photo.voters, user.id]
            }
          : photo
      );
    }

    setUserVotes(newUserVotes);
    setPhotos(newPhotos);
    
    // Save votes to localStorage
    localStorage.setItem(`votes_${user.id}`, JSON.stringify(newUserVotes));
  };

  const categories = ['all', 'Deep Space', 'Planetary', 'Wide Field', 'Lunar'];
  const filteredPhotos = filter === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === filter);

  const sortedPhotos = filteredPhotos.sort((a, b) => b.votes - a.votes);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/gallery')}
          className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Gallery
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Photo Contest
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Vote for your favorite astrophotography submissions from our Celestial Photography Exhibition. 
            Each user can vote for multiple photos.
          </p>
          
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-yellow-300 mb-2">Voting Guidelines</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• You can vote for multiple photographs</li>
              <li>• Click the star to vote/unvote</li>
              <li>• Voting closes on March 30th, 2024</li>
              <li>• Winners will be announced at the awards ceremony</li>
            </ul>
          </div>
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
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="mb-12 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Current Leaderboard
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {sortedPhotos.slice(0, 3).map((photo, index) => (
              <div key={photo.id} className={`p-4 rounded-xl border-2 ${
                index === 0 ? 'border-yellow-500/50 bg-yellow-500/10' :
                index === 1 ? 'border-gray-400/50 bg-gray-400/10' :
                'border-orange-600/50 bg-orange-600/10'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-yellow-500 text-black' :
                    index === 1 ? 'bg-gray-400 text-black' :
                    'bg-orange-600 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{photo.title}</h3>
                    <p className="text-gray-300 text-sm">by {photo.photographer}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{photo.votes} votes</span>
                  </div>
                  <span className="text-xs text-gray-400">{photo.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Ranking Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500 text-black' :
                    index === 1 ? 'bg-gray-400 text-black' :
                    index === 2 ? 'bg-orange-600 text-white' :
                    'bg-slate-800/80 text-gray-300'
                  } backdrop-blur-sm`}>
                    #{index + 1}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm font-medium rounded-full backdrop-blur-sm border border-purple-500/30">
                    {photo.category}
                  </span>
                </div>

                {/* Vote Button */}
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={() => handleVote(photo.id)}
                    disabled={photo.photographerId === user.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all backdrop-blur-sm ${
                      userVotes.includes(photo.id)
                        ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/50'
                        : photo.photographerId === user.id
                        ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30 cursor-not-allowed'
                        : 'bg-slate-800/80 text-white hover:bg-yellow-500/20 hover:text-yellow-300 border border-slate-600'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${userVotes.includes(photo.id) ? 'fill-current' : ''}`} />
                    {photo.votes}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">
                  {photo.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {photo.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-400">
                    <span className="font-medium text-purple-300">{photo.photographer}</span>
                    <br />
                    <span>{new Date(photo.uploadDate).toLocaleDateString()}</span>
                  </div>
                  {photo.photographerId === user.id && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                      Your Photo
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Voting Stats */}
        <div className="mt-16 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-purple-300 mb-6">Your Voting Activity</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{userVotes.length}</div>
              <p className="text-gray-300">Photos Voted</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {photos.filter(p => p.photographerId === user.id).length}
              </div>
              <p className="text-gray-300">Your Submissions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {photos.filter(p => p.photographerId === user.id).reduce((total, p) => total + p.votes, 0)}
              </div>
              <p className="text-gray-300">Votes Received</p>
            </div>
          </div>
        </div>

        {/* Contest Info */}
        <div className="mt-12 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-8">
          <div className="text-center">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">Contest Prizes</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400 mb-2">🥇 1st Place</div>
                <p className="text-yellow-300 font-medium">Professional Telescope</p>
                <p className="text-gray-300 text-sm">Worth ₹25,000</p>
              </div>
              <div className="bg-gray-400/10 border border-gray-400/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-300 mb-2">🥈 2nd Place</div>
                <p className="text-gray-300 font-medium">Camera & Lens Kit</p>
                <p className="text-gray-400 text-sm">Worth ₹15,000</p>
              </div>
              <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-400 mb-2">🥉 3rd Place</div>
                <p className="text-orange-300 font-medium">Astronomy Books Set</p>
                <p className="text-gray-300 text-sm">Worth ₹5,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoVoting;