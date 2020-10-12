import React, { Component } from 'react';
import Nav from '../NavBar';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Table',
      data: null,
      invoice_no: '',
      date: new Date(),
      dateFrom: new Date(),
      dateTo: new Date(),
      invItems: [],
      activePage: 1,
      totalCount: '',
      show: false,
    }
  }

  componentDidMount() {
    const activePage = this.state.activePage;
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
          </section>          
          <div class="content">
            <div class="container-fluid">
              <div class="row">
             
                <div class="col-lg-12">
                  <div class="card card-info">
                   <div class="card-body">
                                        
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