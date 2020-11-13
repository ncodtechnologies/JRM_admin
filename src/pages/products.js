import React, { Component, } from 'react';
import Nav from '../NavBar';
import axios from 'axios';
import user from '../assets/user.png';
import { URL_SAVE_PRODUCT,
         URL_DEL_PRODUCT,
         URL_GET_PRODUCT} 
         from './constants';

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      description: '',
      title: '',
      items: [],
      isLoaded:false,
    }
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
   // this.loadItems();
  }

  loadItems() {
    const url = `${URL_GET_PRODUCT}`;
    axios.get(url).then(response => response.data)
      .then((data) => { 
        if (this._isMounted){
          this.setState({
            isLoaded: true,
            items: data 
          })
        }          // console.log(this.state.items)   
     })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value })
  }

  onDescriptionChange(event) {
    this.setState({ description: event.target.value })
  }

  delItem(id_product) {
    const url = `${URL_DEL_PRODUCT}`;
    axios.get(url, {
      params: {
        id_product: id_product
      }
    }).then(response => response.data)
      .then((data) => {
        {
          this.setState({ items: data })
          //console.log(this.state.items)
        }
        this.loadItems();
      })

  }

  saveItem = () => {
    const url = `${URL_SAVE_PRODUCT}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description
      })
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      this.setState({
        title:"",
        description:"",
        
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
                  <h1>Products & Solutions</h1>
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
                        <h3 class="card-title">Products & Solutions</h3>
                        <div class="card-tools">
                          <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="inputName">Title</label>
                          <input type="text" value={this.state.title} onChange={this.onTitleChange}  class="form-control" />
                        </div>
                        <div class="form-group">
                          <label for="inputDescription">Description</label>
                          <textarea  value={this.state.description} onChange={this.onDescriptionChange} class="form-control" rows="4"></textarea>
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
                    <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Products & Solutions</a></li>
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
                                <button onClick={() => this.delItem(item.id_testimonial)}><i class="fas fa-times"></i>
                                </button>
                              </a>
                            </span>
                            <span class="description">Shared publicly - 7:30 PM today</span>
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
    )
  }
}


export default App;