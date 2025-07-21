'use client';

import { useEffect, useRef, useState } from 'react';

interface RealScoutWidgetProps {
  agentEncodedId: string;
  sortOrder: string;
  listingStatus: string;
  propertyTypes: string;
  priceMin: string;
  priceMax: string;
}

export default function RealScoutWidget({
  agentEncodedId,
  sortOrder,
  listingStatus,
  propertyTypes,
  priceMin,
  priceMax
}: RealScoutWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadWidget = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        setRetryCount(prev => prev + 1);
        
        console.log(`Loading RealScout widget (attempt ${retryCount + 1}) with params:`, {
          agentEncodedId,
          sortOrder,
          listingStatus,
          propertyTypes,
          priceMin,
          priceMax
        });

        // Wait for the script to be available
        let scriptLoaded = false;
        let scriptAttempts = 0;
        
        while (!scriptLoaded && scriptAttempts < 10) {
          if (customElements.get('realscout-office-listings')) {
            scriptLoaded = true;
            console.log('RealScout script already loaded');
          } else {
            console.log(`Waiting for RealScout script... (attempt ${scriptAttempts + 1})`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            scriptAttempts++;
          }
        }

        if (!scriptLoaded) {
          console.log('RealScout script not found, loading manually...');
          
          // Load the RealScout script
          const script = document.createElement('script');
          script.src = 'https://em.realscout.com/widgets/realscout-web-components.umd.js';
          script.type = 'module';
          document.head.appendChild(script);

          // Wait for the script to load
          await new Promise((resolve) => {
            script.onload = () => {
              console.log('RealScout script loaded successfully');
              resolve(null);
            };
            script.onerror = () => {
              console.error('Failed to load RealScout script');
              resolve(null);
            };
          });

          // Wait for the custom element to be registered
          await new Promise(resolve => setTimeout(resolve, 3000));
        }

        // Create the widget element
        if (widgetRef.current && customElements.get('realscout-office-listings')) {
          console.log('Creating RealScout widget element...');
          
          const widget = document.createElement('realscout-office-listings');
          widget.setAttribute('agent-encoded-id', agentEncodedId);
          widget.setAttribute('sort-order', sortOrder);
          widget.setAttribute('listing-status', listingStatus);
          widget.setAttribute('property-types', propertyTypes);
          widget.setAttribute('price-min', priceMin);
          widget.setAttribute('price-max', priceMax);
          
          // Clear the container and append the widget
          widgetRef.current.innerHTML = '';
          widgetRef.current.appendChild(widget);
          
          // Give the widget more time to load
          setTimeout(() => {
            if (widgetRef.current?.querySelector('realscout-office-listings')) {
              const widgetElement = widgetRef.current.querySelector('realscout-office-listings');
              if (widgetElement) {
                console.log('Widget element created successfully');
                setIsLoading(false);
                
                // Check for content after a longer delay
                setTimeout(() => {
                  if (widgetElement.innerHTML.includes('No listings available') && retryCount < 3) {
                    console.log('No listings available, retrying...');
                    loadWidget(); // Retry
                  }
                }, 8000);
              }
            } else {
              console.error('Widget element not found');
              if (retryCount < 3) {
                console.log('Retrying widget creation...');
                loadWidget(); // Retry
              } else {
                setHasError(true);
                setIsLoading(false);
              }
            }
          }, 3000);
          
        } else {
          console.error('RealScout custom element not available');
          if (retryCount < 3) {
            console.log('Retrying...');
            setTimeout(() => loadWidget(), 2000);
          } else {
            setHasError(true);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error loading RealScout widget:', error);
        if (retryCount < 3) {
          console.log('Retrying due to error...');
          setTimeout(() => loadWidget(), 2000);
        } else {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    loadWidget();
  }, [agentEncodedId, sortOrder, listingStatus, propertyTypes, priceMin, priceMax, retryCount]);

  if (isLoading) {
    return (
      <div 
        className="w-full min-h-[480px] bg-white rounded-lg flex items-center justify-center"
        style={{ 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          zIndex: 1000
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property listings...</p>
          <p className="text-sm text-gray-400 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div 
        className="w-full min-h-[480px] bg-white rounded-lg flex items-center justify-center"
        style={{ 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          zIndex: 1000
        }}
      >
        <div className="text-center p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Property Listings</h3>
          <p className="text-gray-600 mb-4">
            We're currently updating our property listings. Please check back soon or contact us directly.
          </p>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => window.location.href = 'mailto:info@lonemountainhomes.com'}
          >
            Contact Us
          </button>
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