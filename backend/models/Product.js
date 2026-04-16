const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: false,
    },
    sku: {
      type: String,
      required: false,
    },
    barcode: {
      type: String,
      required: false,
    },
    title: {
      type: Object,
      required: true,
    },
    description: {
      type: Object,
      required: false,
    },
    highlights: {
      type: Object,
      required: false,
    },
    slug: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: Array,
      required: false,
    },
    tag: [String],
    variants: [{}],
    isCombination: {
      type: Boolean,
      required: true,
    },

    status: {
      type: String,
      lowercase: true,
      default: "show",
      enum: ["show", "hide"],
    },

    price: {
      type: Number,
      required: false,
    },

    basePrice: {
      type: Number,
      required: false,
      default: 0,
    },

    gstPercentage: {
      type: Number,
      required: false,
      default: 0,
    },


    // Admin-controlled per-product delivery charge.
    // Used during checkout to calculate Delivery Charges.
    deliveryCharge: {
      type: Number,
      required: false,
      default: 0,
    },

    minOrderQuantity: {
      type: Number,
      required: false,
      default: 1,
    },

    type: {
      type: String,
      default: "normal",
      enum: ["normal", "popular", "trending", "new"],
    },

    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: false,
      },
    ],
    videoUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = productSchema;

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
