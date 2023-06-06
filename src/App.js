import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import AddPro from './Pages/AddPro'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path='/addProduct' element={ <AddPro /> } />
      </Routes>
    </Fragment>
  );
}

export default App;
