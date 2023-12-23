import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';


export default function ShowMovie() {
  const { id } = useParams();
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { Theatreid } = useParams();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const movieName = params.get("movieName");
  const date = params.get("date");
  const [theatres, setTheatres] = useState([]);
  const [sendDate, setSendDate] = useState();
  const [seletedDay, setSelectedDay] = useState();
  const { login, logoutHandler } = useAuth();

  const staticDates = [
    new Date(2023, 11, 1),
    new Date(2023, 11, 2),
    new Date(2023, 11, 3),
    new Date(2023, 11, 4),
    new Date(2023, 11, 5),
    new Date(2023, 11, 6),
    new Date(2023, 11, 7),
  ];

  useEffect(() => {
    // Fetch data from the first URL
    axios.get(`http://localhost:8080/details/${id}`)
      .then((res) => {
        setLink(res.data.link);
        setTitle(res.data.title);
        setRating(res.data.rating);
        setGenre(res.data.genre);
       
      })
      .catch(() => {
        console.log("failed to get data from backend");
      });

    // Fetch data from the second URL
    axios.get(`http://localhost:8080/theatres/${Theatreid}?movieName=${movieName}&date=${date}`)
      .then((res) => {
        console.log(Theatreid, " ", movieName, " ", date);
        setTheatres(res.data);
      })
      .catch(() => {
        console.log("Cannot get theatres data");
      });
  }, [id, Theatreid, movieName, date]);


  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSendDate(date.toLocaleString('default', { month: 'short' }) +
      ' ' + ('0' + date.getDate()).slice(-2) +
      ' ' + date.getFullYear());
    const str = date.toDateString().substring(0, 3);
    setSelectedDay(str);
  };
  const dayElements = staticDates.map((date, index) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }).substring(0, 3);
    return (
      <Link key={index} to={`/theatres/${index}?movieName=${title}&date=${dayOfMonth}`}>
        <div
          className='w-[70px] h-[95%] bg-slate-900 text-white text-center rounded p-1 active:bg-slate-300 active:text-slate-900'
          onClick={() => handleDateClick(date)}
        >
          <p className='text-base'>{day}</p>
          <p className='text-xl font-bold'>{dayOfMonth}</p>
          <p className='text-sm'>{month}</p>
        </div>
      </Link>
    );
  });
  
  return (
    <>
      <div className='flex bg-slate-900 h-screen justify-around text-slate-200 text-center flex-col md:flex-row text-3xl'>
        <div className='flex items-center flex-col w-[35%] '>
          <img src={link} alt={title} className='h-[450px] m-10' />
          <div className='m-[20px]'>
            <h1>{title}</h1>
            <p>Ratings: {rating}</p>
            <p>Genre: {genre.join(', ')}</p>
          </div>
        </div>

        <div className='bg-slate-300 w-[55%] m-5 rounded text-slate-900 p-5 '>
          <h1 className='font-bold text-3xl'>Your Nearest Theatres</h1>
          <div className='flex flex-col items-center flex-wrap h-[95%]'>
            <div className='h-[15%] flex justify-around items-center w-[90%] my-[20px]'>
              {dayElements}
            </div>
            {selectedDate && (
              <div>
                <p>Selected Date: {selectedDate.toDateString()}</p>
              </div>
            )}

            <div className='flex flex-col w-[100%] h-[70%] mt-2 items-center overflow-auto'>
            {theatres.map((theatre) => (
                <div key={theatre._id} className='border-slate-900 rounded w-[98%] h-[100px] p-4 text-2xl bg-slate-200 flex flex-col md:flex-row items-center'>
                    <div
                    className='text-slate-900 text-lg w-[40%] font-bold'>{theatre["theatre name"]}: {theatre.location}</div>
                    <div className='flex flex-wrap'>
                    {Object.keys(theatre.slot).map((time) => (
                        <React.Fragment key={time}>
                          {theatre.slot[time] !== null && theatre.slot[time] !== 0 && (
                            <>
                              {login ? ( 
                                <Link
                                  to={`/dummy/${0}?movieName=${title}&date=${sendDate}&day=${seletedDay}&theatreName=${theatre["theatre name"]}&theatreLocation=${theatre.location}&slot=${time}&noOfSeats=${theatre.slot[time]}&price=${theatre.price}`}
                                  className='m-2 p-2 h-12 w-[100px] bg-slate-900 text-slate-100 text-[15px] rounded'
                                >
                                  {time}
                                </Link>
                              ) : (
                                <Link to='/login' className='m-2 p-2 h-12 w-[100px] bg-slate-900 text-slate-100 text-[15px] rounded'>
                                  {time}
                                </Link>
                              )}
                            </>
                          )}
                        </React.Fragment>
                      ))}

                    </div>
                </div>
            ))}
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}