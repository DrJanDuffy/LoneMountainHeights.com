'use client';

import { useEffect, useState } from "react";
import { initializeWidgets } from "@/config/widgets";
import { initGA, pageview } from "@/utils/analytics";
import { TrackedWidget } from "@/components/TrackedWidget";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  const [widgetsLoaded, setWidgetsLoaded] = useState(false);

  useEffect(() => {
    // Initialize analytics
    if (typeof window !== 'undefined') {
      initGA();
      pageview(window.location.pathname);

      // Initialize widgets
      initializeWidgets();
      const timer = setTimeout(() => setWidgetsLoaded(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="min-h-screen">
      {/* RealScout Simple Search */}
      <div className="w-full max-w-3xl mx-auto pt-8 px-4">
        <realscout-simple-search></realscout-simple-search>
      </div>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 z-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to Lone Mountain Homes
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover Your Dream Home with Powerful Market Insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Search Homes
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Market Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Market Analysis Tools Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Powerful Market Analysis Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TrackedWidget
              id="homebot-widget"
              name="Homebot"
              title="Home Valuation"
              isLoaded={widgetsLoaded}
            />
            <TrackedWidget
              id="cloudcma-widget"
              name="CloudCMA"
              title="Market Analysis"
              isLoaded={widgetsLoaded}
            />
            <TrackedWidget
              id="realscout-widget"
              name="RealScout"
              title="Smart Property Search"
              isLoaded={widgetsLoaded}
            />
          </div>
        </div>
      </section>

      {/* Buyer Journey Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Your Home Buying Journey
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover</h3>
              <p className="text-gray-600">
                Use our advanced search tools to find properties that match your criteria
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyze</h3>
              <p className="text-gray-600">
                Get detailed market analysis and property insights
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Work with our experts to make your dream home a reality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Analysis Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Neighborhood Analysis
          </h2>
          <div className="w-full max-w-2xl mx-auto">
            <TrackedWidget
              id="percy-hvs-widget"
              name="Percy.ai"
              title="Neighborhood Insights"
              isLoaded={widgetsLoaded}
              className="bg-transparent"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl mb-8">
            Get started with our powerful market analysis tools today
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
