export default function Home() {
  return (
    <main>
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
    </main>
  );
}
