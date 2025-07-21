'use client';

import { useEffect, useRef, useState } from 'react';

export default function RealScoutWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading for demo purposes since we don't have real API keys
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <div class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div class="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span class="text-blue-600 font-medium">Property Image</span>
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">$750,000</h3>
                <p class="text-gray-600 text-sm mb-2">3 bed • 2 bath • 1,850 sq ft</p>
                <p class="text-gray-500 text-sm">123 Mountain View Dr, Las Vegas, NV</p>
              </div>
            </div>
            <div class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div class="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <span class="text-green-600 font-medium">Property Image</span>
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">$925,000</h3>
                <p class="text-gray-600 text-sm mb-2">4 bed • 3 bath • 2,400 sq ft</p>
                <p class="text-gray-500 text-sm">456 Desert Ridge Ave, Las Vegas, NV</p>
              </div>
            </div>
            <div class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div class="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <span class="text-purple-600 font-medium">Property Image</span>
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">$1,150,000</h3>
                <p class="text-gray-600 text-sm mb-2">5 bed • 4 bath • 3,200 sq ft</p>
                <p class="text-gray-500 text-sm">789 Summit Peak Ln, Las Vegas, NV</p>
              </div>
            </div>
          </div>
        `;
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-[480px] bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading featured properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[480px] bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Unable to load property listings</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-[480px] bg-white rounded-lg"
    />
  );
} 