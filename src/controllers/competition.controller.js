const CompetitionService = require('../services/competition.service');

exports.getCurrentCompetition = async (req, res) => {
  try {
    const competition = await CompetitionService.getCurrentCompetition();
    res.json({
      success: true,
      data: competition
    });
  } catch (error) {
    console.error('Error in getCurrentCompetition:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCompetitionById = async (req, res) => {
  try {
    const competition = await CompetitionService.getCompetitionById(req.params.id);
    if (!competition) {
      return res.status(404).json({ success: false, message: 'Competition not found' });
    }
    res.json({
      success: true,
      data: competition
    });
  } catch (error) {
    console.error('Error in getCompetitionById:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { competitionId } = req.params;
    const { userId = 'user_1', userName = 'Dance Participant', userEmail = 'participant@feedants.com' } = req.body;

    const result = await CompetitionService.registerUser({
      competitionId,
      userId,
      userName,
      userEmail
    });

    res.json(result);
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Registration failed'
    });
  }
};

exports.checkRegistrationStatus = async (req, res) => {
  try {
    const { competitionId } = req.params;
    const userId = req.query.userId || req.headers['x-user-id'] || 'user_1';

    const result = await CompetitionService.checkRegistration(competitionId, userId);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error in checkRegistrationStatus:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const { competitionId } = req.params;
    const { userId = 'user_1' } = req.body;

    const result = await CompetitionService.cancelRegistration(competitionId, userId);
    res.json(result);
  } catch (error) {
    console.error('Error in cancelRegistration:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.resetSpots = async (req, res) => {
  try {
    const result = await CompetitionService.resetSpots();
    res.json(result);
  } catch (error) {
    console.error('Error in resetSpots:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.submitEntry = async (req, res) => {
  try {
    const { competitionId } = req.params;
    const { userId = 'user_1', title, danceStyle, videoUrl, notes } = req.body;

    if (!title || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title and videoUrl are required for submission'
      });
    }

    const submission = await CompetitionService.createSubmission({
      competitionId,
      userId,
      title,
      danceStyle,
      videoUrl,
      notes
    });

    res.json({
      success: true,
      message: 'Submission uploaded successfully!',
      data: submission
    });
  } catch (error) {
    console.error('Error in submitEntry:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSubmission = async (req, res) => {
  try {
    const { competitionId } = req.params;
    const userId = req.query.userId || req.headers['x-user-id'] || 'user_1';

    const submission = await CompetitionService.getSubmission(competitionId, userId);
    res.json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Error in getSubmission:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
