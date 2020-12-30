const express = require('express');
const monumentController = require('./../controllers/monumentController');
const authController = require('./../controllers/authController');
const materialDiscountController = require('./../controllers/materialDiscountController');

const router = express.Router();

router
  .route('/')
  .get(monumentController.getAllMonument)
  .post(monumentController.createMonument);

router
  .route('/:id')
  .get(monumentController.getMonument)
  .patch(monumentController.updateMonument)
  .delete(
    monumentController.deleteMonument
  );

router.route('/many').post(monumentController.createManyMonument)
router.route('/discount/:id').get(materialDiscountController.getMaterialDiscount)
  .patch(materialDiscountController.updateMaterialDiscount)

module.exports = router;
