import React, { useState, useEffect } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Testimonial from '../pages/testimonial';
import Banners from '../pages/banners';
import News from '../pages/news';
import Login from '../pages/login';
import Partners from '../pages/partners';
import Products from '../pages/products';
import { createBrowserHistory } from "history";

export default function Routes() {
  //const session = localStorage.getItem('ShadeUser') || ''
  const session='abcd';
  const history = createBrowserHistory();
  
  return session != '' ? (
    <HashRouter history={history}>
      <Route path="/news" component={News} />   
      <Route path="/testimonial" component={Testimonial} />   
      <Route path="/banners" component={Banners} />   
      <Route path="/partners" component={Partners} />  
      <Route path="/products" component={Products} />  
    </HashRouter>
  ) : ( 
    <HashRouter>
      <Route path="/" render={(props) => <Login  {...props}/>}/>
    </HashRouter>
  )
}

