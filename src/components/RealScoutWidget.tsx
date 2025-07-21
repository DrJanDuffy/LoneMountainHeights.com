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
        console.log('Starting to load RealScout widget...');
        
        // Wait for the script to be available
        let attempts = 0;
        while (!customElements.get('realscout-office-listings') && attempts < 10) {
          console.log(`Waiting for RealScout script... (attempt ${attempts + 1})`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          attempts++;
        }

        if (!customElements.get('realscout-office-listings')) {
          console.log('Loading RealScout script manually...');
          
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
          
          console.log('Widget element created and appended');
          setIsLoading(false);
          
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
          <p className="text-sm text-gray-400 mt-2">Please wait while we load the latest properties</p>
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