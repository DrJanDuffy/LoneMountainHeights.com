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

  useEffect(() => {
    const loadWidget = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        console.log('Loading RealScout widget with params:', {
          agentEncodedId,
          sortOrder,
          listingStatus,
          propertyTypes,
          priceMin,
          priceMax
        });

        // Check if the script is already loaded
        if (!customElements.get('realscout-office-listings')) {
          console.log('RealScout script not loaded, loading now...');
          
          // Load the RealScout script
          const script = document.createElement('script');
          script.src = 'https://em.realscout.com/widgets/realscout-web-components.umd.js';
          script.type = 'module';
          document.head.appendChild(script);

          // Wait for the script to load and custom element to be registered
          await new Promise((resolve) => {
            script.onload = () => {
              console.log('RealScout script loaded successfully');
              resolve(null);
            };
            script.onerror = () => {
              console.error('Failed to load RealScout script');
              setHasError(true);
              resolve(null);
            };
          });

          // Wait a bit more for the custom element to be registered
          await new Promise(resolve => setTimeout(resolve, 2000));
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
          
          // Add event listeners for debugging
          widget.addEventListener('load', () => {
            console.log('RealScout widget loaded successfully');
            setIsLoading(false);
          });
          
          widget.addEventListener('error', (e) => {
            console.error('RealScout widget error:', e);
            setHasError(true);
            setIsLoading(false);
          });
          
          // Clear the container and append the widget
          widgetRef.current.innerHTML = '';
          widgetRef.current.appendChild(widget);
          
          // Set a timeout to check if widget loaded
          setTimeout(() => {
            if (widgetRef.current?.querySelector('realscout-office-listings')) {
              const widgetElement = widgetRef.current.querySelector('realscout-office-listings');
              if (widgetElement && widgetElement.innerHTML.includes('No listings available')) {
                console.log('Widget loaded but no listings available');
                setHasError(true);
              }
            }
            setIsLoading(false);
          }, 5000);
          
        } else {
          console.error('RealScout custom element not available');
          setHasError(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading RealScout widget:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadWidget();
  }, [agentEncodedId, sortOrder, listingStatus, propertyTypes, priceMin, priceMax]);

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