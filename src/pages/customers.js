import React, { Component, } from 'react';
import Nav from '../NavBar';
import axios from 'axios';
import FileUpload from "../components/fileUploadPartners";

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      title: 'Table',
      data: null,
      items: [],
      pictures: []
    }
    
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadItems();
  }

  loadItems() {
    const url = 'http://localhost/JRM_server/controller/getTestimonials.php'
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


  render() {

    return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Customers</h1>
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
                        <h3 class="card-title">Customers</h3>

                        <div class="card-tools">
                          <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                      </div>
                     
                      <div class="card-body">
                      <FileUpload />
                       
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
                    <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Customers</a></li>
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