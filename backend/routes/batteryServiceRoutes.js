const express = require('express');
const router = express.Router();
const ctrl = require('../controller/batteryServiceController');

// Public: Submit a battery service request
router.post('/', ctrl.createRequest);

// Admin: Dashboard stats
router.get('/dashboard/stats', ctrl.getDashboardStats);

// Admin: Get all requests
router.get('/', ctrl.getAllRequests);

// Admin: Get single request
router.get('/:id', ctrl.getRequestById);

// Admin: Update request (status etc.)
router.put('/:id', ctrl.updateRequest);

// Admin: Delete request
router.delete('/:id', ctrl.deleteRequest);

module.exports = router;
