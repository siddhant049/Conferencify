import './App.css';
import { Routes ,Route } from 'react-router-dom';
import Login from './pages/Login';
import CFP from './pages/CFP'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Publisher from './pages/Publisher'
import Conferences from './pages/Conferences'

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/cfp' element={<CFP/>}/>
        <Route exact path='/publisher' element={<Publisher/>}/>
        <Route exact path='/conferences' element={<Conferences/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>

      </Routes>
    </>
  );
}
export default App;