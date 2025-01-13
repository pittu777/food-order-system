const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
console.log("Authorization Header:", authHeader); // Add this log for debugging

if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ message: "Unauthorized: No token provided" });
}

const token = authHeader.split(" ")[1];
console.log("Token Extracted:", token); // Add this log for debugging


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    console.log("Decoded Token in authMiddleware:", decoded);
// Debugging log
    req.user = decoded; // Attach user ID to the request object
    

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error.message); // Debugging log
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
