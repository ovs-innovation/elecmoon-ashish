const ShortVideo = require("../models/ShortVideo");

const addShortVideo = async (req, res) => {
  try {
    const newShortVideo = new ShortVideo(req.body);
    await newShortVideo.save();
    res.send({ message: "Short Video Added Successfully!", shortVideo: newShortVideo });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllShortVideos = async (req, res) => {
  try {
    const shortVideos = await ShortVideo.find().populate('product').sort({ order: 1, createdAt: -1 });
    res.send(shortVideos);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingShortVideos = async (req, res) => {
  try {
    const shortVideos = await ShortVideo.find({ status: "show" }).populate('product').sort({ order: 1, createdAt: -1 });
    res.send(shortVideos);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShortVideoById = async (req, res) => {
  try {
    const shortVideo = await ShortVideo.findById(req.params.id).populate('product');
    if (!shortVideo) {
      return res.status(404).send({
        message: "Short Video not found",
      });
    }
    res.send(shortVideo);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateShortVideo = async (req, res) => {
  try {
    const shortVideo = await ShortVideo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!shortVideo) {
      return res.status(404).send({
        message: "Short Video not found",
      });
    }
    res.send({
      message: "Short Video updated successfully!",
      shortVideo,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const shortVideo = await ShortVideo.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );
    if (!shortVideo) {
      return res.status(404).send({
        message: "Short Video not found",
      });
    }
    res.send({
      message: "Short Video status updated successfully!",
      shortVideo,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteShortVideo = async (req, res) => {
  try {
    const shortVideo = await ShortVideo.findByIdAndDelete(req.params.id);
    if (!shortVideo) {
      return res.status(404).send({
        message: "Short Video not found",
      });
    }
    res.send({
      message: "Short Video deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addShortVideo,
  getAllShortVideos,
  getShowingShortVideos,
  getShortVideoById,
  updateShortVideo,
  updateStatus,
  deleteShortVideo,
};
