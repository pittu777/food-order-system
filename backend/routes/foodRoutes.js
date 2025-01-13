const express = require("express");

const {
  getAllFoods,
  addFood,
  updateFood,
  deleteFood,
} = require("./../controllers/foodController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

router.get("/all-food", getAllFoods);

router.post("/add-food", authMiddleware, adminMiddleware, addFood);

router.put("/:id", authMiddleware, adminMiddleware, updateFood);

router.delete("/:id", authMiddleware, adminMiddleware, deleteFood);

module.exports = router;