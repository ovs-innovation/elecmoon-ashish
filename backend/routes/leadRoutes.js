const express = require('express');
const router = express.Router();
const leadController = require('../controller/leadController');

// Create a new lead
router.post('/', leadController.createLead);

// Get all leads
router.get('/', leadController.getLeads);

// Dashboard routes (should be before /:id route)
router.get('/dashboard/count', leadController.getDashboardCount);
router.get('/dashboard/recent', leadController.getDashboardRecentLeads);
router.get('/dashboard/data', leadController.getDashboardLeadData);

// Get user leads
router.get('/user/:userId', leadController.getUserLeads);

// Get a single lead by ID
router.get('/:id', leadController.getLeadById);

// Update a lead
router.put('/:id', leadController.updateLead);

// Delete a lead
router.delete('/:id', leadController.deleteLead);

module.exports = router; 