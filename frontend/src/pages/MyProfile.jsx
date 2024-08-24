import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

export default function MyProfile() {
  const [data, setData] = useState([]);
  const { email } = useAuth();

  console.log(email)
   const backend="https://demo-omega-ochre.vercel.app"
  useEffect(() => {
    axios.get(`https://demo-omega-ochre.vercel.app/myprofile/${email}`)
      .then((res) => {
        setData(res.data);
        console.log(JSON.stringify(data));
      })
      .catch(() => {
        console.log("failed to get my data from the backend");
      });
  }, []); 
  return (
    <div className='w-full min-h-screen bg-slate-900 flex justify-center items-center'>
      <div className='w-[92%] m-8 p-5 bg-slate-300 rounded text-slate-900 flex flex-col'>
        <center>
         <div className='flex w-[100%] justify-between'>
         <h1 className='h-[10%] font-bold text-3xl m-5'>My Bookings</h1>
          <div className='flex w-[200px] flex justify-between items-center mr-10'>
             <i class=" text-[#f09631] text-4xl fa-solid fa-user"></i>
             <p className=' text-xl font-semibold'>{email}</p>
          </div>
         </div>
        </center>
        <div className='flex flex-col'>
        {data.map((item) => (
           <div key={item._id} className='bg-slate-200 m-4 rounded p-5 text-lg flex'>
          
             <div className="leftdiv w-[50%] m-2 p-5 h-[98%] flex flex-col font-semibold  justify-around">
             <p>Movie Name :</p>
             <p>Date :</p>
             <p>Day :</p>
             <p>Theatre Name :</p>
             <p>Theatre Location :</p>
             <p>Timings :</p>
             <p>No of seats booked: </p>
             <p>Total Price :</p>
          </div>
          <div className="rightdiv w-[50%] m-2 p-5 h-[98%] flex flex-col justify-around">
             <p> {item.movieName} </p>
             <p> {item.date} </p>
             <p> {item.day}</p>
             <p>{item.theatreName}</p>
             <p>{item.theatreLocation}</p>
             <p>{item.slot}</p>
             <p>{item.noOfSeats}</p>
             <p >{item.price}</p>
          </div>
         </div>
          ))}
        </div>
      </div>
    </div>
  );
}
