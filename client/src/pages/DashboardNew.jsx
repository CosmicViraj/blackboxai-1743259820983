import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Link } from 'react-router-dom';

const DashboardNew = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    jobs: 0,
    proposals: 0,
    earnings: 0,
    messages: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, jobsRes] = await Promise.all([
          api.get(`/dashboard/stats`),
          api.get(`/dashboard/recent-jobs`)
        ]);
        setStats(statsRes.data);
        setRecentJobs(jobsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome back, {user?.username}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            {user?.role === 'freelancer' ? 'Jobs Applied' : 'Jobs Posted'}
          </h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats.jobs}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            {user?.role === 'freelancer' ? 'Active Proposals' : 'Received Proposals'}
          </h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats.proposals}
          </p>
        </div>
        {user?.role === 'freelancer' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Earnings</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              ${stats.earnings}
            </p>
          </div>
        )}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Unread Messages</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats.messages}
          </p>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              {user?.role === 'freelancer' ? 'Recent Job Opportunities' : 'Your Recent Jobs'}
            </h2>
            <Link 
              to="/jobs" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentJobs.length > 0 ? (
            recentJobs.map(job => (
              <div key={job._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      <Link to={`/jobs/${job._id}`} className="hover:text-blue-600">
                        {job.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mt-1 line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      ${job.budget}
                    </span>
                    <span className={`mt-2 text-xs px-2 py-1 rounded-full ${
                      job.status === 'open' ? 'bg-green-100 text-green-800' :
                      job.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No recent jobs found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNew;