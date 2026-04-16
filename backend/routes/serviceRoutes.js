const express = require("express");
const router = express.Router();
const {
  addService,
  getAllServices,
  getShowingServices,
  getServiceById,
  getServiceBySlug,
  updateService,
  updateStatus,
  deleteService,
} = require("../controller/serviceController");

// Public routes
router.get("/show", getShowingServices);
router.get("/show/slug/:slug", getServiceBySlug);

// Admin routes (simplified for now, can add auth later)
router.post("/add", addService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.patch("/:id", updateService);
router.put("/status/:id", updateStatus);
router.delete("/:id", deleteService);

module.exports = router;
