import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Genre from '../components/Genre';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const backend="https://demo-omega-ochre.vercel.app"
export default function EachGenre() {
   const {login,email} = useAuth();
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

    const renderStars = (rating) => {
      const totalStars = 5;
      return Array.from({ length: totalStars }, (v, i) => {
        if (i < Math.floor(rating)) {
          return <i key={i} className="fa-solid fa-star"></i>;
        } else if (i < rating) {
          return <i key={i} className="fa-solid fa-star-half-stroke"></i>;
        } else {
          return <i key={i} className="fa-regular fa-star"></i>;
        }
      });
    };
  
    // Chunk movies into groups of 5
    const movieRows = [];
    for (let i = 0; i < movies.length; i += 5) {
      movieRows.push(movies.slice(i, i + 5));
    }
  
    // return (
    //   <div className='m-0 h-[1000px] w-full bg-slate-900'>
    //        <Navbar/>
    //       <div className='p-5 text-slate-200 '>
    //         <h1 className='text-4xl m-5'>{genreName} Movies</h1>
    //          <div className='flex justify-around items-center h-auto m-10 mt-18 p-2'>
    //               {
    //                 movies.map((movie=>{
    //                   return(
    //                   <div className='' key={movie._id}>
    //                   <Link to={`/details/${movie._id}`}> 
    //                   <img src={movie.link} alt={movie.title} className='h-[300px]' />
    //                   </Link>
    //                   <center> <p className='text-xl mt-2'>Ratings: {movie.rating}</p></center>
    //                   </div>
    //                   )
    //                 }))
    //               }
    //          </div>
    //       </div>
    //      <Genre/>
    //   </div>
   
    // )

    return (
      <div className="screen  w-screen h-screen flex flex-row poppins-regular">
            <Navbar/>
          <div class="rightsidebox basis-4/5 p-10 text-white bg-[#100f2b]">
             
          <div class="navbar flex justify-end items-center w-[100%] h-[20px] text-xl pr-10 !poppins-extralight">
                 <Link  to="/" class="flex">
                    <i class="fa-solid fa-house"></i>
                    <p class="pr-20 pl-2">Home</p>
                </Link>
                <div class="flex">
                    <i class="fa-solid fa-location-dot"></i>
                    <p class="pr-20 pl-2">Bengaluru</p>
                </div>

              
                <div class="rounded-[30px] bg-[#f09631] p-3 border-slate-300 text-white  ">
                {login ? (
                      <Link to={`/myprofile/${email}`}>
                        <div >My Profile</div>
                      </Link>
                    ) : (
                      <Link to='/login'>
                        <div>LogIn</div>
                      </Link>
                    )}
                </div>
            </div>


            <div className="bigmoviebox  w-[100%] h-[97%] mt-7 flex flex-col ">
            {movieRows.map((row, rowIndex) => (
            <div key={rowIndex} className="movierow w-full basis-1/2 flex rounded pt-3">
              {row.map((movie) => (
                <div className="moviecol basis-1/5 flex flex-col py-2 px-6" key={movie._id}>
                  <div className="poster basis-4/5 bg-blue-100 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
                    <Link to={`/details/${movie._id}`}>
                      <img src={movie.link} alt={movie.title} className='h-[250px] w-[200px]'/>
                    </Link>
                  </div>
                  <center className="rating basis-1/5 mt-2 text-[#f09631]">
                    {renderStars(movie.rating)}
                  </center>
                </div>
              ))}
            </div>
          ))}
            </div>
          
          </div>   
      </div>
  )
}
