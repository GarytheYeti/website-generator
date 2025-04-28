import React, { useState } from 'react';
import { D1Database } from '@cloudflare/workers-types';

interface MediaLibraryProps {
  DB?: D1Database;
  onSelectMedia: (mediaUrl: string) => void;
}

// Mock data for development
const mockMediaItems = [
  {
    id: 1,
    name: 'Beach Sunset',
    url: 'https://via.placeholder.com/800x600?text=Beach+Sunset',
    type: 'image',
    size: '245 KB',
    uploaded_at: '2025-04-25T14:30:00Z'
  },
  {
    id: 2,
    name: 'Company Logo',
    url: 'https://via.placeholder.com/400x400?text=Logo',
    type: 'image',
    size: '120 KB',
    uploaded_at: '2025-04-26T09:15:00Z'
  },
  {
    id: 3,
    name: 'Product Photo',
    url: 'https://via.placeholder.com/600x400?text=Product',
    type: 'image',
    size: '180 KB',
    uploaded_at: '2025-04-26T16:45:00Z'
  },
  {
    id: 4,
    name: 'Team Photo',
    url: 'https://via.placeholder.com/1200x800?text=Team',
    type: 'image',
    size: '350 KB',
    uploaded_at: '2025-04-27T10:20:00Z'
  }
];

const MediaLibrary: React.FC<MediaLibraryProps> = ({ DB, onSelectMedia }) => {
  const [mediaItems, setMediaItems] = useState(mockMediaItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Filter media items based on search term
  const filteredMediaItems = mediaItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Create new media item
        const file = files[0];
        const newMediaItem = {
          id: Math.max(0, ...mediaItems.map(item => item.id)) + 1,
          name: file.name,
          url: URL.createObjectURL(file), // In a real app, this would be a server URL
          type: file.type.startsWith('image/') ? 'image' : 'file',
          size: `${Math.round(file.size / 1024)} KB`,
          uploaded_at: new Date().toISOString()
        };
        
        setMediaItems(prev => [...prev, newMediaItem]);
        setUploading(false);
        setUploadProgress(0);
      }
    }, 300);
  };
  
  const handleDeleteMedia = (id: number) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Media Library</h2>
      
      {/* Search and Upload */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
            Upload New
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
      
      {/* Upload Progress */}
      {uploading && (
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">Uploading... {uploadProgress}%</p>
        </div>
      )}
      
      {/* Media Grid */}
      {filteredMediaItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMediaItems.map(item => (
            <div key={item.id} className="border rounded-md overflow-hidden group relative">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {item.type === 'image' ? (
                  <img 
                    src={item.url} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-4xl text-gray-400">📄</div>
                )}
              </div>
              <div className="p-2">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-gray-500">{item.size}</p>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onSelectMedia(item.url)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm mr-2"
                >
                  Select
                </button>
                <button
                  onClick={() => handleDeleteMedia(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? 'No media items match your search.' : 'No media items found. Upload some!'}
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
