import React, { useState } from 'react';

interface ContentEditorProps {
  initialContent: any;
  onSave: (content: any) => void;
  componentType: string;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ 
  initialContent, 
  onSave,
  componentType
}) => {
  const [content, setContent] = useState(initialContent);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    onSave(content);
  };
  
  // Render different editor forms based on component type
  const renderEditorForm = () => {
    switch (componentType) {
      case 'header':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={content.title || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={content.subtitle || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        );
        
      case 'paragraph':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
            <textarea
              name="text"
              value={content.text || ''}
              onChange={handleChange}
              rows={5}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        );
        
      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="src"
                value={content.src || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
              <input
                type="text"
                name="alt"
                value={content.alt || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
              <input
                type="text"
                name="caption"
                value={content.caption || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        );
        
      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input
                type="text"
                name="text"
                value={content.text || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="primary"
                name="primary"
                checked={content.primary || false}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  primary: e.target.checked
                }))}
                className="mr-2"
              />
              <label htmlFor="primary">Primary Button Style</label>
            </div>
          </div>
        );
        
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={content.title || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={content.subtitle || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input
                type="text"
                name="buttonText"
                value={content.buttonText || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
              <input
                type="text"
                name="backgroundImage"
                value={content.backgroundImage || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        );
        
      case 'gallery':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Title</label>
              <input
                type="text"
                name="title"
                value={content.title || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
              {content.images && content.images.map((image: any, index: number) => (
                <div key={index} className="border p-3 mb-2 rounded-md">
                  <div className="mb-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="text"
                      value={image.src || ''}
                      onChange={(e) => {
                        const newImages = [...content.images];
                        newImages[index] = { ...newImages[index], src: e.target.value };
                        setContent(prev => ({ ...prev, images: newImages }));
                      }}
                      className="w-full px-3 py-1 border rounded-md text-sm"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Alt Text</label>
                    <input
                      type="text"
                      value={image.alt || ''}
                      onChange={(e) => {
                        const newImages = [...content.images];
                        newImages[index] = { ...newImages[index], alt: e.target.value };
                        setContent(prev => ({ ...prev, images: newImages }));
                      }}
                      className="w-full px-3 py-1 border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Caption</label>
                    <input
                      type="text"
                      value={image.caption || ''}
                      onChange={(e) => {
                        const newImages = [...content.images];
                        newImages[index] = { ...newImages[index], caption: e.target.value };
                        setContent(prev => ({ ...prev, images: newImages }));
                      }}
                      className="w-full px-3 py-1 border rounded-md text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = content.images.filter((_: any, i: number) => i !== index);
                      setContent(prev => ({ ...prev, images: newImages }));
                    }}
                    className="mt-2 text-xs text-red-600 hover:text-red-800"
                  >
                    Remove Image
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newImages = [...(content.images || []), { src: '', alt: '', caption: '' }];
                  setContent(prev => ({ ...prev, images: newImages }));
                }}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                + Add Image
              </button>
            </div>
          </div>
        );
        
      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
              <input
                type="text"
                name="title"
                value={content.title || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input
                type="text"
                name="buttonText"
                value={content.buttonText || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        );
        
      default:
        return <div>No editor available for this component type</div>;
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h3 className="text-lg font-medium mb-4">Edit {componentType}</h3>
      {renderEditorForm()}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ContentEditor;
