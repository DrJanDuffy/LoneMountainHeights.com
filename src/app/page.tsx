import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lone Mountain Homes - Discover Your Dream Home',
  description: 'Explore premium properties in the Lone Mountain area. Find your perfect home with our curated selection of luxury real estate.',
  keywords: 'Lone Mountain Homes, real estate, luxury properties, dream home, premium listings',
  openGraph: {
    title: 'Lone Mountain Homes - Discover Your Dream Home',
    description: 'Explore premium properties in the Lone Mountain area.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Lone Mountain Homes
          </h1>
          <p className="text-xl mb-8">
            Discover Your Dream Home
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg">
              Search Homes
            </button>
            <button className="border-2 border-white text-white px-6 py-2 rounded-lg">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* RealScout Widget Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our curated selection of premium properties in the Lone Mountain area
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <realscout-office-listings 
                agent-encoded-id="QWdlbnQtMjI1MDUw" 
                sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
                listing-status="For Sale" 
                property-types="SFR,MF,TC" 
                price-min="600000" 
                price-max="1200000"
              ></realscout-office-listings>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
