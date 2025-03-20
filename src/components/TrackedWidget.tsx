import React, { useEffect, useState } from 'react';
import { trackWidgetInteraction } from '@/utils/analytics';
import { WidgetLoader } from './WidgetLoader';

interface TrackedWidgetProps {
  id: string;
  name: string;
  title: string;
  isLoaded: boolean;
  className?: string;
}

export const TrackedWidget: React.FC<TrackedWidgetProps> = ({
  id,
  name,
  title,
  isLoaded,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const widget = document.getElementById(id);
    if (widget && isLoaded) {
      try {
        // Initialize widget-specific elements
        switch (name) {
          case 'RealScout':
            widget.innerHTML = '<div class="realscout-search"></div>';
            break;
          case 'Homebot':
            widget.innerHTML = '<div class="homebot-valuation"></div>';
            break;
          case 'CloudCMA':
            widget.innerHTML = '<div class="cloudcma-widget"></div>';
            break;
          case 'Percy.ai':
            widget.innerHTML = '<div class="hvs-widget"></div>';
            break;
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                trackWidgetInteraction(name, 'Viewed');
                observer.disconnect();
              }
            });
          },
          { threshold: 0.5 }
        );

        observer.observe(widget);

        // Track interactions
        const handleClick = () => trackWidgetInteraction(name, 'Clicked');
        widget.addEventListener('click', handleClick);

        return () => {
          observer.disconnect();
          widget.removeEventListener('click', handleClick);
        };
      } catch (error) {
        console.error(`Error initializing ${name} widget:`, error);
        setHasError(true);
      }
    }
  }, [id, name, isLoaded]);

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {!isLoaded ? (
        <WidgetLoader title={`Loading ${title}...`} />
      ) : hasError ? (
        <div className="text-red-500 text-center py-8">
          Unable to load {title}. Please try again later.
        </div>
      ) : (
        <div id={id} className="min-h-[400px] w-full"></div>
      )}
    </div>
  );
}; 