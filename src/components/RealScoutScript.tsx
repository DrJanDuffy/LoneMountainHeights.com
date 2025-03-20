'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export function RealScoutScript() {
  useEffect(() => {
    const initializeRealScout = () => {
      if (window.RealScoutWebComponents) {
        window.RealScoutWebComponents.initialize();
      }
    };

    window.addEventListener('load', initializeRealScout);
    return () => window.removeEventListener('load', initializeRealScout);
  }, []);

  return (
    <>
      <Script 
        src="https://em.realscout.com/widgets/realscout-web-components.umd.js" 
        strategy="beforeInteractive"
      />
      <style jsx global>{`
        realscout-simple-search {
          --rs-ss-font-primary-color: #6a6d72;
          --rs-ss-searchbar-border-color: hsl(0, 0%, 80%);
          --rs-ss-box-shadow: 0 10px 15px -3px #0000001a;
          --rs-ss-widget-width: 500px !important;
        }
      `}</style>
    </>
  );
} 