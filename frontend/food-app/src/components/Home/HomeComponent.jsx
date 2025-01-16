import React from 'react';
import FoodList from './FoodList';
import { useAuth } from '../../context/AuthContext';
import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/img2.jpeg";
import img3 from "../../assets/img3.jpeg";
import img4 from "../../assets/img4.jpeg"
const HomeComponent = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-6 py-8">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to Foodie's Paradise, {user?.username}!
        </h1>
        <p className="text-xl text-gray-600">
          Discover your favorite food and place an order today!
        </p>
      </div>

    
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Explore Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="bg-green-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center cursor-pointer">
            <img src={img1} alt="Pizza" className="w-32 h-32 object-cover rounded-full mb-4 mx-auto" />
            <p className="text-xl font-medium text-gray-800">Pizza</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center cursor-pointer">
            <img src={img2} alt="Burgers" className="w-32 h-32 object-cover rounded-full mb-4 mx-auto" />
            <p className="text-xl font-medium text-gray-800">Burgers</p>
          </div>
          <div className="bg-red-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center cursor-pointer">
            <img src={img3} alt="Desserts" className="w-32 h-32 object-cover rounded-full mb-4 mx-auto" />
            <p className="text-xl font-medium text-gray-800">Desserts</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center cursor-pointer">
            <img src={img4} alt="Drinks" className="w-32 h-32 object-cover rounded-full mb-4 mx-auto" />
            <p className="text-xl font-medium text-gray-800">Drinks</p>
          </div>
        </div>
      </div>

      
      <div className="mb-12 bg-purple-100 p-8 rounded-xl shadow-lg text-center">
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">Special Offers</h3>
        <p className="text-xl text-gray-800">Get 20% off on your first order! Use code: <span className="font-bold text-blue-600">WELCOME20</span></p>
      </div>

     
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Recommended for You</h2>
        <FoodList />
      </div>

    
      
     
      <footer className="relative bg-blueGray-200 pt-8 pb-6">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap text-left lg:text-left">
      <div className="w-full lg:w-6/12 px-4">
        <h4 className="text-3xl fonat-semibold text-blueGray-700">Let's keep in touch!</h4>
        <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
          Find us on any of these platforms, we respond 1-2 business days.
        </h5>
        <div className="mt-6 lg:mb-0 mb-6">
          <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i className="fab fa-twitter"></i></button><button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i className="fab fa-facebook-square"></i></button><button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i className="fab fa-dribbble"></i></button><button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </div>
      <div className="w-full lg:w-6/12 px-4">
        <div className="flex flex-wrap items-top mb-6">
          <div className="w-full lg:w-4/12 px-4 ml-auto">
            <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
            <ul className="list-unstyled">
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">About Us</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Blog</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Github</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Free Products</a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
            <ul className="list-unstyled">
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">MIT License</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Terms &amp; Conditions</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Privacy Policy</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr className="my-6 border-blueGray-300"/>
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-4/12 px-4 mx-auto text-center">
      <p>&copy; {new Date().getFullYear()} Foodie's Paradise. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>
      
    </div>
  );
};

export default HomeComponent;
