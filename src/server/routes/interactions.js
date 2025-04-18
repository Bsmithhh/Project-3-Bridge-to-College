const express = require('express');
const router = express.Router();
const Interaction = require('../models/Interaction');
const College = require('../models/College');

// Get all flagged interactions with college data
router.get('/flagged', async (req, res) => {
  try {
    const interactions = await Interaction.find({ flags: { $exists: true, $ne: [] } })
      .sort({ timestamp: -1 });
    
    // Enrich with college data
    const enrichedInteractions = await Promise.all(interactions.map(async (interaction) => {
      const college = await College.findOne({ name: interaction.collegeName });
      return {
        ...interaction.toObject(),
        collegeData: college
      };
    }));
    
    res.json(enrichedInteractions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get override statistics
router.get('/override-stats', async (req, res) => {
  try {
    const stats = await Interaction.aggregate([
      { $match: { flags: 'calculus_override' } },
      { $group: {
        _id: '$collegeName',
        total: { $sum: 1 },
        successful: { $sum: { 
          $cond: [{ $gte: ['$fitScores.academic', 3] }, 1, 0] 
        }}
      }}
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update interaction status and notes
router.patch('/:id', async (req, res) => {
  try {
    const interaction = await Interaction.findById(req.params.id);
    if (req.body.status) {
      interaction.status = req.body.status;
    }
    if (req.body.reviewNotes) {
      interaction.reviewNotes = req.body.reviewNotes;
    }
    const updatedInteraction = await interaction.save();
    res.json(updatedInteraction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 