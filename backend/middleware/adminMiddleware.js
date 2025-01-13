module.exports = (req, res, next) => {
  console.log("User Role in adminMiddleware:", req.user.role);
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
  };
  