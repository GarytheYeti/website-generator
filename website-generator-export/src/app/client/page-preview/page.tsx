"use client";

import React, { useState } from 'react';
import PageTemplate from '@/components/page/PageTemplate';

// Mock data for development
const mockThemes = [
  { id: 1, name: 'modern-business' },
  { id: 2, name: 'creative-portfolio' },
  { id: 3, name: 'e-commerce-store' }
];

const mockLayouts = [
  { id: 1, name: 'single-column' },
  { id: 2, name: 'two-column' },
  { id: 3, name: 'hero-banner' }
];

// Sample component data for different layouts
const sampleComponents = {
  'single-column': [
    {
      type: 'header',
      position: 'header',
      content: {
        title: 'My Website',
        subtitle: 'Welcome to my professional website'
      }
    },
    {
      type: 'paragraph',
      position: 'content',
      content: {
        text: 'This is a sample paragraph for the single column layout. Here you can add your main content that will be displayed to visitors.'
      }
    },
    {
      type: 'image',
      position: 'content',
      content: {
        src: 'https://via.placeholder.com/800x400',
        alt: 'Sample image',
        caption: 'This is a sample image'
      }
    },
    {
      type: 'button',
      position: 'content',
      content: {
        text: 'Learn More',
        primary: true
      }
    }
  ],
  'two-column': [
    {
      type: 'header',
      position: 'header',
      content: {
        title: 'Two Column Layout',
        subtitle: 'Main content and sidebar'
      }
    },
    {
      type: 'paragraph',
      position: 'main',
      content: {
        text: 'This is the main content area in a two-column layout. It takes up more space and is ideal for your primary content.'
      }
    },
    {
      type: 'image',
      position: 'main',
      content: {
        src: 'https://via.placeholder.com/600x300',
        alt: 'Main content image',
        caption: 'Main content image'
      }
    },
    {
      type: 'paragraph',
      position: 'sidebar',
      content: {
        text: 'This is the sidebar content. It\'s great for secondary information, navigation, or calls to action.'
      }
    },
    {
      type: 'button',
      position: 'sidebar',
      content: {
        text: 'Contact Us',
        primary: true
      }
    }
  ],
  'hero-banner': [
    {
      type: 'hero',
      position: 'hero',
      content: {
        title: 'Welcome to My Website',
        subtitle: 'A beautiful hero banner layout',
        buttonText: 'Get Started',
        backgroundImage: 'https://via.placeholder.com/1920x600'
      }
    },
    {
      type: 'paragraph',
      position: 'content',
      content: {
        text: 'This layout features a prominent hero banner at the top, followed by your main content. It\'s perfect for making a strong first impression.'
      }
    },
    {
      type: 'gallery',
      position: 'content',
      content: {
        title: 'Image Gallery',
        images: [
          { src: 'https://via.placeholder.com/400x300', alt: 'Gallery image 1', caption: 'Image 1' },
          { src: 'https://via.placeholder.com/400x300', alt: 'Gallery image 2', caption: 'Image 2' },
          { src: 'https://via.placeholder.com/400x300', alt: 'Gallery image 3', caption: 'Image 3' }
        ]
      }
    },
    {
      type: 'contact',
      position: 'footer',
      content: {
        title: 'Get In Touch',
        buttonText: 'Send'
      }
    }
  ]
};

export default function PagePreview() {
  const [selectedTheme, setSelectedTheme] = useState('modern-business');
  const [selectedLayout, setSelectedLayout] = useState('single-column');
  const [components, setComponents] = useState(sampleComponents['single-column']);
  
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(e.target.value);
  };
  
  const handleLayoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLayout = e.target.value;
    setSelectedLayout(newLayout);
    setComponents(sampleComponents[newLayout as keyof typeof sampleComponents]);
  };
  
  const handleExport = () => {
    // In a real application, this would generate and export the website
    console.log('Exporting website with:', {
      theme: selectedTheme,
      layout: selectedLayout,
      components
    });
    
    // For demonstration, create a JSON representation
    const exportData = {
      theme: selectedTheme,
      layout: selectedLayout,
      components,
      exportDate: new Date().toISOString()
    };
    
    // Create a download link for the JSON
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "website-export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Control Panel */}
      <div className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-xl font-bold mb-4 md:mb-0">Page Preview & Generator</h1>
            
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div>
                <label className="mr-2">Theme:</label>
                <select 
                  value={selectedTheme} 
                  onChange={handleThemeChange}
                  className="border rounded px-2 py-1"
                >
                  {mockThemes.map(theme => (
                    <option key={theme.id} value={theme.name}>{theme.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="mr-2">Layout:</label>
                <select 
                  value={selectedLayout} 
                  onChange={handleLayoutChange}
                  className="border rounded px-2 py-1"
                >
                  {mockLayouts.map(layout => (
                    <option key={layout.id} value={layout.name}>{layout.name}</option>
                  ))}
                </select>
              </div>
              
              <button 
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                onClick={handleExport}
              >
                Export Website
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Preview Area */}
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg border rounded-lg overflow-hidden">
          <div className="border-b p-2 bg-gray-100 flex items-center">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-sm text-gray-500">Preview</div>
          </div>
          
          <div className="border-b">
            <PageTemplate
              layout={selectedLayout}
              theme={selectedTheme}
              components={components}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
