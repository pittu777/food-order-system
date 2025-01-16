const express = require("express");
const { placeOrder, getAllUserOrders, getAllOrders, getUserOrders, deleteOrder } = require("./../controllers/orderController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/order", authMiddleware, placeOrder);
router.get('/user/:userId', authMiddleware, getUserOrders);
router.get("/all-orders", authMiddleware, adminMiddleware, getAllOrders);

router.get("/:userId", authMiddleware, adminMiddleware, getAllUserOrders);

router.delete("/:orderId", authMiddleware, adminMiddleware, deleteOrder);

module.exports = router;
