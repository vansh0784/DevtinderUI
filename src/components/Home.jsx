import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  useSelector} from 'react-redux'

const Home = () => {
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center py-16 sm:py-20 bg-white rounded-lg w-full max-w-5xl mt-8 shadow-sm">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          {userData ? `Welcome back, ${userData.firstName}!` : 'DevTinder: Connect, Chat, Code'}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Spark connections with developers worldwide! DevTinder lets you meet techies, chat about code, and collaborate on projects.
        </p>
        <button
          onClick={() => navigate(userData ? '/feed' : '/signup')}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          {userData ? 'Find Matches' : 'Get Started'}
        </button>
      </section>

      {/* About Section */}
      <section className="py-16 w-full max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          What’s DevTinder?
        </h2>
        <p className="text-base sm:text-lg text-gray-600 text-center max-w-3xl mx-auto">
          DevTinder is the ultimate platform for developers to network, share ideas, and find collaborators. Whether you’re coding for fun or building the next big thing, connect with devs who get you.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 w-full max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-10">
          Why DevTinder?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-500 mb-3">Connect Developers</h3>
            <p className="text-gray-600">
              Instantly chat with developers worldwide about your favorite tech stacks, projects, or ideas.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-500 mb-3">Find Collaborators</h3>
            <p className="text-gray-600">
              Discover developers whose skills match your project needs, from hackathons to startups.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-500 mb-3">Premium CodeEditor</h3>
            <p className="text-gray-600">
              Upgrade to our real-time CodeEditor to code live with your matches and build projects together.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white rounded-lg w-full max-w-5xl text-center mb-8 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Ready to Meet Your Dev Match?
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto mb-6">
          Join DevTinder to connect with the tech community, chat, and code like never before.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default Home;