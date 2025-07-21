'use client';

import { useEffect, useRef } from 'react';

export default function RealScoutWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;

    const tryLoadWidget = () => {
      attempts++;
      console.log(`Attempt ${attempts} to load RealScout widget`);

      if (!containerRef.current) return;

      // Check if the custom element exists
      if (typeof customElements !== 'undefined' && customElements.get('realscout-office-listings')) {
        console.log('RealScout script loaded, creating widget');
        
        // Create the widget element with minimal configuration
        const widget = document.createElement('realscout-office-listings');
        widget.setAttribute('agent-encoded-id', 'QWdlbnQtMjI1MDUw');
        
        // Remove restrictive filters that might cause "No listings available"
        // widget.setAttribute('sort-order', 'STATUS_AND_SIGNIFICANT_CHANGE');
        // widget.setAttribute('listing-status', 'For Sale');
        // widget.setAttribute('property-types', 'SFR,MF,TC');
        // widget.setAttribute('price-min', '600000');
        // widget.setAttribute('price-max', '1200000');

        // Clear container and add widget
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(widget);
        
        console.log('RealScout widget created successfully');
      } else if (attempts < maxAttempts) {
        console.log('RealScout script not ready, retrying...');
        setTimeout(tryLoadWidget, 1000);
      } else {
        console.error('Failed to load RealScout widget after', maxAttempts, 'attempts');
        if (containerRef.current) {
          containerRef.current.innerHTML = '<div class="p-8 text-center text-gray-500">Unable to load property listings. Please refresh the page.</div>';
        }
      }
    };

    // Start trying to load the widget
    tryLoadWidget();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-[480px] bg-white rounded-lg"
      style={{ 
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        minHeight: '480px'
      }}
    />
  );
} 