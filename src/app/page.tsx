import RealScoutWidget from '@/components/RealScoutWidget';
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
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <main id="main-content" role="main" aria-label="Lone Mountain Homes main content">
        {/* Hero Section */}
        <section 
          className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800"
          aria-labelledby="hero-heading"
        >
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 
              id="hero-heading"
              className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
            >
              Welcome to Lone Mountain Homes
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover Your Dream Home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                aria-label="Search available homes"
              >
                Search Homes
              </button>
              <button 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                aria-label="Contact us for more information"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* RealScout Office Listings Section */}
        <section 
          className="py-16 bg-gray-50"
          aria-labelledby="properties-heading"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 
                id="properties-heading"
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Featured Properties
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Explore our curated selection of premium properties in the Lone Mountain area
              </p>
            </div>
            
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <RealScoutWidget
                  agentEncodedId="QWdlbnQtMjI1MDUw"
                  sortOrder="STATUS_AND_SIGNIFICANT_CHANGE"
                  listingStatus="For Sale"
                  propertyTypes="SFR,MF,TC"
                  priceMin="600000"
                  priceMax="1200000"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
