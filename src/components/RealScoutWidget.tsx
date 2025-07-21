'use client';

import { useEffect, useRef } from 'react';

export default function RealScoutWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadWidget = () => {
      if (!containerRef.current) return;

      // Check if the custom element is available
      if (customElements.get('realscout-office-listings')) {
        // Create the widget
        const widget = document.createElement('realscout-office-listings');
        widget.setAttribute('agent-encoded-id', 'QWdlbnQtMjI1MDUw');
        widget.setAttribute('sort-order', 'STATUS_AND_SIGNIFICANT_CHANGE');
        widget.setAttribute('listing-status', 'For Sale');
        widget.setAttribute('property-types', 'SFR,MF,TC');
        widget.setAttribute('price-min', '600000');
        widget.setAttribute('price-max', '1200000');

        // Clear container and add widget
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(widget);
      } else {
        // Retry after a short delay
        setTimeout(loadWidget, 500);
      }
    };

    // Start loading
    loadWidget();
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