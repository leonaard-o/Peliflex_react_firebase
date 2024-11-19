import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import showAlert from '../alerts/sweetalert';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri'; // Importamos los íconos de Remix Icon

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar la visibilidad de la contraseña

  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate('/');
      showAlert('Succes', 'Signed Successful', 'You have been signed in successfully.');
    } catch (error) {
      showAlert('error', 'Error', error.message);
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const toggleShowP = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen">
      <img
        className="absolute hidden object-cover w-full h-full sm:block"
        src="https://abellagraphicdesign.com/wp-content/uploads/2023/10/netflix-1.jpg"
        alt=""
      />
      <div className="fixed top-0 left-0 w-full h-screen bg-black/40"></div>
      <div className="fixed z-50 w-full px-4 py-24">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-full py-4">
            
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 my-2 font-semibold bg-gray-700 rounded"
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 my-2 font-semibold bg-gray-700 rounded"
                  type={showPassword? 'text' : 'password'} // Cambia el tipo según el estado
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button 
                  type="button"
                  onClick={toggleShowP}
                  className="absolute text-gray-600 top-6 right-3 hover:text-gray-700" // Estilos del ícono de ojo
                >
                  {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                </button>
              </div>
              <button className="py-3 my-6 font-bold bg-red-600 rounded">Sign In</button>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <p>
                  <input className="mr-2" type="checkbox" />Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="py-8">
                <span className="text-gray-600">New to Peliflex?</span> {''}
                <Link to="/signup"> Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
