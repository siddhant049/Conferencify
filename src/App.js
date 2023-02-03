import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import CFP from './components/CFP'
import { Routes ,Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/cfp' element={<CFP/>}/>
      </Routes>
    </>
  );
}
export default App;