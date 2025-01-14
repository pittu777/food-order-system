const Food = require("./../models/Food");

exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json({foods});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addFood = async (req, res) => {
  const { name, category, price, availability, imageUrl } = req.body;
  try {
    const food = await Food.create({ name, category, price, availability, imageUrl });
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateFood = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findByIdAndUpdate(id, req.body, { new: true });
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findByIdAndDelete(id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
