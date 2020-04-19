import { EntertainerProfile, Event, Rating, Review, User } from '../models';
import { validString } from '../utils';

const ReviewController = {
  /**
   * create and update Review
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateUserReview(req, res) {
    const { entertainerId, eventId, ratingId, title, content, id } = req.body;

    const error = {
      ...validString(title),
      ...validString(content),
    };

    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    let newReview = {};
    if (!id) {
      return Review.create({
        entertainerId,
        eventId,
        ratingId,
        title,
        content,
        userId: req.user.id,
      })
        .then((review) => {
          newReview = review;
          return req.user.addReview(review);
        })
        .then(() => {
          return res.status(200).json({
            message: 'Review created successfully',
            review: newReview,
          });
        })
        .catch((error) => {
          const status = error.status || 500;
          const errorMessage =
            (error.parent && error.parent.detail) || error.message || error;
          return res.status(status).json({ message: errorMessage });
        });
    }
    return req.user
      .getReviews({ where: { id } })
      .then((reviews) => {
        if (reviews && reviews.length > 0) {
          return reviews[0].update({
            entertainerId,
            ratingId,
            title,
            content,
          });
        }
        throw `No review with id ${id}`;
      })
      .then((review) => {
        return res.status(200).json({
          message: 'Review updated successfully',
          review,
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * get User Reviews
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserReviews(req, res) {
    req.user
      .getReviews({
        include: [
          {
            model: Rating,
            as: 'rating',
          },
          {
            model: Event,
            as: 'reviewedEvent',
          },
          {
            model: User,
            as: 'reviewer',
            attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
          },
          {
            model: EntertainerProfile,
            as: 'entertainerDetail',
            attributes: ['id', 'slug'],
            include: [
              {
                model: User,
                as: 'personalDetails',
                attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
              },
            ],
          },
        ],
      })
      .then((reviews) => {
        if (!reviews || reviews.length === 0) {
          return res.status(404).json({ message: 'Review not found' });
        }
        return res.status(200).json({ reviews });
      });
  },

  /**
   * get one Review details
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getOneReview(req, res) {
    const reviewId = req.params.id;
    if (!reviewId) {
      return res.status(400).json({ message: 'Kindly provide a review id' });
    }
    Review.findOne({
      where: { id: reviewId },
      include: [
        {
          model: Rating,
          as: 'rating',
        },
        {
          model: Event,
          as: 'reviewedEvent',
        },
        {
          model: User,
          as: 'reviewer',
          attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
        },
        {
          model: EntertainerProfile,
          as: 'entertainerDetail',
          attributes: ['id', 'slug'],
          include: [
            {
              model: User,
              as: 'personalDetails',
              attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
            },
          ],
        },
      ],
    })
      .then((review) => {
        if (!review) {
          return res.status(404).json({ message: 'Review not found' });
        }

        return res.json({ review });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  },

  /**
   * get one Review details
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEntertainerReviews(req, res) {
    const userId = req.user.id;
    EntertainerProfile.findOne({
      where: {
        userId,
      },
    })
      .then((entertainer) => {
        Review.findAll({
          where: {
            entertainerId: entertainer.id,
          },
          include: [
            {
              model: Rating,
              as: 'rating',
            },
            {
              model: Event,
              as: 'reviewedEvent',
            },
            {
              model: User,
              as: 'reviewer',
              attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
            },
          ],
        })
          .then((reviews) => {
            if (!reviews) {
              return res.status(404).json({ message: 'Review not found' });
            }
            return res.status(200).json({ reviews });
          })
          .catch((error) => {
            const errorMessage = error.message || error;
            return res.status(412).json({ message: errorMessage });
          });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * get One Entertainer Review
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getOneEntertainerReview(req, res) {
    const userId = req.user.id;
    const id = req.params.id;
    EntertainerProfile.findOne({
      where: {
        userId,
      },
    })
      .then((entertainer) => {
        Review.findOne({
          where: {
            id,
            entertainerId: entertainer.id,
          },
          include: [
            {
              model: Rating,
              as: 'rating',
            },
            {
              model: Event,
              as: 'reviewedEvent',
            },
            {
              model: User,
              as: 'reviewer',
              attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
            },
          ],
        })
          .then((reviews) => {
            if (!reviews) {
              return res.status(404).json({ message: 'Review not found' });
            }
            return res.status(200).json({ reviews });
          })
          .catch((error) => {
            const errorMessage = error.message || error;
            return res.status(412).json({ message: errorMessage });
          });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },
};

export default ReviewController;
