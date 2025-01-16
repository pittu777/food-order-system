const express = require("express");
const { adminLogin, getAllUsers, getAllFoodItems, deleteUser, updateOrderStatus } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


// router.post("/admin-register", adminRegister);

router.post("/admin-login", adminLogin);


router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({ message: "Welcome to the admin dashboard!" });
});

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);


router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

router.get("/foods", authMiddleware, adminMiddleware, getAllFoodItems);
router.put('/orders/:orderId/status', authMiddleware, adminMiddleware, updateOrderStatus);
module.exports = router;
