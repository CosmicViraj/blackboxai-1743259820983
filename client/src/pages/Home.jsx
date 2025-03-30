import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Find the perfect freelancer for your project
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
          Connect with skilled professionals ready to bring your ideas to life.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/register"
            className="btn-primary inline-flex items-center px-6 py-3 text-base font-medium"
          >
            Get Started
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/login"
            className="btn-secondary inline-flex items-center px-6 py-3 text-base font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Featured categories/services will go here */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900">Web Development</h3>
          <p className="mt-2 text-gray-600">
            Build your website with expert developers.
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900">Graphic Design</h3>
          <p className="mt-2 text-gray-600">
            Stunning visuals for your brand.
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900">Digital Marketing</h3>
          <p className="mt-2 text-gray-600">
            Grow your business online.
          </p>
        </div>
      </div>
    </div>
  );
}