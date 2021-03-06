import { GalleryController } from '../controllers';
import Authentication from '../middleware/authentication';

const galleryRoutes = router => {
  router.get(
    '/api/v1/gallery/:userId',
    GalleryController.getEntertainerGallery
  );
  router.post(
    '/api/v1/gallery/save',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    GalleryController.uploadImage,
    GalleryController.saveImage
  );
  router.put(
    '/api/v1/gallery/set-as-profile',
    Authentication.verifyToken,
    GalleryController.setAsProfileImage
  );
  router.put('/api/v1/gallery/:approve/:id', GalleryController.approveImage); //TODO: add administrator middleware
  router.delete('/api/v1/gallery/delete/:id', GalleryController.deleteImage);
};

export default galleryRoutes;
