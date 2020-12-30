const express = require('express');
const foundationController = require('./../controllers/foundationController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect, 
    authController.restrictTo('admin', 'lead-guide'), 
    foundationController.getAllFoundation
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    foundationController.createFoundation
  );

  router
  .route('/:id')
  .get(
    authController.protect, 
    foundationController.getFoundation
  )
  .patch(
    authController.protect, 
    authController.restrictTo('admin', 'lead-guide'),
    foundationController.updateFoundation
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    foundationController.deleteFoundation
  );

module.exports = router;
