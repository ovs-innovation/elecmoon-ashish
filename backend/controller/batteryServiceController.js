const BatteryServiceRequest = require('../models/BatteryServiceRequest');

// Create a new battery service request (public)
exports.createRequest = async (req, res) => {
  try {
    const request = new BatteryServiceRequest(req.body);
    await request.save();
    res.status(201).json({ success: true, request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all battery service requests (admin)
exports.getAllRequests = async (req, res) => {
  try {
    const {
      name, email, phone, status, serviceType, batteryType,
      startDate, endDate, page = 1, limit = 10,
    } = req.query;

    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (email) query.email = { $regex: email, $options: 'i' };
    if (phone) query.phone = { $regex: phone, $options: 'i' };
    if (status) query.status = status;
    if (serviceType) query.serviceType = serviceType;
    if (batteryType) query.batteryType = batteryType;
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
    const requests = await BatteryServiceRequest.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalDoc = await BatteryServiceRequest.countDocuments(query);
    res.status(200).json({ success: true, requests, totalDoc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single request by ID (admin)
exports.getRequestById = async (req, res) => {
  try {
    const request = await BatteryServiceRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.status(200).json({ success: true, request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a request status (admin)
exports.updateRequest = async (req, res) => {
  try {
    const request = await BatteryServiceRequest.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.status(200).json({ success: true, request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a request (admin)
exports.deleteRequest = async (req, res) => {
  try {
    const request = await BatteryServiceRequest.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.status(200).json({ success: true, message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Dashboard stats (admin)
exports.getDashboardStats = async (req, res) => {
  try {
    const total = await BatteryServiceRequest.countDocuments();
    const pending = await BatteryServiceRequest.countDocuments({ status: 'pending' });
    const inProgress = await BatteryServiceRequest.countDocuments({ status: 'in_progress' });
    const completed = await BatteryServiceRequest.countDocuments({ status: 'completed' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await BatteryServiceRequest.countDocuments({ createdAt: { $gte: today } });

    res.status(200).json({ success: true, total, pending, inProgress, completed, todayCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
