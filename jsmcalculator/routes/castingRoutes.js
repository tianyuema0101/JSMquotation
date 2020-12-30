const express = require('express');
const castingController = require('./../controllers/CastingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(authController.protect,  castingController.getAllCasting)
    .post(authController.protect, authController.restrictTo('admin', 'lead-guide'),castingController.createCasting);

router
  .route('/:id')
  .get(authController.protect, authController.restrictTo('admin', 'lead-guide'), castingController.getCasting)
  .patch(authController.protect, authController.restrictTo('admin', 'lead-guide'),castingController.updateCasting)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    castingController.deleteCasting
  );

module.exports = router;
