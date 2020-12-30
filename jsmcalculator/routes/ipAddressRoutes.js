const express = require('express');
const ipAddressController = require('./../controllers/ipAddressController');
const router = express.Router();

router
  .route('/')
  .get(ipAddressController.getAllIpAddress)
  .post(ipAddressController.createIpAddress);

router
    .route('/ipPermision')
    .post(ipAddressController.ipPermision);
 
router
    .route('/register')
    .post(ipAddressController.register)
router
  .route('/:id')
  .get(ipAddressController.getIpAddress)
  .patch(ipAddressController.updateIpAddress)
  .delete(
    ipAddressController.deleteIpAddress
  );

module.exports = router; 

