const Service = require("../models/Service");

const addService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(200).send({
      message: "Service Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({}).sort({ _id: -1 });
    res.send(services);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingServices = async (req, res) => {
  try {
    const services = await Service.find({ status: "show" }).sort({ _id: -1 });
    res.send(services);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.send(service);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return res.status(404).send({ message: "Service not found" });
    }
    res.send(service);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      service.name = { ...service.name, ...req.body.name };
      service.description = { ...service.description, ...req.body.description };
      service.icon = req.body.icon;
      service.status = req.body.status;
      service.group = req.body.group;
      service.slug = req.body.slug;

      await service.save();
      res.send({ message: "Service Updated Successfully!" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const newStatus = req.body.status;
    await Service.updateOne(
      { _id: req.params.id },
      { $set: { status: newStatus } }
    );
    res.status(200).send({
      message: `Service ${newStatus === "show" ? "Published" : "Un-Published"} Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    await Service.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: "Service Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addService,
  getAllServices,
  getShowingServices,
  getServiceById,
  getServiceBySlug,
  updateService,
  updateStatus,
  deleteService,
};
