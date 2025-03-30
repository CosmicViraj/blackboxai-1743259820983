import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proposal, setProposal] = useState({
    coverLetter: '',
    bidAmount: '',
    estimatedTime: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`/api/jobs/${id}`);
        setJob(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch job details');
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProposal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`/api/jobs/${id}/proposals`, proposal);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit proposal');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading job details...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!job) return <div className="text-center py-8">Job not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                ${job.budget}
              </span>
              <span className={`px-2 py-1 rounded text-sm ${
                job.status === 'open' ? 'bg-green-100 text-green-800' :
                job.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {job.status}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800">Description</h2>
            <p className="mt-2 text-gray-600 whitespace-pre-line">{job.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">Skills Required</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.skillsRequired.map(skill => (
                <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">Client Information</h2>
            <div className="mt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                {job.client?.username?.charAt(0).toUpperCase() || 'C'}
              </div>
              <div>
                <p className="font-medium">{job.client?.username || 'Unknown'}</p>
                <p className="text-sm text-gray-500">Posted {new Date(job.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {user?.role === 'freelancer' && job.status === 'open' && (
          <div className="border-t p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Submit Proposal</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={proposal.coverLetter}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="mt-1 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bid Amount ($)</label>
                    <input
                      type="number"
                      name="bidAmount"
                      value={proposal.bidAmount}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="mt-1 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estimated Time</label>
                    <input
                      type="text"
                      name="estimatedTime"
                      value={proposal.estimatedTime}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. 2 weeks"
                      className="mt-1 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {submitting ? 'Submitting...' : 'Submit Proposal'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;