import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Blog from './components/Blog';
import Detail from './components/Blog/Detail';
import Member from './components/Member';
import Home from './components/Home';
import Account from './components/Account';
import Register from './components/Member/register';
import Login from './components/Member/login';
import MyProduct from './components/Product/MyProduct';
import CreateProduct from './components/Product/CreateProduct';
import UpdateProduct from './components/Product/UpdateProduct';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route  path='/blog/list' element={<Blog/>}/>
        <Route  path='/blog/detail/:id' element={<Detail/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/my-product' element={<MyProduct/>}/>
        <Route path='/create-product' element={<CreateProduct/>}/>
        <Route path='/update-product/:id' element={<UpdateProduct/>}/>
      </Routes>
    </App>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
