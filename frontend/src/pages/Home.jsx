import React,{useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Genre from '../components/Genre'
import axios from 'axios'
import { Link } from 'react-router-dom';


export default function Home() {
  const[movies,setMovies]=useState([])
  useEffect(() => {
    axios.get('https://demo-omega-ochre.vercel.app/')
      .then((res) => {
        setMovies(res.data);
        console.log(res.data); // Log the received data
      })
      .catch(() => {
        console.log('error getting the data');
      });
  }, []);
  
  return (
    <div className='m-0 min-h-screen w-full bg-slate-900'>
         <Navbar/>
        <div className='p-5 text-slate-200 '>
          <h1 className='text-4xl m-5'>Latest Movies In Theatre Now</h1>
           <div className='flex flex-wrap justify-left items-center h-auto m-10 mt-18 p-2'>
                {
                  movies.map((movie=>{
                    return(
                    <div className='m-5' key={movie._id}>
                    <Link to={`/details/${movie._id}`}> 
                    <img src={movie.link} alt={movie.title} className='h-[300px]' />
                    </Link>
                    <center> <p className='text-xl mt-2'>Ratings: {movie.rating}</p></center>
                    </div>
                    )
                  }))
                }
           </div>
        </div>
       <Genre/>
    </div>
  )
}
