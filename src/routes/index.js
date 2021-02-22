import React, { useState, useEffect } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Testimonial from '../pages/testimonial';
import Banners from '../pages/banners';
import News from '../pages/news';
import Login from '../pages/login';
import Partners from '../pages/partners';
import Products from '../pages/products';
import AddNews from '../pages/addNews';
import AddCareer from '../pages/careers/addcareer';
import ViewCareers from '../pages/careers/viewCareers';
import { createBrowserHistory } from "history";

export default function Routes() {
  const session =  localStorage.getItem('JRMUser') || ''
 
  const history = createBrowserHistory();
  
  return session != '' ? (
    <HashRouter history={history}>
      <Route path="/news" component={News} />   
      <Route path="/testimonial" component={Testimonial} />   
      <Route path="/" exact component={Banners} />   
      <Route path="/banners" component={Banners} />   
      <Route path="/partners" component={Partners} />  
      <Route path="/products" component={Products} />  
      <Route path="/addNews/:id_news" component={AddNews} /> 
      <Route path="/login" component={Login} />  
      <Route path="/careers/add/:id_career" exact component={AddCareer} />  
      <Route path="/careers" exact component={ViewCareers} />  
    </HashRouter>
  ) : ( 
    <HashRouter>
      <Route path="/" render={(props) => <Login  {...props}/>}/>
    </HashRouter>
  )
}

