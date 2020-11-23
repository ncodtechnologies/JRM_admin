import React, { Component, } from 'react';
import Nav from '../NavBar';
import axios from 'axios';
import {URL_GET_PARTNERS_IMG,
        URL_GET_CUSTOMERS_IMG,
        URL_FILE_UPLOAD_CUSTOMERS,
        URL_FILE_UPLOAD_PARTNERS,
        URL_SAVE_PARTNER
}
from './constants';
import ImageUploader from 'react-images-upload';

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      title: 'Table',
      data: null,
      items: [],
      selectedFilePartners:'',
      selectedFileCustomers:'',
      picturesPartners: [],
      picturesCustomers: [],
      id:'',
      id_partner:'',
      id_customer:''
    }        
    this.onDropPartners = this.onDropPartners.bind(this); 
    this.onDropCustomers = this.onDropCustomers.bind(this);
    this.submitPartners = this.submitPartners.bind(this);
    this.submitCustomers = this.submitCustomers.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    //this.loadItems();
  }

  /*loadItems() {
    const url = 'http://localhost/JRM_server/controller/getTestimonials.php'
    axios.get(url).then(response => response.data)
      .then((data) => {
        if (this._isMounted) {
          this.setState({ items: data })
        }
      })
  }*/
  componentWillUnmount() {
    this._isMounted = false;
  }

  
  onDropPartners(picture) {
    this.setState({
      picturesPartners: this.state.picturesPartners.concat(picture),
      });  
    }
  
    onDropCustomers(picture) {
    this.setState({
      picturesCustomers: this.state.picturesCustomers.concat(picture),
      });
    }
   
    submitPartners(){
      const data = new FormData() 
      data.append('file', this.state.picturesPartners[0])
  
      let url = `${URL_FILE_UPLOAD_PARTNERS}`;
      axios.post(url, data, { // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
          console.log(res);
      })
   }

  submitCustomers(){
    const data = new FormData() 
    data.append('file', this.state.picturesCustomers[0])

    let url = `${URL_FILE_UPLOAD_CUSTOMERS}`;
    axios.post(url, data, { // receive two parameter endpoint url ,form data 
    })
    .then(res => { // then print response status
        console.log(res);
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
                  <h1>Partners & Customers</h1>
                </div>
              </div>
            </div>
          </section>  <div class="content">
            <div class="container-fluid">              
            <div>     
              
            </div>
              <section class="content">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card card-primary">
                      <div class="card-header">
                        <h3 class="card-title">Partners</h3>

                        <div class="card-tools">
                          <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                      </div>
                     
                      <div class="card-body">
                      <div className="row">
                            <div className="col-md-6 offset-md-3"> 
                                <div className="form-row">
                                     <ImageUploader
                                        withIcon={true}
                                        buttonText='Choose images'
                                        onChange={this.onDropPartners} 
                                        imgExtension={['.jpg','.jpeg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                        name="upload_file"
                                        accept="accept=image/*"
                                    />                                     
                                </div>
                            </div>
                        </div>           
                        <button type="button" class="btn btn-block btn-success btn-flat" onClick={this.submitPartners}>
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
                  <h5>Partners</h5>
                  </ul>
                </div>               
                  <div class="card-body">
                    <div class="tab-content">
                      <div class="active tab-pane" id="activity">
                        <div class="post">
                          <div class="user-block">  
                          </div>                         
                        </div>
                      </div>
                    </div>
                  </div>               
              </div>
              <section class="content">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card card-primary">
                      <div class="card-header">
                        <h3 class="card-title">Customers</h3>

                        <div class="card-tools">
                          <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                      </div>
                     
                      <div class="card-body">
                      <div className="row">
                            <div className="col-md-6 offset-md-3">    
                               <div className="form-row"> 
                                     <ImageUploader
                                        withIcon={true}
                                        buttonText='Choose images'
                                        onChange={this.onDropCustomers} 
                                        imgExtension={['.jpg','.jpeg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                        name="upload_file_bg"
                                        accept="accept=image/*"
                                    />                                     
                                </div>
                            </div>
                        </div>
                       
                        <button type="button" class="btn btn-block btn-success btn-flat" onClick={this.submitCustomers}>
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
                    <h5>Customers</h5>
                  </ul>
                </div>
               
                  <div class="card-body">
                    <div class="tab-content">
                      <div class="active tab-pane" id="activity">
                        <div class="post">
                          <div class="user-block">    
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>               
               </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}


export default App;