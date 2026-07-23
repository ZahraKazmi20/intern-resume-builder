const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// ✅ CREATE - Save new resume
router.post('/create', async (req, res) => {
  try {
    const resume = new Resume(req.body);
    const savedResume = await resume.save();
    res.status(201).json({
      message: '✅ Resume saved successfully',
      resumeId: savedResume._id,
      data: savedResume
    });
  } catch (error) {
    res.status(400).json({
      error: '❌ Error saving resume',
      message: error.message
    });
  }
});

// ✅ READ - Get all resumes (paginated)
router.get('/all', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const resumes = await Resume.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Resume.countDocuments();

    res.json({
      message: '✅ Resumes fetched',
      total,
      page,
      pages: Math.ceil(total / limit),
      data: resumes
    });
  } catch (error) {
    res.status(500).json({
      error: '❌ Error fetching resumes',
      message: error.message
    });
  }
});

// ✅ READ - Get single resume by ID
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ error: '❌ Resume not found' });
    }

    // Increment view count
    resume.viewCount += 1;
    await resume.save();

    res.json({
      message: '✅ Resume fetched',
      data: resume
    });
  } catch (error) {
    res.status(500).json({
      error: '❌ Error fetching resume',
      message: error.message
    });
  }
});

// ✅ UPDATE - Update resume
router.put('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({ error: '❌ Resume not found' });
    }

    res.json({
      message: '✅ Resume updated successfully',
      data: resume
    });
  } catch (error) {
    res.status(400).json({
      error: '❌ Error updating resume',
      message: error.message
    });
  }
});

// ✅ DELETE - Delete resume
router.delete('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);

    if (!resume) {
      return res.status(404).json({ error: '❌ Resume not found' });
    }

    res.json({
      message: '✅ Resume deleted successfully',
      data: resume
    });
  } catch (error) {
    res.status(500).json({
      error: '❌ Error deleting resume',
      message: error.message
    });
  }
});

// ✅ SEARCH - Search resumes by name or email
router.get('/search/:query', async (req, res) => {
  try {
    const resumes = await Resume.find({
      $or: [
        { 'personalInfo.fullName': { $regex: req.params.query, $options: 'i' } },
        { 'personalInfo.email': { $regex: req.params.query, $options: 'i' } }
      ]
    });

    res.json({
      message: '✅ Search completed',
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    res.status(500).json({
      error: '❌ Error searching resumes',
      message: error.message
    });
  }
});

module.exports = router;
