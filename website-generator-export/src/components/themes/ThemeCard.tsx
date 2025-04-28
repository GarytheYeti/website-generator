import React from 'react';

interface Theme {
  id: number;
  name: string;
  description?: string;
  preview_image_url?: string;
}

interface ThemeCardProps {
  theme: Theme;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      {theme.preview_image_url && (
        <img src={theme.preview_image_url} alt={theme.name} className="w-full h-32 object-cover rounded-md mb-2" />
      )}
      <h3 className="text-lg font-semibold">{theme.name}</h3>
      {theme.description && <p className="text-sm text-gray-600">{theme.description}</p>}
      {/* Add selection/management buttons later */}
    </div>
  );
};

export default ThemeCard;
