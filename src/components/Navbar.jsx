import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';


const Navbar = () => {
  const {user, logOut} = UserAuth();
  const navigate = useNavigate();

 
  const handleLogOut = async () =>{
    try {
      await logOut()
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className='flex items-center  justify-between p-4 z-[100] w-full absolute'>
      <Link to='/'>
        <h1 className='text-4xl  font-bold text-transparent bg-gradient-to-br bg-clip-text from-[#e63939] to-[#350707] cursor-pointer'>
          PELIFLEX
          </h1>
      </Link>
      <div>
        <p className='hidden text-4xl font-bold text-transparent scale-75 translate-x-4 skew-y-3 ml-38 bg-gradient-to-br bg-clip-text from-indigo-400 to-indigo-900 lg:block to '>Hello World!</p>
</div>

       {user?.email ? (
        <div className='flex gap-3'>
         <span className='mt-2 hidden lg:block pr-4 text-lg text-transparent bg-gradient-to-bl bg-clip-text from-[#352912] to-[#0004ff] font-bold'>{`Welcome, ${user?.username || "user"}`}</span>
        <Link to='/account'>
          <button className='px-2 py-2 text-xs font-semibold text-black rounded lg:text-base lg:px-4 bg-slate-300 '>Account</button>
        </Link>
          
          <button onClick={handleLogOut}
           className='lg:px-4 px-2 lg:text-base  py-2 text-xs  text-white bg-gradient-to-t from-[red]  to-[#0b0101] rounded cursor-pointer'>Logout</button>
        
      </div>
   ) : (
       <div className='flex gap-2'>
       <Link to='/login'>
       <button className="px-2 py-2 text-xs font-semibold text-black rounded lg:text-base lg:px-4 bg-slate-300">
  Sign In
</button>

       </Link>
       <Link to='/signup'>
         <button className='px-2 py-2 text-xs lg:text-base font-semibold text-white bg-gradient-to-r from-[red] to-[#0b0101] rounded cursor-pointer lg:px-4'>Sign Up</button>
       </Link>
     </div>

       )}
    </div>
  );
};

export default Navbar