import React, { Component, } from 'react';
import Nav from '../../NavBar';
import axios from 'axios';
import user from '../../assets/user.png';
import { URL_GET_CAREERS, URL_DEL_CAREERS} 
  from '../constants';
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

  }

  componentDidMount() {
    this._isMounted = true;
    this.loadItems();
  }

  loadItems() {
    const url = `${URL_GET_CAREERS}`;
    axios.get(url).then(response => response.data)
      .then((data) => {
          this.setState({ items: data })   
      })
      .catch(error => console.log(error));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  confirmDelete(id_career){
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.delItem(id_career)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }

  delItem(id_career) {
    const url = `${URL_DEL_CAREERS}`;

    axios.get(url, {
      params: {
        id_career
      }
    }).then(response => response.data)
      .then((data) => {
        this.loadItems();
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
                  <h1>Careers</h1>
                </div>
                <div class="col-sm-6">

                </div>
              </div>
            </div>
          </section>  <div class="content">
            <div class="container-fluid">
            
              <div class="card">
                <div class="card-header p-2">
                  <ul class="nav nav-pills">
                  <a href="#/careers/add/0" class="btn btn-primary btn-block mb-3">Add Job</a>
                  </ul>
                </div>
                {this.state.items && this.state.items.map((item, index) =>
                  <div class="card-body">
                    <div class="tab-content">
                      <div class="active tab-pane" id="activity">
                      </div>
                        <div class="post">
                          <div >
                            <span class="username">
                              <a  href={`#/careers/add/${item.id_career}`} >{`${item.title}`}</a>
                              <a href="#" class="float-right btn-tool">
                                <a href="#" onClick={(e) => {
                                                    e.preventDefault();
                                                    this.confirmDelete(item.id_career)
                                }} ><i  class="fas fa-times"></i></a>
                                
                              </a>
                            </span>
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