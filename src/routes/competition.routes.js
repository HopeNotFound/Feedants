const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competition.controller');

// Get current competition details
router.get('/current', competitionController.getCurrentCompetition);

// Get competition by ID
router.get('/:id', competitionController.getCompetitionById);

// Register user for competition (atomic concurrency-safe)
router.post('/:competitionId/register', competitionController.registerUser);

// Check registration status
router.get('/:competitionId/registration-status', competitionController.checkRegistrationStatus);

// Cancel registration (for testing)
router.post('/:competitionId/cancel-registration', competitionController.cancelRegistration);

// Reset spots (for testing)
router.post('/reset-spots', competitionController.resetSpots);

// Submit entry
router.post('/:competitionId/submit', competitionController.submitEntry);

// Get submission
router.get('/:competitionId/submission', competitionController.getSubmission);

module.exports = router;
