const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
console.log("Authorization Header:", authHeader);

if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ message: "Unauthorized: No token provided" });
}

const token = authHeader.split(" ")[1];
console.log("Token Extracted:", token);


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    console.log("Decoded Token in authMiddleware:", decoded);

    req.user = decoded; 
    

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
