const Lead = require('../models/Lead');

// Create a new lead
exports.createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({ success: true, lead });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a single lead by ID
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.status(200).json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get leads by user ID
exports.getUserLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all leads with filtering and pagination
exports.getLeads = async (req, res) => {
  try {
    const { name, email, phone, status, startDate, endDate, page = 1, limit = 10 } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };
    if (phone) query.phone = { $regex: phone, $options: "i" };
    if (status) query.status = status;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1);
        query.createdAt.$lte = end;
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const totalDoc = await Lead.countDocuments(query);

    res.status(200).json({ success: true, leads, totalDoc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single lead by ID
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.status(200).json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a lead
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.status(200).json({ success: true, lead });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a lead
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.status(200).json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get dashboard lead count statistics
exports.getDashboardCount = async (req, res) => {
  try {
    const totalDoc = await Lead.countDocuments();

    // Total pending leads count
    const totalPendingLeads = await Lead.countDocuments({ status: 'pending' });

    // Total contacted leads count
    const totalContactedLeads = await Lead.countDocuments({ status: 'contacted' });

    // Total in progress leads count
    const totalInProgressLeads = await Lead.countDocuments({ status: 'in_progress' });

    // Total completed leads count
    const totalCompletedLeads = await Lead.countDocuments({ status: 'completed' });

    // Total cancelled leads count
    const totalCancelledLeads = await Lead.countDocuments({ status: 'cancelled' });

    // Today's leads count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayLeadsCount = await Lead.countDocuments({
      createdAt: { $gte: today }
    });

    // This month's leads count
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setHours(0, 0, 0, 0);
    const thisMonthLeadsCount = await Lead.countDocuments({
      createdAt: { $gte: currentMonthStart }
    });

    res.status(200).json({
      totalLeads: totalDoc,
      totalPendingLeads,
      totalContactedLeads,
      totalInProgressLeads,
      totalCompletedLeads,
      totalCancelledLeads,
      todayLeadsCount,
      thisMonthLeadsCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get dashboard recent leads
exports.getDashboardRecentLeads = async (req, res) => {
  try {
    const { page = 1, limit = 8 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const totalDoc = await Lead.countDocuments();

    const leads = await Lead.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('name email phone status product createdAt');

    res.status(200).json({
      success: true,
      leads,
      totalLeads: totalDoc,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get dashboard lead data (for charts and analytics)
exports.getDashboardLeadData = async (req, res) => {
  try {
    // Get leads data from last 7 days
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Get all leads data for the last 7 days
    const recentLeads = await Lead.find({
      createdAt: { $gte: weekAgo }
    }).select('createdAt status');

    // Leads data grouped by date
    const leadsByDate = {};
    recentLeads.forEach(lead => {
      const date = lead.createdAt.toISOString().split('T')[0];
      if (!leadsByDate[date]) {
        leadsByDate[date] = { date, count: 0 };
      }
      leadsByDate[date].count += 1;
    });

    // Today's leads
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayLeads = await Lead.countDocuments({
      createdAt: { $gte: today }
    });

    // Yesterday's leads
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const yesterdayEnd = new Date(yesterday);
    yesterdayEnd.setHours(23, 59, 59, 999);
    const yesterdayLeads = await Lead.countDocuments({
      createdAt: { $gte: yesterday, $lte: yesterdayEnd }
    });

    // This month's leads
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setHours(0, 0, 0, 0);
    const thisMonthLeads = await Lead.countDocuments({
      createdAt: { $gte: currentMonthStart }
    });

    // Last month's leads
    const lastMonthStart = new Date(currentMonthStart);
    lastMonthStart.setMonth(currentMonthStart.getMonth() - 1);
    const lastMonthEnd = new Date(currentMonthStart);
    lastMonthEnd.setDate(0);
    lastMonthEnd.setHours(23, 59, 59, 999);
    const lastMonthLeads = await Lead.countDocuments({
      createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd }
    });

    // All time leads
    const allTimeLeads = await Lead.countDocuments();

    // Leads by status for pie chart
    const leadsByStatus = await Lead.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      todayLeads,
      yesterdayLeads,
      thisMonthLeads,
      lastMonthLeads,
      allTimeLeads,
      leadsByDate: Object.values(leadsByDate),
      leadsByStatus,
      leadsData: recentLeads,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};