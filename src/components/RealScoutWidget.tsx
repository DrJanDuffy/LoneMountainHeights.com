'use client';

import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const loadWidget = async () => {
      try {
        // Check if the script is already loaded
        if (!customElements.get('realscout-office-listings')) {
          // Load the RealScout script
          const script = document.createElement('script');
          script.src = 'https://em.realscout.com/widgets/realscout-web-components.umd.js';
          script.type = 'module';
          document.head.appendChild(script);

          // Wait for the script to load and custom element to be registered
          await new Promise((resolve) => {
            script.onload = resolve;
            script.onerror = () => {
              console.error('Failed to load RealScout script');
              resolve(null);
            };
          });

          // Wait a bit more for the custom element to be registered
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Create the widget element
        if (widgetRef.current && customElements.get('realscout-office-listings')) {
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
        }
      } catch (error) {
        console.error('Error loading RealScout widget:', error);
        if (widgetRef.current) {
          widgetRef.current.innerHTML = '<div class="text-center py-8 text-gray-500">Loading property listings...</div>';
        }
      }
    };

    loadWidget();
  }, [agentEncodedId, sortOrder, listingStatus, propertyTypes, priceMin, priceMax]);

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