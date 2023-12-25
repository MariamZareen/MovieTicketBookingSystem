import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Navbar() {
  const { login,email, logoutHandler } = useAuth();

  return (
    <div>
      <nav className='flex justify-between items-center m-0 p-8 bg-slate-900 text-slate-200 w-full h-[100px] sticky top-0 border-b border-slate-800'>
        <div className='text-3xl font-black'>CineMagic</div>
        <div className='flex justify-around items-center'>
          <div className='text-[20px] p-2 m-5 font-semibold hover:font-bold invisible'>About</div>
          <div className='text-[20px] p-2 m-5 font-semibold hover:font-bold invisible'>Contact</div>
          {login ? (
            <Link to={`/myprofile/${email}`}>
              <div className='text-[20px] p-3 m-5 font-semibold hover:font-bold bg-slate-200 text-slate-900 rounded-xl'>
                My Profile
              </div>
            </Link>
          ) : (
            <Link to='/login'>
              <div className='text-[20px] p-3 m-5 font-semibold hover:font-bold bg-slate-200 text-slate-900 rounded-xl'>
                LogIn
              </div>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
