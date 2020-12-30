const express = require('express');
const accessoriesController = require('./../controllers/accessoriesController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect, 
    accessoriesController.getAllAccessories
  )
  .post(
    authController.protect, 
    authController.restrictTo('admin', 'lead-guide'),
    accessoriesController.createAccessories
  );

  router
  .route('/:id')
  .get(
    authController.protect,
    accessoriesController.getAccessories
  )
  .patch(
    authController.protect, 
    authController.restrictTo('admin', 'lead-guide'),
    accessoriesController.updateAccessories
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    accessoriesController.deleteAccessories
  );

module.exports = router;
