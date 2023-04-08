import './App.css';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import CFP from './pages/CFP';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Publisher from './pages/Publisher';
import Conferences from './pages/Conferences';
import User from './pages/User';
import Admin from './pages/Admin';
import Reviewer from './pages/Reviewer';
import Allconferences from './pages/Allconferences';
import { AnimatePresence } from 'framer-motion';
import Error from './components/Error';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar />
      <AnimatePresence>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/cfp' element={<CFP />} />
          <Route exact path='/publisher' element={<Publisher />} />
          <Route exact path='/userprofile' element={<User />} />
          <Route exact path='/admin' element={<Admin />} />
          <Route exact path='/reviewer' element={<Reviewer />} />
          <Route exact path='/conferences' element={<Conferences />} />
          <Route exact path='/allconferences' element={<Allconferences />} />

          <Route exact path='/#about' element={<Home />} />

          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />

          <Route path='*' element={<Error />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
export default App;
