const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/auth');
const Job = require('../models/Job.model');
const Proposal = require('../models/Proposal.model');
const Message = require('../models/Message.model');

// Get dashboard stats
router.get('/stats', checkAuth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const role = req.user.role;

    let stats = {
      jobs: 0,
      proposals: 0,
      earnings: 0,
      messages: 0
    };

    if (role === 'freelancer') {
      // Freelancer stats
      const [jobsCount, proposalsCount, earnings, messagesCount] = await Promise.all([
        Job.countDocuments({ 'proposals.freelancer': userId }),
        Proposal.countDocuments({ freelancer: userId, status: { $in: ['pending', 'accepted'] } }),
        Proposal.aggregate([
          { $match: { freelancer: userId, status: 'accepted' } },
          { $group: { _id: null, total: { $sum: '$bidAmount' } } }
        ]),
        Message.countDocuments({ receiver: userId, isRead: false })
      ]);

      stats.jobs = jobsCount;
      stats.proposals = proposalsCount;
      stats.earnings = earnings[0]?.total || 0;
      stats.messages = messagesCount;
    } else {
      // Client stats
      const [jobsCount, proposalsCount, messagesCount] = await Promise.all([
        Job.countDocuments({ client: userId }),
        Proposal.countDocuments({ job: { $in: await Job.find({ client: userId }).distinct('_id') } }),
        Message.countDocuments({ receiver: userId, isRead: false })
      ]);

      stats.jobs = jobsCount;
      stats.proposals = proposalsCount;
      stats.messages = messagesCount;
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get dashboard stats', error: error.message });
  }
});

// Get recent jobs for dashboard
router.get('/recent-jobs', checkAuth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const role = req.user.role;

    let jobs;
    if (role === 'freelancer') {
      // Get recent open jobs
      jobs = await Job.find({ status: 'open' })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('client', 'username');
    } else {
      // Get client's recent jobs
      jobs = await Job.find({ client: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('proposals.freelancer', 'username');
    }

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get recent jobs', error: error.message });
  }
});

module.exports = router;