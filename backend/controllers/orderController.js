
const Order = require("./../models/Order");
const Food = require("../models/Food");

// exports.placeOrder = async (req, res) => {
//   const { items } = req.body; 

//   try {
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Unauthorized: User not authenticated" });
//     }

    
//     let totalAmount = 0;

//     for (const item of items) {
      
//       const food = await Food.findById(item.foodId);
//       if (!food) {
//         return res.status(404).json({ message: `Food item with ID ${item.foodId} not found` });
//       }

     
//       totalAmount += food.price * item.quantity;
//     }

    
//     const order = await Order.create({
//       userId: req.user.id,
//       items,
//       totalAmount,
//     });

//     res.status(201).json(order);
//   } catch (error) {
//     console.error("Order Creation Error:", error.message);
//     res.status(400).json({ error: error.message });
//   }
// };

exports.placeOrder = async (req, res) => {
  const { items, address } = req.body;

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }

    let totalAmount = 0;

    for (const item of items) {
      const food = await Food.findById(item.foodId);
      if (!food) {
        return res.status(404).json({ message: `Food item with ID ${item.foodId} not found` });
      }
      totalAmount += food.price * item.quantity;
    }

    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount,
      address,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Order Creation Error:', error.message);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params; // Get the userId from the route parameter

    // Fetch the orders from the database for the specified user
    const orders = await Order.find({ userId }).populate({
      path: 'items.foodId', // Assuming foodId references a Food model
      select: 'name price' // Include only the required fields
    });

    // Send the fetched orders as a response
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    // Send an error response if something goes wrong
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};





exports.getAllUserOrders = async (req, res) => {
  const { userId } = req.params; 
  try {
    
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
    
    const orders = await Order.find().populate("userId", "username email").populate("items.foodId");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error.message);
    res.status(500).json({ error: error.message });
  }
};
