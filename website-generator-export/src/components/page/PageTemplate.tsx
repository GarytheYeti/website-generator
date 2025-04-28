import React from 'react';
import PageComponent from './PageComponent';

interface PageTemplateProps {
  layout: string;
  theme: string;
  components: {
    type: string;
    content: any;
    position: string;
    style?: React.CSSProperties;
    className?: string;
  }[];
}

const PageTemplate: React.FC<PageTemplateProps> = ({ layout, theme, components }) => {
  // Apply theme styles based on the selected theme
  const themeStyles = {
    'modern-business': {
      fontFamily: 'Arial, sans-serif',
      primaryColor: '#3b82f6', // blue-500
      secondaryColor: '#1e3a8a', // blue-900
      backgroundColor: '#ffffff',
      textColor: '#333333',
    },
    'creative-portfolio': {
      fontFamily: 'Georgia, serif',
      primaryColor: '#8b5cf6', // violet-500
      secondaryColor: '#4c1d95', // violet-900
      backgroundColor: '#f9fafb',
      textColor: '#1f2937',
    },
    'e-commerce-store': {
      fontFamily: 'Helvetica, sans-serif',
      primaryColor: '#10b981', // emerald-500
      secondaryColor: '#064e3b', // emerald-900
      backgroundColor: '#ffffff',
      textColor: '#111827',
    }
  };

  // Layout templates
  const layouts = {
    'single-column': (
      <div className="min-h-screen" style={{ 
        fontFamily: themeStyles[theme as keyof typeof themeStyles]?.fontFamily,
        backgroundColor: themeStyles[theme as keyof typeof themeStyles]?.backgroundColor,
        color: themeStyles[theme as keyof typeof themeStyles]?.textColor,
      }}>
        <div className="container mx-auto px-4 py-8">
          {components
            .sort((a, b) => {
              const positions = { header: 1, hero: 2, content: 3, footer: 4 };
              return positions[a.position as keyof typeof positions] - positions[b.position as keyof typeof positions];
            })
            .map((component, index) => (
              <PageComponent
                key={index}
                type={component.type}
                content={component.content}
                style={component.style}
                className={component.className}
              />
            ))}
        </div>
      </div>
    ),
    'two-column': (
      <div className="min-h-screen" style={{ 
        fontFamily: themeStyles[theme as keyof typeof themeStyles]?.fontFamily,
        backgroundColor: themeStyles[theme as keyof typeof themeStyles]?.backgroundColor,
        color: themeStyles[theme as keyof typeof themeStyles]?.textColor,
      }}>
        <div className="container mx-auto px-4 py-8">
          {/* Header Components */}
          {components
            .filter(comp => comp.position === 'header')
            .map((component, index) => (
              <PageComponent
                key={`header-${index}`}
                type={component.type}
                content={component.content}
                style={component.style}
                className={component.className}
              />
            ))}
          
          {/* Hero Components */}
          {components
            .filter(comp => comp.position === 'hero')
            .map((component, index) => (
              <PageComponent
                key={`hero-${index}`}
                type={component.type}
                content={component.content}
                style={component.style}
                className={component.className}
              />
            ))}
          
          <div className="flex flex-col md:flex-row mt-8">
            {/* Main Content */}
            <div className="md:w-2/3 md:pr-8">
              {components
                .filter(comp => comp.position === 'main')
                .map((component, index) => (
                  <PageComponent
                    key={`main-${index}`}
                    type={component.type}
                    content={component.content}
                    style={component.style}
                    className={component.className}
                  />
                ))}
            </div>
            
            {/* Sidebar */}
            <div className="md:w-1/3 mt-8 md:mt-0">
              {components
                .filter(comp => comp.position === 'sidebar')
                .map((component, index) => (
                  <PageComponent
                    key={`sidebar-${index}`}
                    type={component.type}
                    content={component.content}
                    style={component.style}
                    className={component.className}
                  />
                ))}
            </div>
          </div>
          
          {/* Footer Components */}
          {components
            .filter(comp => comp.position === 'footer')
            .map((component, index) => (
              <PageComponent
                key={`footer-${index}`}
                type={component.type}
                content={component.content}
                style={component.style}
                className={component.className}
              />
            ))}
        </div>
      </div>
    ),
    'hero-banner': (
      <div className="min-h-screen" style={{ 
        fontFamily: themeStyles[theme as keyof typeof themeStyles]?.fontFamily,
        backgroundColor: themeStyles[theme as keyof typeof themeStyles]?.backgroundColor,
        color: themeStyles[theme as keyof typeof themeStyles]?.textColor,
      }}>
        {/* Hero Banner */}
        {components
          .filter(comp => comp.position === 'hero')
          .map((component, index) => (
            <PageComponent
              key={`hero-${index}`}
              type={component.type}
              content={component.content}
              style={component.style}
              className={`w-full ${component.className || ''}`}
            />
          ))}
        
        <div className="container mx-auto px-4 py-8">
          {/* Header Components */}
          {components
            .filter(comp => comp.position === 'header')
            .map((component, index) => (
              <PageComponent
                key={`header-${index}`}
                type={component.type}
                content={component.content}
                style={component.style}
                className={component.className}
              />
            ))}
          
          {/* Content Components */}
          {components
            .filter(comp => comp.position === 'content')
            .map((component, index) => (
              <PageComponent
                key={`content-${index}`}
                type={component.type}
                content={component.content}
                style={component.style}
                className={component.className}
              />
            ))}
          
          {/* Footer Components */}
          {components
            .filter(comp => comp.position === 'footer')
            .map((component, index) => (
              <PageComponent
                key={`footer-${index}`}
                type={component.type}
                content={component.content}
                style={component.style}
                className={component.className}
              />
            ))}
        </div>
      </div>
    )
  };

  return layouts[layout as keyof typeof layouts] || layouts['single-column'];
};

export default PageTemplate;
