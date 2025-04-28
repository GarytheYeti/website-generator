import React from 'react';

interface Layout {
  id: number;
  name: string;
  description?: string;
  preview_image_url?: string;
  compatible_themes?: number[];
}

interface LayoutCardProps {
  layout: Layout;
  selectedThemeId?: number;
}

const LayoutCard: React.FC<LayoutCardProps> = ({ layout, selectedThemeId }) => {
  const isCompatible = !selectedThemeId || 
    !layout.compatible_themes || 
    layout.compatible_themes.includes(selectedThemeId);
  
  return (
    <div className={`border rounded-lg p-4 shadow-md ${!isCompatible ? 'opacity-50' : ''}`}>
      {layout.preview_image_url && (
        <img src={layout.preview_image_url} alt={layout.name} className="w-full h-32 object-cover rounded-md mb-2" />
      )}
      <h3 className="text-lg font-semibold">{layout.name}</h3>
      {layout.description && <p className="text-sm text-gray-600">{layout.description}</p>}
      {!isCompatible && (
        <p className="text-xs text-amber-600 mt-2">Not compatible with selected theme</p>
      )}
      {/* Add selection/management buttons later */}
    </div>
  );
};

export default LayoutCard;
