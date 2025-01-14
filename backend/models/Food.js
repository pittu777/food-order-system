const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Appetizers", "Main Course", "Desserts", "Beverages"],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,  // Store image URL as a string
    required: true, // Make it optional, you can modify based on requirements
  },
});

module.exports = mongoose.model("Food", foodSchema);
