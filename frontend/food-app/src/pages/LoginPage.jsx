import React,{useState} from 'react'
import Login from '../components/Login/Login'
import Signup from '../components/Login/Signup'

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState(false);
  
    if (user) {
      return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="User Logo"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="text-xl mt-4 font-bold">Welcome Back!</h2>
          </div>
        </div>
      );
    }
  
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between mb-4">
            <button
              className={`px-4 py-2 text-lg font-semibold ${
                isLogin ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 text-lg font-semibold ${
                !isLogin ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
          </div>
          {isLogin ? <Login setUser={setUser} /> : <Signup />}
        </div>
      </div>
    );
  };
  
  export default LoginPage;