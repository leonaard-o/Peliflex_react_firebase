import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import showAlert from '../alerts/sweetalert';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password, username);
      navigate('/');
      showAlert('Success', 'Registration Successful', 'You have been registered successfully.');
    } catch (error) {
      showAlert('error', 'Error', error.message);
    }
  };

  const toggleShowP = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='w-full h-screen'>
       
      <img
        className='absolute hidden object-cover w-full h-full sm:block'
        src='https://abellagraphicdesign.com/wp-content/uploads/2023/10/netflix-1.jpg'
        alt=''
      />
      <div className='fixed top-0 left-0 w-full h-screen bg-black/60'></div>
      <div className='fixed z-50 w-full px-4 py-24'>
        <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-bold'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-full py-4'>
              <SearchInput
                onChange={(e) => setUsername(e.target.value)}
                className='p-3 my-2 font-semibold bg-gray-700 rounded'
                type='text'
                placeholder='Username'
                autoComplete='username'
                required
              />
              <SearchInput
                onChange={(e) => setEmail(e.target.value)}
                className='p-3 my-2 bg-gray-700 rounded'
                type='email'
                placeholder='Email'
                autoComplete='email'
              />
              <div className="relative">
                <SearchInput
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full p-3 my-2 bg-gray-700 rounded'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  autoComplete='current-password'
                />
                <button 
                  type="button"
                  onClick={toggleShowP}
                  className="absolute text-gray-600 top-6 right-3 hover:text-gray-700"
                >
                  {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                </button>
              </div>
              <button className='py-3 my-6 font-bold bg-red-600 rounded'>Sign Up</button>
              <div className='flex items-center justify-between text-sm text-gray-600'>
                <p>
                  <SearchInput className='mr-2' type='checkbox' />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className='py-8'>
                <span className='text-gray-600'>Already subscribed to Movieflex?</span>
                <Link to='/login'> Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Signup;
