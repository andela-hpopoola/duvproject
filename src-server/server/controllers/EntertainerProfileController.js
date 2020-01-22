import { updateUser } from '../utils';

const EntertainerProfileController = {
  updateUserAndEntertainerProfile(req, res) {
    const {
      about,
      location,
      stageName,
      yearStarted,
      willingToTravel,
      eventType,
      entertainerType,
      youTubeChannel
    } = req.body;
    const entertainerProfileData = {
      about,
      location,
      stageName,
      yearStarted,
      willingToTravel,
      eventType,
      entertainerType,
      youTubeChannel
    };

    updateUser(req.user, entertainerProfileData, 'Profile')
      .then(entertainerProfile => {
        return res
          .status(200)
          .json({message: 'User profile update is succesful',  entertainerProfile,  });
      })
      .catch(error => {
        return res.status(error.status || 400).json({ message: error.message});
      });
  }
};

export default EntertainerProfileController;