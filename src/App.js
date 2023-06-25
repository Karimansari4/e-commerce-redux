import logo from './logo.svg';
import './App.css';
import { Fragment, useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import AddPro from './Pages/AddPro'
import { Route, Routes } from 'react-router-dom';
import UpdatePro from './Pages/UpdatePro';
import DetailsPro from './Pages/DetailsPro';
import CartPro from './Pages/CartPro';
/* import { useDispatch } from 'react-redux';
import { AddCart } from './redux/cartSystem'; */

// // json-server db.json --port 4000,
// https://my-json-server.typicode.com/Karimansari4/e-commerce-redux/products
// http://localhost:4000/products

function App() {

  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path='/cartPage' element={ <CartPro /> } />
        <Route path='/addProduct' element={ <AddPro /> } />
        <Route path='/updateProduct/:id' element={ <UpdatePro /> } />
        <Route path="/details/:id" element={ <DetailsPro /> } />
      </Routes>
    </Fragment>
  );
}

export default App;
