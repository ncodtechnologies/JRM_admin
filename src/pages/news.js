/* eslint-disable */
import React, { Component, } from 'react';
import Nav from '../NavBar';
import axios from 'axios';
import news from '../assets/news.png';
import FileUpload from "../components/fileUpload";
import DatePicker from 'react-date-picker';
import {URL_GET_NEWS,URL_SAVE_NEWS} from './constants';

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      message: '',
      title: '',
      items: [],
      date: new Date()
    }

    this.onDateChange = this.onDateChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);    
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadItems();
  }

  
  loadItems() {
    const url = `${URL_GET_NEWS}`;
    axios.get(url).then(response => response.data)
      .then((data) => {        
          // this.setState({ items: data })
          var newData = this.state.items.concat([...data.news]);  
          this.setState({items: newData})
          console.log(data.news)
          console.log(this.state.items)
      })
      .catch(error => console.log(error));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value })
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value })
  }

  onDateChange = date => {
    this.setState({ date });   
  }

  formatDate = date => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;  
    return [ day, month, year].join('/');
  }

  render() {

    return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>News & Events</h1>
                </div>
              </div>
            </div>
          </section>  <div class="content">
            <div class="container-fluid">   
              <section class="content">
              
              </section>            
              <div class="card">
                <div class="card-header p-2">
                  <ul class="nav nav-pills">
                  <a href="#/addNews/0" class="btn btn-primary btn-block mb-3">Add News</a>
                  </ul>
                </div>
                {this.state.items && this.state.items.map((item, index) =>
                  <div class="card-body">
                    <div class="tab-content">
                      <div class="active tab-pane" id="activity">
                      </div>
                        <div class="post">
                          <div class="user-block">
                            <img class="img-circle img-bordered-sm" src={news} alt="user image" />
                              <span class="username">
                              <a href="#">{item.title}</a>
                              <a href="#" class="float-right btn-tool">
                                <a href={`/#/addNews/${item.id_news}`}><i  class="fas fa-edit"></i></a>
                              </a>
                            </span>
                            <span class="description">{this.formatDate(item.date)}</span>
                          </div>
                          <p> {item.description} </p>
                        </div>
                      </div>
                    </div>
                )}
              </div>
             </div>
           </div>
        </div>
      </div>  
    );
  }
}


export default App;