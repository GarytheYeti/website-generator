"use client";

import React, { useState } from 'react';
import ContentEditor from '@/components/content/ContentEditor';
import PageComponent from '@/components/page/PageComponent';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Mock data for development
const mockPageComponents = [
  {
    id: 1,
    type: 'header',
    position: 'header',
    content: {
      title: 'My Website',
      subtitle: 'Welcome to my professional website'
    }
  },
  {
    id: 2,
    type: 'paragraph',
    position: 'content',
    content: {
      text: 'This is a sample paragraph for the single column layout. Here you can add your main content that will be displayed to visitors.'
    }
  },
  {
    id: 3,
    type: 'image',
    position: 'content',
    content: {
      src: 'https://via.placeholder.com/800x400',
      alt: 'Sample image',
      caption: 'This is a sample image'
    }
  },
  {
    id: 4,
    type: 'button',
    position: 'content',
    content: {
      text: 'Learn More',
      primary: true
    }
  }
];

export default function ContentManager() {
  const [components, setComponents] = useState(mockPageComponents);
  const [editingComponentId, setEditingComponentId] = useState<number | null>(null);
  const [showAddComponentModal, setShowAddComponentModal] = useState(false);
  const [newComponentType, setNewComponentType] = useState('paragraph');
  const [newComponentPosition, setNewComponentPosition] = useState('content');
  
  const handleSaveContent = (componentId: number, newContent: any) => {
    setComponents(prevComponents => 
      prevComponents.map(component => 
        component.id === componentId 
          ? { ...component, content: newContent } 
          : component
      )
    );
    setEditingComponentId(null);
  };
  
  const handleDeleteComponent = (componentId: number) => {
    setComponents(prevComponents => 
      prevComponents.filter(component => component.id !== componentId)
    );
  };
  
  const handleAddComponent = () => {
    // Create default content based on component type
    let defaultContent = {};
    
    switch (newComponentType) {
      case 'header':
        defaultContent = { title: 'New Header', subtitle: '' };
        break;
      case 'paragraph':
        defaultContent = { text: 'New paragraph text goes here.' };
        break;
      case 'image':
        defaultContent = { src: 'https://via.placeholder.com/800x400', alt: 'New image', caption: '' };
        break;
      case 'button':
        defaultContent = { text: 'New Button', primary: true };
        break;
      case 'hero':
        defaultContent = { 
          title: 'New Hero Section', 
          subtitle: 'Add a subtitle here', 
          buttonText: 'Click Me', 
          backgroundImage: 'https://via.placeholder.com/1920x600' 
        };
        break;
      case 'gallery':
        defaultContent = { 
          title: 'New Gallery', 
          images: [
            { src: 'https://via.placeholder.com/400x300', alt: 'Gallery image 1', caption: 'Image 1' },
            { src: 'https://via.placeholder.com/400x300', alt: 'Gallery image 2', caption: 'Image 2' }
          ] 
        };
        break;
      case 'contact':
        defaultContent = { title: 'Contact Us', buttonText: 'Send Message' };
        break;
    }
    
    // Add new component with a unique ID
    const newId = Math.max(0, ...components.map(c => c.id)) + 1;
    const newComponent = {
      id: newId,
      type: newComponentType,
      position: newComponentPosition,
      content: defaultContent
    };
    
    setComponents(prevComponents => [...prevComponents, newComponent]);
    setShowAddComponentModal(false);
  };
  
  const handleMoveComponent = (componentId: number, direction: 'up' | 'down') => {
    const componentIndex = components.findIndex(c => c.id === componentId);
    if (
      (direction === 'up' && componentIndex === 0) || 
      (direction === 'down' && componentIndex === components.length - 1)
    ) {
      return; // Can't move further in this direction
    }
    
    const newComponents = [...components];
    const targetIndex = direction === 'up' ? componentIndex - 1 : componentIndex + 1;
    
    // Swap components
    [newComponents[componentIndex], newComponents[targetIndex]] = 
      [newComponents[targetIndex], newComponents[componentIndex]];
    
    setComponents(newComponents);
  };
  
  const handleSavePage = () => {
    // In a real application, this would save to the database
    console.log('Saving page with components:', components);
    alert('Page saved successfully!');
  };
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Content Manager</h1>
            <div className="space-x-2">
              <button 
                onClick={() => setShowAddComponentModal(true)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Component
              </button>
              <button 
                onClick={handleSavePage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Page
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Content Preview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Page Preview</h2>
                <div className="border rounded-lg p-4 bg-gray-50 min-h-[500px]">
                  {components.map(component => (
                    <div key={component.id} className="relative mb-4 group">
                      <div className="absolute -top-3 -right-3 bg-white rounded-full shadow-md p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button 
                          onClick={() => setEditingComponentId(component.id)}
                          className="p-1 text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleMoveComponent(component.id, 'up')}
                          className="p-1 text-gray-500 hover:text-gray-700"
                          title="Move Up"
                        >
                          ⬆️
                        </button>
                        <button 
                          onClick={() => handleMoveComponent(component.id, 'down')}
                          className="p-1 text-gray-500 hover:text-gray-700"
                          title="Move Down"
                        >
                          ⬇️
                        </button>
                        <button 
                          onClick={() => handleDeleteComponent(component.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                      <div className={`border-2 ${editingComponentId === component.id ? 'border-blue-500' : 'border-transparent'} rounded-md`}>
                        <PageComponent
                          type={component.type}
                          content={component.content}
                        />
                      </div>
                    </div>
                  ))}
                  
                  {components.length === 0 && (
                    <div className="flex items-center justify-center h-64 text-gray-400">
                      No components added yet. Click "Add Component" to get started.
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Content Editor */}
            <div className="lg:col-span-1">
              {editingComponentId !== null ? (
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Edit Component</h2>
                    <button 
                      onClick={() => setEditingComponentId(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="p-4">
                    {(() => {
                      const component = components.find(c => c.id === editingComponentId);
                      if (!component) return null;
                      
                      return (
                        <ContentEditor
                          initialContent={component.content}
                          onSave={(newContent) => handleSaveContent(component.id, newContent)}
                          componentType={component.type}
                        />
                      );
                    })()}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                  <p className="text-gray-600 mb-4">
                    Click on any component in the preview to edit its content. Use the buttons that appear when hovering over a component to edit, move, or delete it.
                  </p>
                  <p className="text-gray-600">
                    Click "Add Component" to add new content elements to your page.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Component Modal */}
      {showAddComponentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Component</h2>
              <button 
                onClick={() => setShowAddComponentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Component Type</label>
              <select
                value={newComponentType}
                onChange={(e) => setNewComponentType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="header">Header</option>
                <option value="paragraph">Paragraph</option>
                <option value="image">Image</option>
                <option value="button">Button</option>
                <option value="hero">Hero Section</option>
                <option value="gallery">Image Gallery</option>
                <option value="contact">Contact Form</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <select
                value={newComponentPosition}
                onChange={(e) => setNewComponentPosition(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="header">Header</option>
                <option value="hero">Hero</option>
                <option value="content">Main Content</option>
                <option value="sidebar">Sidebar</option>
                <option value="footer">Footer</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddComponentModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddComponent}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Component
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
