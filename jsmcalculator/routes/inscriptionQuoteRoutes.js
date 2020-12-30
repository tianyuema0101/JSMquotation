const express = require('express');
const inscriptionQuoteController = require('./../controllers/inscriptionQuoteController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    // authController.protect, 
    // authController.restrictTo('admin', 'lead-guide'), 
    inscriptionQuoteController.getAllInscriptionQuote
  )
  .post(
    // authController.protect,
    // authController.restrictTo('admin', 'lead-guide'),
    inscriptionQuoteController.createInscriptionQuote
  );

  router
    .route('/checkphone/:id')
    .get(inscriptionQuoteController.checkPhone);

  router
  .route('/:id')
  .get(inscriptionQuoteController.getInscriptionQuote)
  .patch(inscriptionQuoteController.updateInscriptionQuote);

  module.exports = router;