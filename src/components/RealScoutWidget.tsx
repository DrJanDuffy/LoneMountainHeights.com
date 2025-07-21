'use client';

import { useEffect, useRef, useState } from 'react';

export default function RealScoutWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWidget = async () => {
      if (!widgetRef.current) return;

      try {
        // Wait for the script to load
        let attempts = 0;
        const maxAttempts = 20;

        const waitForScript = () => {
          return new Promise((resolve, reject) => {
            const checkScript = () => {
              attempts++;
              console.log(`Checking for RealScout script... attempt ${attempts}`);
              
              if (customElements.get('realscout-office-listings')) {
                console.log('RealScout script loaded successfully!');
                resolve(true);
              } else if (attempts >= maxAttempts) {
                reject(new Error('RealScout script failed to load'));
              } else {
                setTimeout(checkScript, 1000);
              }
            };
            checkScript();
          });
        };

        await waitForScript();

        // Create the widget
        console.log('Creating RealScout widget...');
        const widget = document.createElement('realscout-office-listings');
        widget.setAttribute('agent-encoded-id', 'QWdlbnQtMjI1MDUw');
        widget.setAttribute('sort-order', 'STATUS_AND_SIGNIFICANT_CHANGE');
        widget.setAttribute('listing-status', 'For Sale');
        widget.setAttribute('property-types', 'SFR,MF,TC');
        widget.setAttribute('price-min', '600000');
        widget.setAttribute('price-max', '1200000');
        
        // Clear and append
        widgetRef.current.innerHTML = '';
        widgetRef.current.appendChild(widget);
        
        setIsLoading(false);
        console.log('RealScout widget created successfully!');

      } catch (err) {
        console.error('Error loading RealScout widget:', err);
        setError('Failed to load property listings. Please try again.');
        setIsLoading(false);
      }
    };

    loadWidget();
  }, []);

  if (error) {
    return (
      <div className="w-full min-h-[480px] bg-white rounded-lg flex items-center justify-center border-2 border-red-200">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              setIsLoading(true);
              if (widgetRef.current) {
                widgetRef.current.innerHTML = '';
              }
              // Reload the widget
              const loadWidget = async () => {
                if (!widgetRef.current) return;
                try {
                  const widget = document.createElement('realscout-office-listings');
                  widget.setAttribute('agent-encoded-id', 'QWdlbnQtMjI1MDUw');
                  widget.setAttribute('sort-order', 'STATUS_AND_SIGNIFICANT_CHANGE');
                  widget.setAttribute('listing-status', 'For Sale');
                  widget.setAttribute('property-types', 'SFR,MF,TC');
                  widget.setAttribute('price-min', '600000');
                  widget.setAttribute('price-max', '1200000');
                  
                  widgetRef.current.innerHTML = '';
                  widgetRef.current.appendChild(widget);
                  setIsLoading(false);
                } catch (err) {
                  setError('Retry failed. Please refresh the page.');
                  setIsLoading(false);
                }
              };
              loadWidget();
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
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
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