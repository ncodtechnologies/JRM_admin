import React, { Component, } from 'react';
import Nav from '../../NavBar';
import axios from 'axios';
import user from '../../assets/user.png';
import { URL_ADD_CAREERS, URL_GET_CAREER_DT, URL_UPD_CAREERS } 
  from '../constants';
  import { confirmAlert } from 'react-confirm-alert'; 
  import 'react-confirm-alert/src/react-confirm-alert.css';
import { Redirect } from 'react-router-dom';

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      title: "",
      type: "",
      about: "",
      description: "",
      activePage: 1,
      items: []
    }

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onAboutChange = this.onAboutChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const id_career=this.props.match.params.id_career;
    if(id_career!=0){
      this.loadItems(id_career);
    }
  }

  loadItems(id_career) {   
    const url = `${URL_GET_CAREER_DT}?id=${id_career}`;
    axios.get(url).then(response => response.data)
      .then((data) => {     
        console.log(data);   
          this.setState({
            title:data[0].title,
            type: data[0].type,
            about: data[0].about_job,
            description: data[0].job_description,
          })
         })        
      .catch(error => console.log(error));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value })
  }

  onTypeChange(event) {
    this.setState({ type: event.target.value })
  }

  onAboutChange(event) {
    this.setState({ about: event.target.value })
  }

  onDescriptionChange(event) {
    this.setState({ description: event.target.value })
  }

  saveItem = () => {
    const url = this.props.match.params.id_career == 0 ? URL_ADD_CAREERS : URL_UPD_CAREERS;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        type: this.state.type,
        about: this.state.about,
        description: this.state.description,
        id_career: this.props.match.params.id_career
      })
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then((data) => {        
        console.log(data)
        this.setState({redirect: true});
    })
      this.setState({
        title:"",
        type:"",
        about:"",
        description:""   
      })

  }

  render() {

    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/careers'/>;
     }

    return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Job</h1>
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
                        <h3 class="card-title">Job Details</h3>

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
                          <label for="inputName">Type</label>
                          <input type="text" value={this.state.type} onChange={this.onTypeChange}  class="form-control" />
                        </div>
                        <div class="form-group">
                          <label for="inputDescription">About the Job</label>
                          <textarea  value={this.state.about} onChange={this.onAboutChange} class="form-control" rows="4"></textarea>
                        </div>
                        <div class="form-group">
                          <label for="inputDescription">Job Requirements</label>
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
            
             </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App;