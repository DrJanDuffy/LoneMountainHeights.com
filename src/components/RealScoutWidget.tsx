'use client';

import { useEffect, useState } from 'react';

// TypeScript declaration for the custom element
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-encoded-id': string;
        'sort-order'?: string;
        'listing-status'?: string;
        'property-types'?: string;
        'price-min'?: string;
        'price-max'?: string;
      };
    }
  }
}

export default function RealScoutWidget() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Give the widget time to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-[480px] bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading RealScout properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[480px] bg-white rounded-lg">
      <realscout-office-listings 
        agent-encoded-id="QWdlbnQtMjI1MDUw" 
        sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
        listing-status="For Sale" 
        property-types="SFR,MF,TC" 
        price-min="600000" 
        price-max="1200000"
      />
    </div>
  );
} 