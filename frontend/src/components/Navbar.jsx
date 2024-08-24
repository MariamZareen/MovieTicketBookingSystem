import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Navbar() {
  const { login,email, logoutHandler } = useAuth();


  return(
    <div class="leftsidebox basis-1/5 bg-[#100f2b] h-[100%] w-[100%] text-white ">
    <h1 class=" matemasie-regular font-bold text-4xl mx-10 my-10">CineMagic</h1>
    <div class="fullgenrebox mt-[70px] ">
        <Link to={`/genre/${'action'}`} class="genrebox flex justify-center items-center border-slate-300 border-y-1 mx-auto w-[100%] text-lg relative">
            <div class="p-6 hover:font-bold">Action</div>
        </Link>

        <Link to={`/genre/${'comedy'}`} class="genrebox flex justify-center items-center border-slate-300 border-y-1 mx-auto w-[100%] text-lg relative">
            <div class="p-6 hover:font-bold">Comedy</div>
        </Link>

        <Link to={`/genre/${'romance'}`} class="genrebox flex justify-center items-center border-slate-300 border-y-1 mx-auto w-[100%] text-lg relative">
            <div class="p-6 hover:font-bold">Romance</div>
        </Link>

        <Link to={`/genre/${'horror'}`} class="genrebox flex justify-center items-center border-slate-300 border-y-1 mx-auto w-[100%] text-lg relative">
            <div class="p-6 hover:font-bold">Horror</div>
        </Link>

        <Link to={`/genre/${'thriller'}`} class="genrebox flex justify-center items-center border-slate-300 border-y-1 mx-auto w-[100%] text-lg relative">
            <div class="p-6 hover:font-bold">Thriller</div>
        </Link>
        
        
    </div>

</div>
  )
}
