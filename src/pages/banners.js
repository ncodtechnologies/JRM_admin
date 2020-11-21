import React, { Component, } from 'react';
import Nav from '../NavBar';
import axios from 'axios';
import user from '../assets/user.png';
import {URL_GET_NUMBERS,URL_UPDATE_PROJECTS,URL_UPDATE_PARTNERS,URL_UPDATE_CUSTOMERS,
        URL_GET_BANNERS,URL_UPDATE_TITLE,URL_UPDATE_SUBTITLE,URL_UPDATE_DESCRIPTION
} from './constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Table',
      data: null,
      title: '',
      subtitle: '',
      description:'',
      projects:'',
      customers:'',
      partners:'',
      loadingTitle:false,
      loadingSubtitle:false,
      loadingDescription:false,
      loadingProjects:false,
      loadingCustomers:false,
      loadingPartners:false,
      items: []
    }

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSubtitleChange = this.onSubtitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onProjectsChange = this.onProjectsChange.bind(this);
    this.onCustomersChange = this.onCustomersChange.bind(this);
    this.onPartnersChange = this.onPartnersChange.bind(this);
  }

  componentDidMount() {
    this.loadBannerItems();
    this.loadNumbersItems();
  }

  loadBannerItems() {
    const url = URL_GET_BANNERS
    axios.get(url).then(response => response.data)
      .then((data) => {
          this.setState({
             title       : data[0].title ,
             subtitle    : data[0].subtitle,
             description : data[0].description,
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
    this.setState({
      loadingProjects:true
    })
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
      .then(response => { 
        return response.json(),
          this.setState({
            loadingProjects:false
          })
    })
  }


  updateCustomers = () => {
    this.setState({
      loadingCustomers:true
    })
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
      .then(response => { 
        return response.json(),
          this.setState({
            loadingCustomers:false
          })
    })
  }


  updatePartners = () => {
    this.setState({
      loadingPartners:true
    })
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
      .then(response => { 
        return response.json(),
          this.setState({
            loadingPartners:false
          })
    })
  }

  loadNumbersItems() {
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

  onTitleChange(event) {
    this.setState({ title: event.target.value })
  }

  onSubtitleChange(event) {
    this.setState({ subtitle: event.target.value })
  }

  onDescriptionChange(event) {
    this.setState({ description: event.target.value })
  }

 
  updateTitle = () => {
    this.setState({
      loadingTitle:true
    })
    const url = URL_UPDATE_TITLE
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title       : this.state.title,
      })
    };

    fetch(url, requestOptions)
      .then(response => { 
        return response.json(),
          this.setState({
            loadingTitle:false
          })
    })
  }

   updateSubtitle = () => {
    this.setState({
      loadingSubtitle:true
    })
    const url = URL_UPDATE_SUBTITLE
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        subtitle    : this.state.subtitle,
      })
    };

    fetch(url, requestOptions)
      .then(response => 
        { 
          return response.json(),
            this.setState({
              loadingSubtitle:false
            })
      })
  }

  updateDescription = () => {
    this.setState({
      loadingDescription:true
    })
    const url = URL_UPDATE_DESCRIPTION
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        description : this.state.description
      })
    };

    fetch(url, requestOptions)
      .then(response => { 
        return response.json(),
          this.setState({
            loadingDescription:false
          })
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
                  <h1>Home</h1>
                </div>
                <div class="col-sm-6">

                </div>
              </div>
            </div>
          </section>  
          <div class="content">
            <div class="container-fluid">
             <section class="content">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card card-primary">
                      <div class="card-header">
                        <h3 class="card-title">Banner</h3>

                        <div class="card-tools">
                          <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                      </div>
                       <div class="card-body">
                        <div class="form-group">
                        <label for="inputName">Title</label>
                        <div class="input-group mb-3">
                          <input type="text" value={this.state.title} onChange={this.onTitleChange}  class="form-control"/>
                          <div class="input-group-append">
                            <span class="input-group-text">{this.state.loadingTitle ?<i class="fas fa-1x fa-sync-alt fa-spin"></i> : <i class="fas fa-check" onClick={this.updateTitle}></i> }</span>
                          </div>
                       </div>
                        </div>
                       
                        <div class="form-group">
                          <label for="inputName">Subtitle</label>
                          <div class="input-group mb-3">
                          <input type="text" value={this.state.subtitle} onChange={this.onSubtitleChange}  class="form-control" />
                          <div class="input-group-append">
                            <span class="input-group-text">{this.state.loadingSubtitle ?<i class="fas fa-1x fa-sync-alt fa-spin"></i> : <i class="fas fa-check" onClick={this.updateSubtitle}></i> }</span>
                          </div>
                       </div>
                         
                        </div>
                        <div class="form-group">
                          <label for="inputDescription">Description</label>
                          <div class="input-group mb-3">
                          <input type="text"  value={this.state.description} onChange={this.onDescriptionChange} class="form-control" rows="4"/>
                          <div class="input-group-append">
    <span class="input-group-text">{this.state.loadingDescription ?<i class="fas fa-1x fa-sync-alt fa-spin"></i> : <i class="fas fa-check" onClick={this.updateDescription}></i>}</span>
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
          <div class="content">
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
                              <span class="input-group-text">{this.state.loadingProjects ?<i class="fas fa-1x fa-sync-alt fa-spin"></i> : <i class="fas fa-check"  onClick={this.updateProjects}></i>}</span>
                              </div>
                          </div>
                        </div>                       
                        <div class="form-group">
                          <label for="inputName">Customers</label>
                          <div class="input-group mb-3">
                              <input type="text" value={this.state.customers} onChange={this.onCustomersChange}  class="form-control" />
                              <div class="input-group-append">
                                <span class="input-group-text">{this.state.loadingCustomers ?<i class="fas fa-1x fa-sync-alt fa-spin"></i> : <i class="fas fa-check" onClick={this.updateCustomers}></i>}</span>
                              </div>
                         </div>                         
                        </div>
                        <div class="form-group">
                          <label for="inputDescription">Partners</label>
                            <div class="input-group mb-3">
                              <input type="text"  value={this.state.partners} onChange={this.onPartnersChange} class="form-control"/>
                              <div class="input-group-append">
                                <span class="input-group-text">{this.state.loadingPartners ?<i class="fas fa-1x fa-sync-alt fa-spin"></i> : <i class="fas fa-check" onClick={this.updatePartners}></i>}</span>
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