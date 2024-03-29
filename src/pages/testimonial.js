import React, { Component, } from 'react';
import Nav from '../NavBar';
import axios from 'axios';
import user from '../assets/user.png';
import { URL_GET_TESTIMONIAL,
  URL_SAVE_TESTIMONIAL,
  URL_DEL_TESTIMONIAL} 
  from './constants';
  import { confirmAlert } from 'react-confirm-alert'; 
  import 'react-confirm-alert/src/react-confirm-alert.css';

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      title: 'Table',
      data: null,
      message: '',
      author: '',
      activePage: 1,
      items: []
    }

    this.onAuthorChange = this.onAuthorChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadItems();
  }

  loadItems() {
    const url = `${URL_GET_TESTIMONIAL}`;
    axios.get(url).then(response => response.data)
      .then((data) => {
          this.setState({ items: data })   
      })
      .catch(error => console.log(error));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onAuthorChange(event) {
    this.setState({ author: event.target.value })
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value })
  }

  confirmDelete(id_testimonial){
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.delItem(id_testimonial)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }

  delItem(id_testimonial) {
    const url = `${URL_DEL_TESTIMONIAL}`;

    axios.get(url, {
      params: {
        id_testimonial: id_testimonial
      }
    }).then(response => response.data)
      .then((data) => {
        this.loadItems();
      })
  }

  saveItem = () => {
    const url = `${URL_SAVE_TESTIMONIAL}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        author: this.state.author,
        message: this.state.message
      })
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then((data) => {        
        // this.setState({ items: data })
       // var newData = this.state.items.concat([...data.news]);  
        //this.setState({id: data})
        console.log(data)
    })
      this.setState({
        author:"",
        message:"",        
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
                  <h1>Testimonial</h1>
                </div>
                <div class="col-sm-6">

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
                        <h3 class="card-title">Add Testimonial</h3>

                        <div class="card-tools">
                          <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="inputName">Author</label>
                          <input type="text" value={this.state.author} onChange={this.onAuthorChange}  class="form-control" />
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
                  <h5>Testimonial</h5>
                  </ul>
                </div>
                {this.state.items && this.state.items.map((item, index) =>
                  <div class="card-body">
                    <div class="tab-content">
                      <div class="active tab-pane" id="activity">
                      </div>
                        <div class="post">
                          <div class="user-block">
                            <img class="img-circle img-bordered-sm" src={user} alt="user image" />
                            <span class="username">
                              <a href="#">{item.author}</a>
                              <a href="#" class="float-right btn-tool">
                                <a href="#" onClick={(e) => {
                                                    e.preventDefault();
                                                    this.confirmDelete(item.id_testimonial)
                                }} ><i  class="fas fa-times"></i></a>
                                
                              </a>
                            </span>
                          </div>
                          <p> {item.message} </p>
                        </div>
                      </div>
                    </div>
                   )}
                </div>
             </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App;