'use client';

import { useEffect, useRef, useState } from 'react';

export default function RealScoutWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [widgetCreated, setWidgetCreated] = useState(false);

  useEffect(() => {
    const createWidget = () => {
      if (!widgetRef.current || widgetCreated) return;

      try {
        // Check if the custom element is available
        if (customElements.get('realscout-office-listings')) {
          console.log('RealScout script loaded, creating widget...');
          
          // Create the widget element
          const widget = document.createElement('realscout-office-listings');
          widget.setAttribute('agent-encoded-id', 'QWdlbnQtMjI1MDUw');
          widget.setAttribute('sort-order', 'STATUS_AND_SIGNIFICANT_CHANGE');
          widget.setAttribute('listing-status', 'For Sale');
          widget.setAttribute('property-types', 'SFR,MF,TC');
          widget.setAttribute('price-min', '600000');
          widget.setAttribute('price-max', '1200000');
          
          // Clear container and append widget
          widgetRef.current.innerHTML = '';
          widgetRef.current.appendChild(widget);
          
          setWidgetCreated(true);
          setIsLoading(false);
          
          console.log('RealScout widget created successfully');
        } else {
          console.log('RealScout script not loaded yet, waiting...');
          // Retry after a short delay
          setTimeout(createWidget, 1000);
        }
      } catch (error) {
        console.error('Error creating RealScout widget:', error);
        setIsLoading(false);
      }
    };

    // Start the widget creation process
    createWidget();

    // Set a timeout to ensure we don't wait forever
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.log('Widget creation timeout, showing fallback');
        setIsLoading(false);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [widgetCreated, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full min-h-[480px] bg-white rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={widgetRef}
      className="w-full min-h-[480px] bg-white rounded-lg"
      style={{ 
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        zIndex: 1000
      }}
    />
  );
} 