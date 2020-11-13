import React, { Component, } from 'react';
import Nav from '../NavBar';
import axios from 'axios';
import {URL_GET_NUMBERS,URL_UPDATE_PROJECTS,URL_UPDATE_PARTNERS,URL_UPDATE_CUSTOMERS
      } from './constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      projects:'',
      customers:'',
      partners:'',
      items: []
    }

    this.onProjectsChange = this.onProjectsChange.bind(this);
    this.onCustomersChange = this.onCustomersChange.bind(this);
    this.onPartnersChange = this.onPartnersChange.bind(this);
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems() {
    const url = `${URL_GET_NUMBERS}`;    
    axios.get(url).then(response => response.data)
      .then((data) => {
          this.setState({
             projects     : data[0].projects ,
             customers    : data[0].customers,
             partners     : data[0].partners,
            })
          // console.log(this.state.items)
      })

  }  

  onProjectsChange(event) {
    this.setState({ projects: event.target.value })
  }

  onCustomersChange(event) {
    this.setState({ customers: event.target.value })
  }

  onPartnersChange(event) {
    this.setState({ partners: event.target.value })
  }
 
  updateProjects= () => {
    const url = `${URL_UPDATE_PROJECTS}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        projects       : this.state.projects,
      })
    };

    fetch(url, requestOptions)
      .then(response => response.json())
  }

  updateCustomers = () => {
    const url =  `${URL_UPDATE_CUSTOMERS}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        customers    : this.state.customers,
      })
    };
    fetch(url, requestOptions)
      .then(response => response.json())
  }

  updatePartners = () => {
    const url =  `${URL_UPDATE_PARTNERS}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        partners : this.state.partners
      })
    };

    fetch(url, requestOptions)
      .then(response => response.json())
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
                  <h1>Numbers</h1>
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
                        <h3 class="card-title">Numbers</h3>
                        <div class="card-tools">
                          <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                      </div>
                       <div class="card-body">
                        <div class="form-group">
                        <label for="inputName">Projects</label>
                        <div class="input-group mb-3">
                          <input type="text" value={this.state.projects} onChange={this.onProjectsChange}  class="form-control"/>
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="fas fa-check"  onClick={this.updateProjects}></i></span>
                              </div>
                          </div>
                        </div>                       
                        <div class="form-group">
                          <label for="inputName">Customers</label>
                          <div class="input-group mb-3">
                              <input type="text" value={this.state.customers} onChange={this.onCustomersChange}  class="form-control" />
                              <div class="input-group-append">
                                <span class="input-group-text"><i class="fas fa-check" onClick={this.updateCustomers}></i></span>
                              </div>
                         </div>                         
                        </div>
                        <div class="form-group">
                          <label for="inputDescription">Partners</label>
                            <div class="input-group mb-3">
                              <input type="text"  value={this.state.partners} onChange={this.onPartnersChange} class="form-control"/>
                              <div class="input-group-append">
                                <span class="input-group-text"><i class="fas fa-check" onClick={this.updatePartners}></i></span>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;