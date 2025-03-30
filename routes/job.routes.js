const express = require('express');
const router = express.Router();
const Job = require('../models/Job.model');
const { checkAuth, checkRole } = require('../middleware/auth');

// Create new job
router.post('/', checkAuth, checkRole('client'), async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      client: req.user.userId
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: 'Job creation failed', error: error.message });
  }
});

// Get all jobs
router.get('/', checkAuth, async (req, res) => {
  try {
    const { status, skills } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (skills) filter.skillsRequired = { $in: skills.split(',') };

    const jobs = await Job.find(filter)
      .populate('client', 'username profile')
      .sort({ createdAt: -1 });
      
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
});

// Get single job
router.get('/:id', checkAuth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('client', 'username profile')
      .populate('proposals.freelancer', 'username profile');
      
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch job', error: error.message });
  }
});

// Update job
router.put('/:id', checkAuth, checkRole('client'), async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, client: req.user.userId },
      req.body,
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: 'Job update failed', error: error.message });
  }
});

// Delete job
router.delete('/:id', checkAuth, checkRole('client'), async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      client: req.user.userId
    });
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Job deletion failed', error: error.message });
  }
});

module.exports = router;