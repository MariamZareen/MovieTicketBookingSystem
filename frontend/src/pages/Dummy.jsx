import axios from 'axios'
import React, { useEffect,useState } from 'react';
import { useParams,useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useSnackbar } from 'notistack';
import {loadStripe} from '@stripe/stripe-js'

const backend="https://demo-omega-ochre.vercel.app"
export default function Dummy() {
  const navigate=useNavigate()
  const { id } = useParams();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const movieName = params.get("movieName");
  const date = params.get("date");
  var day =params.get("day")
  const theatreName=params.get("theatreName")
  const theatreLocation=params.get("theatreLocation")
  const slot=params.get("slot")
  const noOfSeats=params.get("noOfSeats")
  const price=params.get("price")
 const { enqueueSnackbar } = useSnackbar();
  
  useEffect(()=>{
     axios.get(`https://demo-omega-ochre.vercel.app/dummy/${id}?movieName=${movieName}?date=${date}&day=${day}&theatreName=${theatreName}&theatreLocation=${theatreLocation}&slot=${slot}&noOfSeats=${noOfSeats}&price=${price}`)
     .then((res)=>{
        console.log(res);
     })
     .catch(()=>{

     })
  },[id,movieName,date,day,theatreName,theatreLocation])

  const [selectedSeats, setSelectedSeats] = useState(1);
  const [totalCost,setTotalCost]=useState(price);
  const maxSeats = noOfSeats; 
  const {email} =useAuth();
  day=day+"day"

  const handleInputChange = (e) => {
    let inputValue = parseInt(e.target.value, 10);
  
    if (!isNaN(inputValue)) {
      inputValue = Math.min(inputValue, maxSeats);
      inputValue = Math.max(inputValue, 1);
      setSelectedSeats(inputValue);
  
      let priceElement = document.getElementById("price");
      setTotalCost(inputValue * price);
      priceElement.innerHTML = totalCost;
    }
  };

  // const handleSubmit = () => {
  //   const data = { email,movieName, date, day, slot, theatreName, theatreLocation, selectedSeats, totalCost };
  
  //   axios.post('https://demo-omega-ochre.vercel.app/reservationdata', data)
  //     .then(() => {
  //       console.log('Data sent to backend successfully');
  //        enqueueSnackbar('Tickets Booked Successfully', { variant: 'success' });
  //       navigate('/');
  //     })
  //     .catch((error) => {
  //       console.error("Error sending data to backend:", error);
  //     });
  // }

  //payment integration
  const makePayment=async()=>{
      const stripe = await loadStripe("pk_test_51Pe7Z2HD6FlPojIARdySEh5aHVdhKZGKT46bqNolkrUEWfkf5DwV5tyPcx5QEthDTd36awFtqSOEQE2by3OhMoHY00jkctiANk");
    const body = { email,movieName, date, day, slot, theatreName, theatreLocation, selectedSeats, totalCost };
    const headers={
      'Content-Type': 'application/json'
    }
    const response = await fetch ("https://demo-omega-ochre.vercel.app/api/create-checkout-session",{
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
    const session = await response.json();
    const result= stripe.redirectToCheckout({
      sessionId: session.id
    })

    if(result.error){
      console.log(result.error)
    }

  }

  return (
    <div className='w-screen h-screen bg-slate-900 flex justify-center items-center'>
      <div className='flex justify-center items-center flex-col w-[50%] h-[85%] bg-slate-300 rounded p-7 text-2xl'>
          <center className='font-bold mb-5 text-3xl'>Book The Tickets</center>
          <div className='border-2 border-slate-900 h-[95%] w-[95%] p-4 '>
         
          <div className='h-[90%] flex w-[98%]'>
          <div className="leftdiv w-[50%] m-2 p-5 h-[98%] flex flex-col font-semibold   justify-around">
             <p>Movie Name :</p>
             <p>Date :</p>
             <p>Day :</p>
             <p>Theatre Name :</p>
             <p>Theatre Location :</p>
             <p>Timings :</p>
             <p>No of Slots available :</p>
             <p>No of slots required : </p>
             <p>Total Price :</p>
          </div>
          <div className="rightdiv w-[50%] m-2 p-5 h-[98%] flex flex-col justify-around">
             <p> {movieName} </p>
             <p> {date} </p>
             <p> {day}</p>
             <p>{theatreName}</p>
             <p>{theatreLocation}</p>
             <p>{slot}</p>
             <p>{noOfSeats}</p>
             <p><input type="number" 
                 className='p-2'
                 value={selectedSeats}
                 onInput={handleInputChange}
             /></p>
             <p id="price">{totalCost}</p>
          </div>
          </div>
           <center>
           <button onClick={makePayment} className='rounded bg-slate-900 text-slate-300 text-2xl p-3 w-[250px] mt-6'>Book</button>
             </center>         
          </div>
      </div>
    </div>
  )
}
