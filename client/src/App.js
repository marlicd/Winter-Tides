import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Campers from './pages/Campers';
import SignUp from './pages/SignUp';


function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/campers' element={<Campers />}/>
        <Route path='/signup' element={<SignUp />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
