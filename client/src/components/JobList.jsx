import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    skills: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get('/api/jobs', {
          params: filters
        });
        setJobs(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="text-center py-8">Loading jobs...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <h1 className="text-2xl font-bold text-gray-800">Available Jobs</h1>
        <div className="flex gap-2">
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="text"
            name="skills"
            value={filters.skills}
            onChange={handleFilterChange}
            placeholder="Filter by skills"
            className="px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map(job => (
          <div key={job._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-800">
                  <Link to={`/jobs/${job._id}`} className="hover:text-blue-600">
                    {job.title}
                  </Link>
                </h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  ${job.budget}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{job.description.substring(0, 100)}...</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.skillsRequired.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Posted by: {job.client?.username || 'Unknown'}
                </span>
                <span className={`text-sm px-2 py-1 rounded ${
                  job.status === 'open' ? 'bg-green-100 text-green-800' :
                  job.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {job.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;