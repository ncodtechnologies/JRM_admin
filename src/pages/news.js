/* eslint-disable */
import React, { Component, } from 'react';
import Nav from '../NavBar';
import axios from 'axios';
import user from '../assets/user.png';
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
      activePage: 1,
      items: [],
      date: new Date()
    }

    this.onDateChange = this.onDateChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);    
  }

  componentDidMount() {
    this._isMounted = true;
   //this.loadItems();
  }
  
  loadItems() {
    const url = `${URL_GET_NEWS}`;
    axios.get(url).then(response => response.data)
      .then((data) => {
        if (this._isMounted) {
          this.setState({ items: data })
          // console.log(this.state.items)
        }
      })
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
    return [year, month, day].join('-');
  }

  saveItem = () => {
    const url = `${URL_SAVE_NEWS}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        date: this.formatDate(this.state.date),
        description: this.state.message
      })
    };
      fetch(url, requestOptions)
      .then(response => response.json())
      this.setState({
        title:"",
        message:"",
        date:new Date()
      })
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
                  <h1>News</h1>
                </div>
              </div>
            </div>
          </section>  <div class="content">
            <div class="container-fluid">   
              <section class="content">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card card-primary">
                      <div class="card-header">
                        <h3 class="card-title">News</h3>

                        <div class="card-tools">
                          <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                      </div>
                     
                      <div class="card-body">
                      <FileUpload />
                        <div class="form-group">
                          <label for="inputDescription">Title</label>
                          <input type="text" value={this.state.title} onChange={this.onTitleChange} class="form-control"/>
                        </div>
                        <div class="form-group">
                          <label>Date</label>
                            <DatePicker
                              className={"form-control"}
                              onChange={this.onDateChange}
                              value={this.state.date}
                              format={"dd/MM/yyyy"}
                          />
                        </div>
                        <div class="form-group">
                          <label for="inputDescription">Message</label>
                          <textarea  value={this.state.message} onChange={this.onMessageChange} class="form-control" rows="4"></textarea>
                        </div>
                        <button type="button" class="btn btn-block btn-success btn-flat" onClick={this.saveItem}>
                            Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>            
              <div class="card">
                <div class="card-header p-2">
                  <ul class="nav nav-pills">
                  <h5>News</h5>
                  </ul>
                </div>
                {this.state.items.map((item, index) =>
                  <div class="card-body">
                    <div class="tab-content">
                      <div class="active tab-pane" id="activity">
                        <div class="post">
                          <div class="user-block">
                            <img class="img-circle img-bordered-sm" src={user} alt="user image" />
                            <span class="username">
                              <a href="#">{item.title}</a>
                              <a href="#" class="float-right btn-tool">
                                <button onClick={() => this.delItem(item.id_news)}><i class="fas fa-times"></i>
                                </button>
                              </a>
                            </span>                            
                          </div>
                          <p> {item.description} </p>
                          <p>
                            <a href="#" class="link-black text-sm mr-2"><i class="fas fa-share mr-1"></i> Share</a>
                            <a href="#" class="link-black text-sm"><i class="far fa-thumbs-up mr-1"></i> Like</a>
                          </p>
                        </div>
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