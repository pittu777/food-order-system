const express = require("express");
const { placeOrder, getUserOrders, getAllOrders } = require("./../controllers/orderController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/order", authMiddleware, placeOrder);

router.get("/all-orders", authMiddleware, adminMiddleware, getAllOrders);

router.get("/:userId", authMiddleware, adminMiddleware, getUserOrders);

module.exports = router;
