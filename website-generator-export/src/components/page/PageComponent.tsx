import React from 'react';

interface ComponentProps {
  type: string;
  content: any;
  style?: React.CSSProperties;
  className?: string;
}

const PageComponent: React.FC<ComponentProps> = ({ type, content, style, className }) => {
  // Render different components based on type
  switch (type) {
    case 'header':
      return (
        <header className={`w-full py-4 ${className || ''}`} style={style}>
          <h1 className="text-3xl font-bold">{content.title}</h1>
          {content.subtitle && <p className="text-xl">{content.subtitle}</p>}
        </header>
      );
    
    case 'paragraph':
      return (
        <div className={`my-4 ${className || ''}`} style={style}>
          <p>{content.text}</p>
        </div>
      );
    
    case 'image':
      return (
        <div className={`my-4 ${className || ''}`} style={style}>
          <img 
            src={content.src} 
            alt={content.alt || ''} 
            className="max-w-full h-auto"
          />
          {content.caption && <p className="text-sm text-gray-600 mt-1">{content.caption}</p>}
        </div>
      );
    
    case 'button':
      return (
        <div className={`my-4 ${className || ''}`} style={style}>
          <button 
            className={`px-4 py-2 rounded ${content.primary ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => console.log('Button clicked:', content.text)}
          >
            {content.text}
          </button>
        </div>
      );
    
    case 'hero':
      return (
        <div 
          className={`w-full bg-cover bg-center py-20 ${className || ''}`} 
          style={{ 
            backgroundImage: `url(${content.backgroundImage})`,
            ...style 
          }}
        >
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            {content.subtitle && <p className="text-xl mb-6">{content.subtitle}</p>}
            {content.buttonText && (
              <button className="px-6 py-2 bg-blue-500 text-white rounded">
                {content.buttonText}
              </button>
            )}
          </div>
        </div>
      );
    
    case 'gallery':
      return (
        <div className={`my-8 ${className || ''}`} style={style}>
          {content.title && <h2 className="text-2xl font-bold mb-4">{content.title}</h2>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.images.map((image: any, index: number) => (
              <div key={index} className="overflow-hidden rounded">
                <img 
                  src={image.src} 
                  alt={image.alt || ''} 
                  className="w-full h-48 object-cover"
                />
                {image.caption && <p className="text-sm p-2">{image.caption}</p>}
              </div>
            ))}
          </div>
        </div>
      );
    
    case 'contact':
      return (
        <div className={`my-8 ${className || ''}`} style={style}>
          <h2 className="text-2xl font-bold mb-4">{content.title || 'Contact Us'}</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input type="email" className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block mb-1">Message</label>
              <textarea className="w-full px-3 py-2 border rounded" rows={4}></textarea>
            </div>
            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded">
              {content.buttonText || 'Send Message'}
            </button>
          </form>
        </div>
      );
      
    default:
      return <div>Unknown component type: {type}</div>;
  }
};

export default PageComponent;
