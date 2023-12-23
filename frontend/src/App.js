import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ShowMovie from './pages/ShowMovie';
import EachGenre from './pages/EachGenre';
import Dummy from './pages/Dummy';
import MyProfile from './pages/MyProfile';
import { AuthProvider } from './AuthContext';
import Signup from './pages/Signup';
import { SnackbarProvider } from 'notistack';


function App() {
  return (
    <SnackbarProvider maxSnack={3}> 
    <AuthProvider>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/details/:id' element={<ShowMovie/>}/>
      <Route path='/theatres/:id' element={<ShowMovie/>}/>
      <Route path='/dummy/:id' element={<Dummy/>}/>
      <Route path='/myprofile/:id' element={<MyProfile/>}/>
      <Route path='/genre/:genreName' element={<EachGenre/>}/>
    </Routes>
   </AuthProvider>
   </SnackbarProvider>
  );
}

export default App;
