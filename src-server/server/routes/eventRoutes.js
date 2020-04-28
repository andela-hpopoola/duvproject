import { EventController } from '../controllers';
import Authentication from '../middleware/authentication';

const eventRoutes = (router) => {
  router
    .route('/api/v1/events')
    .all(Authentication.verifyToken, Authentication.isActiveUser)
    .post(EventController.updateUserEvent)
    .put(EventController.updateUserEvent)
    .get(EventController.getUserEvent);

  router.get(
    '/api/v1/events/entertainers',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    EventController.getEntertainerEvents
  );

  router.get('/api/v1/events/:id', EventController.getOneEvent);

  // Auctions
  router.get(
    '/api/v1/auctions',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    EventController.getUserAuctions
  );

  // Requests
  router.get(
    '/api/v1/user/requests',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    EventController.getUserRequests
  );

  router.get(
    '/api/v1/available-auctions',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    EventController.getAvailableAuctions
  );

  // Bids
  router.get(
    '/api/v1/auctions/bids/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    EventController.getEventBids
  );

  // Event Reviews
  router.get(
    '/api/v1/user/reviews/pending',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    EventController.getOnePendingEventReview
  );

  router.get(
    '/api/v1/user/reviews/all',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    EventController.getAllEventsReview
  );
};

export default eventRoutes;