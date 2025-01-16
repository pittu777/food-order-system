const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const Food = require("../models/Food");


exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }


    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Not an admin" });
    }

    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
     });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// exports.adminRegister = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
    
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Admin with this email already exists" });
//     }

    
//     const admin = await User.create({
//       username,
//       email,
//       password,
//       role: "admin",
//     });

//     res.status(201).json({ message: "Admin registered successfully", admin });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteUser = async (req, res) => {
  const { id } = req.params; 

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getAllFoodItems = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


