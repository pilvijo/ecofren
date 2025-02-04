import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 via-blue-500 to-indigo-600 py-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <img
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt="Ecofren Logo"
              className="h-10 w-auto"
            />
            <span className="text-white text-2xl font-bold">Ecofren</span>
          </div>
          <nav className="space-x-6">
            <Link to="/" className="text-white hover:underline">
              Home
            </Link>
            <Link to="/about" className="text-white hover:underline">
              About
            </Link>
            <Link to="/features" className="text-white hover:underline">
              Features
            </Link>
            <Link to="/contact" className="text-white hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative bg-gradient-to-br from-green-200 to-blue-200 py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-green-900">
              Welcome to Ecofren
            </h1>
            <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto">
              Shape your future by playing an eco-conscious game powered by Web3.
              Make sustainable choices in real life and see them come alive in a vibrant, interactive world.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to="/signup"
                className="px-8 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-500 transition"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-green-800">
              Explore the World of Ecofren
            </h2>
            <p className="mt-4 text-center text-gray-600 max-w-3xl mx-auto">
              Ecofren is more than just a game—it’s a movement. Engage in real-life eco-friendly challenges, customize your avatar, and experience a world where every sustainable choice has a meaningful impact.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-green-700">
                  Real-World Impact
                </h3>
                <p className="mt-2 text-gray-600">
                  See how your everyday eco-friendly actions propel your in-game progress.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-green-700">
                  Customizable Avatars
                </h3>
                <p className="mt-2 text-gray-600">
                  Create a unique character that evolves with your sustainable lifestyle.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-green-700">
                  Interactive Missions
                </h3>
                <p className="mt-2 text-gray-600">
                  Engage in challenges across diverse zones—from Innovation Hubs to Eco Bazaars—that reward sustainable actions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 bg-gradient-to-br from-blue-100 to-green-100">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-green-800">
              Join the Ecofren Movement
            </h2>
            <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
              Be part of a revolutionary game that turns sustainable living into an immersive and rewarding experience.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/signup"
                className="px-8 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-500 transition"
              >
                Sign Up Today
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-600 py-6">
        <div className="container mx-auto px-6 text-center text-white">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Ecofren. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
