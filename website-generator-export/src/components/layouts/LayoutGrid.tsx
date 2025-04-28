import React from 'react';
import LayoutCard from '@/components/layouts/LayoutCard';

interface Layout {
  id: number;
  name: string;
  description?: string;
  preview_image_url?: string;
  compatible_themes?: number[];
}

interface LayoutGridProps {
  layouts: Layout[];
  onSelect?: (layoutId: number) => void;
  selectedLayoutId?: number;
  selectedThemeId?: number;
  isAdmin?: boolean;
}

const LayoutGrid: React.FC<LayoutGridProps> = ({ 
  layouts, 
  onSelect, 
  selectedLayoutId,
  selectedThemeId,
  isAdmin = false 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {layouts.map((layout) => {
        const isCompatible = !selectedThemeId || 
          !layout.compatible_themes || 
          layout.compatible_themes.includes(selectedThemeId);
        
        return (
          <div key={layout.id} className="relative">
            <LayoutCard layout={layout} selectedThemeId={selectedThemeId} />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
                {isAdmin ? (
                  <div className="flex space-x-2">
                    <button 
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => onSelect && onSelect(layout.id)}
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
                      !isCompatible 
                        ? 'bg-gray-500 text-white cursor-not-allowed' 
                        : selectedLayoutId === layout.id 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-500 text-white'
                    }`}
                    onClick={() => isCompatible && onSelect && onSelect(layout.id)}
                    disabled={!isCompatible}
                  >
                    {!isCompatible 
                      ? 'Not Compatible' 
                      : selectedLayoutId === layout.id 
                        ? 'Selected' 
                        : 'Select Layout'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LayoutGrid;
