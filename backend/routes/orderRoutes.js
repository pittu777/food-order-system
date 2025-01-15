const express = require("express");
const { placeOrder, getAllUserOrders, getAllOrders, getUserOrders } = require("./../controllers/orderController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/order", authMiddleware, placeOrder);
router.get('/user/:userId', authMiddleware, getUserOrders);
router.get("/all-orders", authMiddleware, adminMiddleware, getAllOrders);

router.get("/:userId", authMiddleware, adminMiddleware, getAllUserOrders);

module.exports = router;
