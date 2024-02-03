import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { SnackbarProvider, useSnackbar } from 'notistack';
import axios from 'axios';


function Login() {
  const navigate = useNavigate();
  const { loginHandler } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    const data = { email, password };

    axios
      .post('https://demo-omega-ochre.vercel.app/login', data)
      .then(() => {
        console.log('Data sent to backend successfully');
        loginHandler(data.email); 
        navigate('/');
        enqueueSnackbar('Login successful!', { variant: 'success' });
       
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Incorrect password, refresh the page
          console.log('Incorrect password');
          enqueueSnackbar('Incorrect Password! Please check your credentials.', { variant: 'error' });

        } else if (error.response && error.response.status === 404) {
          // User does not exist, navigate to '/signup'
          console.log('User not found in the database');
          enqueueSnackbar('Account does not exits. Please Signup', { variant: 'error' });
          navigate('/signup');
        } else {
          // Other errors, navigate to '/signup'
          console.log('Backend failed to connect to the frontend');
          navigate('/signup');
        }
      });
  };

  return (
    <div className='w-full h-screen bg-slate-900 pt-[2px]'>
     <center> <div className='text-5xl font-black text-slate-300 mt-10 '>CineMagic</div></center>
      <div className='w-[450px] h-[550px] bg-slate-300 p-5 mx-auto mt-[5%]'>
        <center><h1 className='text-3xl font-bold my-9'>Log In</h1></center>
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
            <button type='button' className='m-8 p-3 bg-white rounded-xl w-40 text-[18px] hover:bg-slate-300 hover:shadow-white hover:ring-white hover:ring font-bold' onClick={handleSubmit}>Login</button>
            <div className='bg-white text-center w-[80%] h-10 mt-6 flex justify-center items-center'>
              <Link to={'/signup'} className='font-semibold'>Don't have an account? Sign Up</Link>
            </div>
          </center>
        </form>
      </div>
    </div>
  );
}

export default Login;
