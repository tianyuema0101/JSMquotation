const express = require('express');
const installationController = require('./../controllers/InstallationController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(authController.protect,  installationController.getAllInstallation)
    .post(authController.protect, authController.restrictTo('admin', 'lead-guide'),installationController.createInstallation);

router
  .route('/:id')
  .get(authController.protect, authController.restrictTo('admin', 'lead-guide'), installationController.getInstallation)
  .patch(authController.protect, authController.restrictTo('admin', 'lead-guide'),installationController.updateInstallation)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    installationController.deleteInstallation
  );

module.exports = router;
