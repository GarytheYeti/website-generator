"use client";

import { useState } from 'react';
import ThemeGrid from '@/components/themes/ThemeGrid';
import LayoutGrid from '@/components/layouts/LayoutGrid';

// Mock data for development
const mockThemes = [
  {
    id: 1,
    name: 'Modern Business',
    description: 'A clean, professional theme for business websites',
    preview_image_url: '/themes/modern-business.jpg'
  },
  {
    id: 2,
    name: 'Creative Portfolio',
    description: 'Showcase your work with this artistic theme',
    preview_image_url: '/themes/creative-portfolio.jpg'
  },
  {
    id: 3,
    name: 'E-commerce Store',
    description: 'Perfect for online shops and product catalogs',
    preview_image_url: '/themes/ecommerce-store.jpg'
  }
];

const mockLayouts = [
  {
    id: 1,
    name: 'Single Column',
    description: 'Simple one-column layout for content-focused pages',
    preview_image_url: '/layouts/single-column.jpg',
    compatible_themes: [1, 2, 3]
  },
  {
    id: 2,
    name: 'Two Column',
    description: 'Two-column layout with sidebar',
    preview_image_url: '/layouts/two-column.jpg',
    compatible_themes: [1, 3]
  },
  {
    id: 3,
    name: 'Hero Banner',
    description: 'Large hero image with content sections below',
    preview_image_url: '/layouts/hero-banner.jpg',
    compatible_themes: [1, 2]
  }
];

export default function AdminThemeManager() {
  const [selectedThemeId, setSelectedThemeId] = useState<number | undefined>(undefined);
  const [selectedLayoutId, setSelectedLayoutId] = useState<number | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'themes' | 'layouts'>('themes');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    preview_image_url: '',
    compatible_themes: [] as number[]
  });

  const handleThemeSelect = (themeId: number) => {
    setSelectedThemeId(themeId);
    const theme = mockThemes.find(t => t.id === themeId);
    if (theme) {
      setFormData({
        name: theme.name,
        description: theme.description || '',
        preview_image_url: theme.preview_image_url || '',
        compatible_themes: []
      });
      setIsEditing(true);
    }
  };

  const handleLayoutSelect = (layoutId: number) => {
    setSelectedLayoutId(layoutId);
    const layout = mockLayouts.find(l => l.id === layoutId);
    if (layout) {
      setFormData({
        name: layout.name,
        description: layout.description || '',
        preview_image_url: layout.preview_image_url || '',
        compatible_themes: layout.compatible_themes || []
      });
      setIsEditing(true);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleThemeCompatibilityChange = (themeId: number) => {
    setFormData(prev => {
      const isSelected = prev.compatible_themes.includes(themeId);
      return {
        ...prev,
        compatible_themes: isSelected
          ? prev.compatible_themes.filter(id => id !== themeId)
          : [...prev.compatible_themes, themeId]
      };
    });
  };

  const handleSave = () => {
    // In a real application, this would save to the database
    console.log('Saving:', activeTab === 'themes' ? 'theme' : 'layout', formData);
    setIsEditing(false);
    setSelectedThemeId(undefined);
    setSelectedLayoutId(undefined);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedThemeId(undefined);
    setSelectedLayoutId(undefined);
  };

  const handleNewItem = () => {
    setFormData({
      name: '',
      description: '',
      preview_image_url: '',
      compatible_themes: []
    });
    setIsEditing(true);
    setSelectedThemeId(undefined);
    setSelectedLayoutId(undefined);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Theme & Layout Manager</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 ${activeTab === 'themes' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('themes')}
        >
          Themes
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'layouts' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('layouts')}
        >
          Layouts
        </button>
      </div>
      
      {/* Add New Button */}
      {!isEditing && (
        <button 
          className="mb-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleNewItem}
        >
          Add New {activeTab === 'themes' ? 'Theme' : 'Layout'}
        </button>
      )}
      
      {/* Edit Form */}
      {isEditing && (
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {selectedThemeId || selectedLayoutId ? 'Edit' : 'Create New'} {activeTab === 'themes' ? 'Theme' : 'Layout'}
          </h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded"
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Preview Image URL</label>
            <input 
              type="text" 
              name="preview_image_url" 
              value={formData.preview_image_url} 
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          {/* Theme compatibility selector (only for layouts) */}
          {activeTab === 'layouts' && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Compatible Themes</label>
              <div className="space-y-2">
                {mockThemes.map(theme => (
                  <div key={theme.id} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`theme-${theme.id}`}
                      checked={formData.compatible_themes.includes(theme.id)}
                      onChange={() => handleThemeCompatibilityChange(theme.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`theme-${theme.id}`}>{theme.name}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex space-x-2">
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSave}
            >
              Save
            </button>
            <button 
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Theme/Layout Grid */}
      {!isEditing && activeTab === 'themes' && (
        <ThemeGrid 
          themes={mockThemes} 
          onSelect={handleThemeSelect}
          isAdmin={true}
        />
      )}
      
      {!isEditing && activeTab === 'layouts' && (
        <LayoutGrid 
          layouts={mockLayouts} 
          onSelect={handleLayoutSelect}
          isAdmin={true}
        />
      )}
    </div>
  );
}
