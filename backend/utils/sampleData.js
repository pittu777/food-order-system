const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const axios = require("axios"); 
const Food = require("../models/Food"); 

const MONGO_URI = "mongodb+srv://pittuprasanth98:4GKB3Q0ye2gGtXcJ@cluster-1.qfme3dh.mongodb.net/food-app?retryWrites=true&w=majority&appName=Cluster-1";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error: ", err));


const fetchRandomImage = async () => {
  try {
    const response = await axios.get('https://picsum.photos/200');
    return response.request.res.responseUrl; 
  } catch (error) {
    console.error('Error fetching image:', error);
    return 'https://via.placeholder.com/150?text=Food+Image';
  }
};

const generateFakeFoodData = async (numRecords) => {
  for (let i = 0; i < numRecords; i++) {
    const imageUrl = await fetchRandomImage();

    const fakeFood = new Food({
      name: faker.commerce.productName(),
      category: faker.helpers.arrayElement(["Appetizers", "Main Course", "Desserts", "Beverages"]),
      price: parseFloat(faker.commerce.price()),
      availability: faker.datatype.boolean(),
      createdAt: faker.date.past(),
      imageUrl: imageUrl,
    });

    await fakeFood.save();
    console.log(`Fake food item ${i + 1} saved`);
  }
};


generateFakeFoodData(100).then(() => {
  console.log("Fake data generation complete");
  mongoose.connection.close();
});
