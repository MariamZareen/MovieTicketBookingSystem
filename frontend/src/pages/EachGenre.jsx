import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Genre from '../components/Genre';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function EachGenre() {
    const[movies,setMovies]=useState([])
    const {genreName}=useParams();
    useEffect(()=>{
      axios.get(`https://demo-omega-ochre.vercel.app/genre/${genreName}`)
      .then((res)=>{
        setMovies(res.data)
        console.log(JSON.stringify(movies))
      })
      .catch(()=>{
        console.log('error getting the data');
      })
    },[genreName])
  
    return (
      <div className='m-0 h-[1000px] w-full bg-slate-900'>
           <Navbar/>
          <div className='p-5 text-slate-200 '>
            <h1 className='text-4xl m-5'>{genreName} Movies</h1>
             <div className='flex justify-around items-center h-auto m-10 mt-18 p-2'>
                  {
                    movies.map((movie=>{
                      return(
                      <div className='' key={movie._id}>
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
