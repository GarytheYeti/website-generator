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

export default function ClientThemeSelector() {
  const [selectedThemeId, setSelectedThemeId] = useState<number | undefined>(undefined);
  const [selectedLayoutId, setSelectedLayoutId] = useState<number | undefined>(undefined);
  const [step, setStep] = useState<'theme' | 'layout' | 'preview'>('theme');

  const handleThemeSelect = (themeId: number) => {
    setSelectedThemeId(themeId);
    setSelectedLayoutId(undefined); // Reset layout selection when theme changes
  };

  const handleLayoutSelect = (layoutId: number) => {
    setSelectedLayoutId(layoutId);
  };

  const handleNext = () => {
    if (step === 'theme' && selectedThemeId) {
      setStep('layout');
    } else if (step === 'layout' && selectedLayoutId) {
      setStep('preview');
    }
  };

  const handleBack = () => {
    if (step === 'layout') {
      setStep('theme');
    } else if (step === 'preview') {
      setStep('layout');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Your Website</h1>
      
      {/* Progress indicator */}
      <div className="flex items-center mb-8">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          step === 'theme' || step === 'layout' || step === 'preview' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-300'
        }`}>
          1
        </div>
        <div className={`h-1 w-16 ${
          step === 'layout' || step === 'preview' ? 'bg-blue-500' : 'bg-gray-300'
        }`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          step === 'layout' || step === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-300'
        }`}>
          2
        </div>
        <div className={`h-1 w-16 ${step === 'preview' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          step === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-300'
        }`}>
          3
        </div>
      </div>
      
      {/* Theme selection step */}
      {step === 'theme' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Select a Theme</h2>
          <p className="text-gray-600 mb-6">Choose a theme that best fits your website's purpose and style.</p>
          <ThemeGrid 
            themes={mockThemes} 
            onSelect={handleThemeSelect} 
            selectedThemeId={selectedThemeId} 
          />
        </div>
      )}
      
      {/* Layout selection step */}
      {step === 'layout' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Select a Layout</h2>
          <p className="text-gray-600 mb-6">Choose a layout for your website pages.</p>
          <LayoutGrid 
            layouts={mockLayouts} 
            onSelect={handleLayoutSelect} 
            selectedLayoutId={selectedLayoutId}
            selectedThemeId={selectedThemeId}
          />
        </div>
      )}
      
      {/* Preview step */}
      {step === 'preview' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Preview Your Website</h2>
          <p className="text-gray-600 mb-6">Here's a preview of your website with the selected theme and layout.</p>
          <div className="border rounded-lg p-4 bg-gray-100 h-96 flex items-center justify-center">
            <p className="text-gray-500">Preview will be implemented in the next phase</p>
          </div>
        </div>
      )}
      
      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <button 
          className={`px-6 py-2 rounded ${
            step === 'theme' ? 'invisible' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={handleBack}
          disabled={step === 'theme'}
        >
          Back
        </button>
        <button 
          className={`px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${
            (step === 'theme' && !selectedThemeId) || 
            (step === 'layout' && !selectedLayoutId) 
              ? 'opacity-50 cursor-not-allowed' 
              : ''
          }`}
          onClick={handleNext}
          disabled={(step === 'theme' && !selectedThemeId) || (step === 'layout' && !selectedLayoutId)}
        >
          {step === 'preview' ? 'Generate Website' : 'Next'}
        </button>
      </div>
    </div>
  );
}
