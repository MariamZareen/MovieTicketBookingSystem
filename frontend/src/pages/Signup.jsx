import React,{useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import {  useSnackbar } from 'notistack';

function Signup() {
  const navigate = useNavigate();
  const { loginHandler } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    const data = { email, password };

    axios
      .post('http://localhost:8080/signup', data)
      .then(() => {
        console.log('Data sent to backend successfully');
        loginHandler(); // Update login state on successful signup
        enqueueSnackbar('Signup successful! You are now logged in.', { variant: 'success' });
        navigate('/');
        // Show success message
      })
      .catch((err) => {
        //existing user
        if(err.response&& err.response.status===400)
        enqueueSnackbar('You are an existing user. Please login', { variant: 'error' });
        navigate('/login');
        // Show error message
      });
  };

  return (
    <div className='w-full h-screen bg-slate-900 pt-[2px]'>
     <center> <div className='text-5xl font-black text-slate-300 mt-10 '>CineMagic</div></center>
      <div className='w-[450px] h-[550px] bg-slate-300 p-5 mx-auto mt-[5%]'>
        <center><h1 className='text-3xl font-bold my-9'>Sign Up</h1></center>
        <form method='POST'>
          <center>
            <div className='flex justify-between items-center mt-8 '>
              <p className='m-3 text-[20px]'>Email</p>
              <input type='email' onChange={(e) => setEmail(e.target.value)} name='email' className='w-[70%] h-10 p-2 rounded' />
            </div>
            <div className='flex justify-between mt-8 items-center'>
              <p className='m-3 text-[20px] '>Password</p>
              <input type='password' onChange={(e) => { setPassword(e.target.value) }} name='password' className='w-[70%] h-9 p-1 rounded p-2' />
            </div>
            <button type='button' className='m-8 p-3 bg-white rounded-xl w-40 text-[18px] hover:bg-slate-300 hover:shadow-white hover:ring-white hover:ring font-bold' onClick={handleSubmit}>SignUp</button>
            <div className='bg-white text-center w-[80%] h-10 mt-6 flex justify-center items-center'>
              <Link to={'/login'} className='font-semibold'>Already have an account? Log In</Link>
            </div>
          </center>
        </form>
      </div>
    </div>
  );
}



export default Signup;
