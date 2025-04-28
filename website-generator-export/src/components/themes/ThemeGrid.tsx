import React from 'react';
import ThemeCard from '@/components/themes/ThemeCard';

interface Theme {
  id: number;
  name: string;
  description?: string;
  preview_image_url?: string;
}

interface ThemeGridProps {
  themes: Theme[];
  onSelect?: (themeId: number) => void;
  selectedThemeId?: number;
  isAdmin?: boolean;
}

const ThemeGrid: React.FC<ThemeGridProps> = ({ 
  themes, 
  onSelect, 
  selectedThemeId,
  isAdmin = false 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {themes.map((theme) => (
        <div key={theme.id} className="relative">
          <ThemeCard theme={theme} />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
              {isAdmin ? (
                <div className="flex space-x-2">
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => onSelect && onSelect(theme.id)}
                  >
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded">
                    Delete
                  </button>
                </div>
              ) : (
                <button 
                  className={`px-4 py-2 rounded ${
                    selectedThemeId === theme.id 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}
                  onClick={() => onSelect && onSelect(theme.id)}
                >
                  {selectedThemeId === theme.id ? 'Selected' : 'Select Theme'}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThemeGrid;
