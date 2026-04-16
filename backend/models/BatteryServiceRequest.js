const mongoose = require('mongoose');

const batteryServiceRequestSchema = new mongoose.Schema(
  {
    // Customer details
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    pincode: { type: String, required: false },

    // Battery details
    batteryBrand: { type: String, required: false },
    batteryModel: { type: String, required: false },
    batteryCapacity: { type: String, required: false }, // e.g. 200Ah, 150Ah
    batteryType: {
      type: String,
      required: true,
      enum: [
        'Lead Acid',
        'Lithium Ion',
        'Lithium Polymer',
        'AGM',
        'Gel',
        'Tubular',
        'VRLA',
        'Other',
      ],
    },

    // Service type
    serviceType: {
      type: String,
      required: true,
      enum: [
        'Battery Repair',
        'Battery Reconditioning',
        'Battery Testing',
        'Battery Replacement',
        'Battery Maintenance',
        'Electrolyte Refilling',
        'Cell Replacement',
        'Charging Issue',
        'Leakage Fix',
        'Other',
      ],
    },

    // Problem description
    problemDescription: { type: String, required: true },

    // Preferred service date
    preferredDate: { type: String, required: false },

    // Additional notes
    additionalNotes: { type: String, required: false },

    // Status
    status: {
      type: String,
      enum: ['pending', 'contacted', 'in_progress', 'completed', 'cancelled'],
      default: 'pending',
    },

    // Source tag
    source: { type: String, default: 'battery_service_section' },
  },
  { timestamps: true }
);

const BatteryServiceRequest = mongoose.model(
  'BatteryServiceRequest',
  batteryServiceRequestSchema
);
module.exports = BatteryServiceRequest;
