'use client';

import { useEffect, useRef, useState } from 'react';

export default function RealScoutWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [widgetCreated, setWidgetCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 30; // 30 seconds max

    const createWidget = () => {
      if (!widgetRef.current) return;

      try {
        // Check if the custom element is available
        if (customElements.get('realscout-office-listings')) {
          console.log('RealScout script loaded, creating widget...');
          
          // Only create if not already created
          if (!widgetCreated) {
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
            
            // Monitor widget for removal
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
                  console.log('Widget was removed, recreating...');
                  setWidgetCreated(false);
                  setIsLoading(true);
                  setTimeout(createWidget, 1000);
                }
              });
            });
            
            observer.observe(widgetRef.current, { childList: true });
            
            return () => observer.disconnect();
          }
        } else {
          retryCount++;
          console.log(`RealScout script not loaded yet, retry ${retryCount}/${maxRetries}...`);
          
          if (retryCount < maxRetries) {
            // Retry after a short delay
            setTimeout(createWidget, 1000);
          } else {
            console.error('Max retries reached, showing error');
            setError('Failed to load RealScout widget after 30 seconds');
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error creating RealScout widget:', error);
        setError('Error creating widget');
        setIsLoading(false);
      }
    };

    // Start the widget creation process
    createWidget();

    // Set a timeout to ensure we don't wait forever
    const timeout = setTimeout(() => {
      if (isLoading && !widgetCreated) {
        console.log('Widget creation timeout, showing fallback');
        setError('Widget loading timeout');
        setIsLoading(false);
      }
    }, 35000); // 35 seconds

    return () => clearTimeout(timeout);
  }, [widgetCreated, isLoading]);

  // Keep widget visible even after loading
  useEffect(() => {
    if (widgetRef.current && widgetCreated) {
      // Ensure the container stays visible
      widgetRef.current.style.display = 'block';
      widgetRef.current.style.minHeight = '480px';
      widgetRef.current.style.width = '100%';
    }
  }, [widgetCreated]);

  if (error) {
    return (
      <div className="w-full min-h-[480px] bg-white rounded-lg flex items-center justify-center border-2 border-red-200">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load property listings</p>
          <button 
            onClick={() => {
              setError(null);
              setIsLoading(true);
              setWidgetCreated(false);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full min-h-[480px] bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
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
      className="widget-container w-full min-h-[480px] bg-white rounded-lg border-2 border-gray-200"
      style={{ 
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        zIndex: 1000,
        display: 'block',
        minHeight: '480px',
        width: '100%'
      }}
    />
  );
} 