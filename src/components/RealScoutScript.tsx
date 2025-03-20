'use client';

import Script from 'next/script';

export function RealScoutScript() {
  return (
    <>
      <Script 
        src="https://em.realscout.com/widgets/realscout-web-components.umd.js" 
        strategy="afterInteractive"
        onReady={() => {
          if (window.RealScoutWebComponents) {
            window.RealScoutWebComponents.initialize();
          }
        }}
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