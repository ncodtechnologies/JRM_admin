import React, { Component, } from 'react';
import Nav from '../NavBar';
import axios from 'axios';
import user from '../assets/user.png';
import { URL_GET_TESTIMONIAL,
  URL_SAVE_TESTIMONIAL,
  URL_DEL_TESTIMONIAL} 
  from './constants';

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
    const activePage = this.state.activePage;
    this.loadItems();

  }

  loadItems() {
    const url = `${URL_GET_TESTIMONIAL}`;
    axios.get(url).then(response => response.data)
      .then((data) => {
          this.setState({ items: data })
          // console.log(this.state.items)
   
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

  delItem(id_testimonial) {

    const url = `${URL_DEL_TESTIMONIAL}`;

    axios.get(url, {
      params: {
        id: id_testimonial
      }
    }).then(response => response.data)
      .then((data) => {
        if (data.length > 0) {
          this.setState({ items: data })
          //console.log(this.state.items)
        }
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
                        <h3 class="card-title">Testimonial</h3>

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
                    <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Testimonial</a></li>
                  </ul>
                </div>
                {this.state.items && this.state.items.map((item, index) =>

                  <div class="card-body">
                    <div class="tab-content">
                      <div class="active tab-pane" id="activity">

                        <div class="post">
                          <div class="user-block">
                            <img class="img-circle img-bordered-sm" src={user} alt="user image" />
                            <span class="username">
                              <a href="#">{item.author}</a>
                              <a href="#" class="float-right btn-tool">
                                <button onClick={() => this.delItem(item.id_testimonial)}><i class="fas fa-times"></i>
                                </button>
                              </a>
                            </span>
                            <span class="description">Shared publicly - 7:30 PM today</span>
                          </div>
                          <p> {item.message} </p>
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