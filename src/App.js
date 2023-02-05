import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import CFP from './components/CFP'
import { Routes ,Route } from 'react-router-dom';
import Signup from './components/Signup'


function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<CFP/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>

      </Routes>
    </>
  );
}
export default App;