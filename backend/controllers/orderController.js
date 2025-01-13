
const Order = require("./../models/Order");
const Food = require("../models/Food");

exports.placeOrder = async (req, res) => {
  const { items } = req.body; // User will pass only items (foodId and quantity)

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    // Calculate totalAmount dynamically
    let totalAmount = 0;

    for (const item of items) {
      // Fetch the food item from the database
      const food = await Food.findById(item.foodId);
      if (!food) {
        return res.status(404).json({ message: `Food item with ID ${item.foodId} not found` });
      }

      // Add the cost of the current item to the total amount
      totalAmount += food.price * item.quantity;
    }

    // Create the order with the calculated totalAmount
    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Order Creation Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  const { userId } = req.params; // Get userId from route params
  try {
    // Fetch orders for the specified user ID
    const orders = await Order.find({ userId });
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    res.status(500).json({ error: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await Order.find().populate("userId", "username email").populate("items.foodId");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error.message);
    res.status(500).json({ error: error.message });
  }
};
