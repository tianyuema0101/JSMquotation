const express = require('express');
const inscriptionController = require('./../controllers/additionalInscriptionModelController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect, 
    authController.restrictTo('admin', 'lead-guide'), 
    inscriptionController.getAllInscription
  )
  .post(
    authController.protect, 
    authController.restrictTo('admin', 'lead-guide'),
    inscriptionController.createInscription
  );

  router
  .route('/:id')
  .get(
    authController.protect, 
    inscriptionController.getInscription
  )
  .patch(
    authController.protect, 
    authController.restrictTo('admin', 'lead-guide'),
    inscriptionController.updateInscription
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    inscriptionController.deleteInscription
  );

module.exports = router;
