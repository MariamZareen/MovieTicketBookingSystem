import React from 'react'
import {Link } from 'react-router-dom'

export default function Genre() {
  return (
    <div>
          <div className='p-5 text-slate-200 '>
          <h1 className='text-4xl m-5'>Choose Movies According To Your Favourite Genre</h1>
          <div className='flex justify-center items-center'>

                 <Link to={`/genre/${'action'}`}>
                 <div  className='flex justify-center items-center h-[100px] w-[250px] bg-slate-100 text-3xl text-bold rounded text-center m-5 p-2 bg-[url("https://wallpapercave.com/wp/wp3285534.jpg")] object:cover'>Action</div>
                 </Link>
                 <Link to={`/genre/${'comedy'}`}>
                 <div  className='flex justify-center items-center h-[100px] w-[250px] bg-slate-100 text-3xl text-bold rounded text-center m-5 p-2 bg-[url("https://e1.pxfuel.com/desktop-wallpaper/254/243/desktop-wallpaper-best-4-comedy-backgrounds-on-hip-stand-up.jpg")]'>Comedy</div>
                 </Link>

                 <Link to={`/genre/${'romance'}`}>
                 <div  className='flex justify-center items-center h-[100px] w-[250px] bg-slate-100 text-3xl text-bold rounded text-center m-5 p-2 bg-[url("https://thumbs.dreamstime.com/b/beautiful-heart-love-background-d-seamless-footage-k-romantic-flying-hearts-animated-romance-marriage-valentines-day-199722558.jpg")]'>Romance</div>
                 </Link>

                 <Link to={`/genre/${'horror'}`}>
                 <div  className='flex justify-center items-center h-[100px] w-[250px] bg-slate-100 text-3xl text-bold rounded text-center m-5 p-2 bg-[url("https://img.freepik.com/free-vector/watercolor-halloween-background_52683-43697.jpg")]'>Horror</div>
                 </Link>

                 <Link to={`/genre/${'thriller'}`}>
                 <div  className='flex justify-center items-center h-[100px] w-[250px] bg-slate-100 text-3xl text-bold rounded text-center m-5 p-2 bg-[url("https://img.freepik.com/free-photo/surface-with-blood_1048-5193.jpg")]'>Thriller</div>
                 </Link>
          </div>
        </div>
    </div>
  )
}
