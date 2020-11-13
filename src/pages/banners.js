import React, { Component, } from 'react';
import Nav from '../NavBar';
import axios from 'axios';
import user from '../assets/user.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Table',
      data: null,
      title: '',
      subtitle: '',
      description:'',
      activePage: 1,
      items: []
    }

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSubtitleChange = this.onSubtitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }

  componentDidMount() {
    this.loadItems();

  }

  loadItems() {
    const url = 'http://localhost/JRM_server/controller/banner/getBanner.php'
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
  

  onTitleChange(event) {
    this.setState({ title: event.target.value })
  }

  onSubtitleChange(event) {
    this.setState({ subtitle: event.target.value })
  }

  onDescriptionChange(event) {
    this.setState({ description: event.target.value })
  }

  delItem(id_testimonial) {

    const url = 'http://localhost/JRM_server/controller/delTestimonial.php/'

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
  updateTitle = () => {
    const url = 'http://localhost/JRM_server/controller/banner/updateTitle.php'
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
      .then(response => response.json())
  }

  updateSubtitle = () => {
    const url = 'http://localhost/JRM_server/controller/banner/updateSubtitle.php'
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
      .then(response => response.json())
  }

  updateDescription = () => {
    const url = 'http://localhost/JRM_server/controller/banner/updateDescription.php'
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
                  <h1>Banners</h1>
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
                        <h3 class="card-title">Banners</h3>

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
                            <span class="input-group-text"><i class="fas fa-check"  onClick={this.updateTitle}></i></span>
                          </div>
                       </div>
                        </div>
                       
                        <div class="form-group">
                          <label for="inputName">Sub Title</label>
                          <div class="input-group mb-3">
                          <input type="text" value={this.state.subtitle} onChange={this.onSubtitleChange}  class="form-control" />
                          <div class="input-group-append">
                            <span class="input-group-text"><i class="fas fa-check" onClick={this.updateSubtitle}></i></span>
                          </div>
                       </div>
                         
                        </div>
                        <div class="form-group">
                          <label for="inputDescription">Description</label>
                          <div class="input-group mb-3">
                          <input type="text"  value={this.state.description} onChange={this.onDescriptionChange} class="form-control" rows="4"/>
                          <div class="input-group-append">
                            <span class="input-group-text"><i class="fas fa-check" onClick={this.updateDescription}></i></span>
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