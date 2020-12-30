const express = require('express');
const quoteController = require('./../controllers/quoteController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    // authController.protect, 
    // authController.restrictTo('admin', 'lead-guide'), 
    quoteController.getAllQuote
  )
  .post(
    // authController.protect,
    // authController.restrictTo('admin', 'lead-guide'),
    quoteController.createQuote
  );

  router
    .route('/checkphone/:id')
    .get(quoteController.checkPhone);

  router
  .route('/:id')
  .get(quoteController.getQuote)
  .patch(quoteController.updateQuote);

  module.exports = router;