import React from 'react';

const Jobs = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      {children}
    </div>
  );
};

export default Jobs;