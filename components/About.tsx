// components/About.tsx
import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About GNSS Catalog Search</h2>
          <p className="text-xl text-gray-600">Efficient and accurate GNSS data search at your fingertips</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Point Search</h3>
            <p className="text-gray-600">
              Search for GNSS data using specific coordinates. Perfect for precise location-based data retrieval and analysis.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Region Search</h3>
            <p className="text-gray-600">
              Access GNSS data for entire regions. Ideal for large-scale projects and regional analysis with spatial mapping capabilities.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Efficient Processing</h3>
            <p className="text-gray-600">
              Advanced algorithms to quickly search through thousands of compressed files, providing fast and accurate results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;