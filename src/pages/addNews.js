/* eslint-disable */
import React, { Component, } from 'react';
import Nav from '../NavBar';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import ImageUploader from 'react-images-upload';
import {URL_GET_NEWS_DT,
        URL_SAVE_NEWS,
        URL_FILE_UPLOAD_NEWS_IMG,
        URL_FILE_UPLOAD_NEWS_IMG_BG,
        URL_GET_NEWS_IMG,
        URL_GET_NEWS_IMG_BG
      }
   from './constants';


class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      message: '',
      title: '',
      items: [],
      id:'',
      id_news:'',
      loading:false,
      selectedFileImg:'',
      selectedFileImgBg:'',
      picturesImg: [],
      picturesImgBg: [],
      date: new Date()
    }

    this.onDateChange = this.onDateChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);  
    this.onDropImage = this.onDropImage.bind(this); 
    this.onDropImageBg = this.onDropImageBg.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const id_news=this.props.match.params.id_news;
    if(id_news!=0){
      this.loadItems(id_news);
    }
  }

  submitImg(id_news){
          const data = new FormData() 
          data.append('file', this.state.picturesImg[0])
          data.append('id_news', id_news)
          //console.warn(this.state.selectedFile);
       
          let url = `${URL_FILE_UPLOAD_NEWS_IMG}`;
          axios.post(url, data, { // receive two parameter endpoint url ,form data 
          })
          .then(res => { // then print response status
              console.log(res);
          })
      }

  submitImgBg(id_news){
        const data = new FormData() 
        data.append('file', this.state.picturesImgBg[0])
        data.append('id_news', id_news)
        //console.warn(this.state.selectedFile);
     
        let url = `${URL_FILE_UPLOAD_NEWS_IMG_BG}`;
        axios.post(url, data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            console.log(res);
        })
    }

  onDropImage(picture) {
      this.setState({
         picturesImg: this.state.picturesImg.concat(picture),
        });
       
    }
  onDropImageBg(picture) {
      this.setState({
        picturesImgBg: this.state.picturesImgBg.concat(picture),
        });
      
    }

  loadItems(id_news) {   
    const url = `${URL_GET_NEWS_DT}?id=${id_news}`;
    axios.get(url).then(response => response.data)
      .then((data) => {        
          this.setState({
            items:data["news"],
            title: data["news"].title,
            message: data["news"].description,
            date: data["news"].date
          })
           //console.log(this.state.title)
         })        
      .catch(error => console.log(error));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value })
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value })
  }

  onDateChange = date => {
    this.setState({ date });   
  }

  formatDate = date => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;  
    return [year, month, day].join('-');
  }

  saveItem = () => {
    this.setState({
      loading:true
    })
      const url = `${URL_SAVE_NEWS}`;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
          body: JSON.stringify({
          title: this.state.title,
          date: this.formatDate(this.state.date),
          description: this.state.message,
          id_news:this.props.match.params.id_news,        
        })
      };

      fetch(url, requestOptions)      
      .then(response => response.json()) // 1
      .then(data => { 
              console.log(data)
          this.setState({
            loading:false,
            id:data
          })
          const id_news=this.props.match.params.id_news;          
          const id = (id_news>0 ? id_news : this.state.id )           

          this.submitImg(id);
          this.submitImgBg(id);
        }               
      ),
      
      this.setState({     
        title:"",
        message:"",        
        date:new Date()
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
                  <h1>News</h1>
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
                        <h3 class="card-title">News</h3>

                        <div class="card-tools">
                          <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i>
                          </button>
                        </div>
                      </div>                     
                      <div class="card-body">
                       <div className="row">
                            <div className="col-md-6 offset-md-3"> 
                                <label for="inputDescription">Image</label>                             
                                <div className="form-row">
                                 <img src={URL_GET_NEWS_IMG+"/"+this.props.match.params.id_news+".jpeg"} height="70" width="85"/>
                                     <ImageUploader
                                        withIcon={true}
                                        buttonText='Choose images'
                                        onChange={this.onDropImage} 
                                        imgExtension={['.jpg','.jpeg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                        name="upload_file"
                                        accept="accept=image/*"
                                    />                                     
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 offset-md-3">    
                                <label for="inputDescription">Background Image</label>                                                            
                                <div className="form-row"> 
                                <img src={URL_GET_NEWS_IMG_BG+"/"+this.props.match.params.id_news+".jpeg"} height="70" width="85"/>
                                     <ImageUploader
                                        withIcon={true}
                                        buttonText='Choose images'
                                        onChange={this.onDropImageBg} 
                                        imgExtension={['.jpg','.jpeg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                        name="upload_file_bg"
                                        accept="accept=image/*"
                                    />                                     
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                          <label for="inputDescription">Title</label>
                          <input type="text" value={this.state.title} onChange={this.onTitleChange} class="form-control"/>
                        </div>
                        <div class="form-group">
                          <label>Date</label>
                            <DatePicker
                              className={"form-control"}
                              onChange={this.onDateChange}
                              value={this.state.date}
                              format={"dd/MM/yyyy"}
                            />
                        </div>
                        <div class="form-group">
                          <label for="inputDescription">Message</label>
                          <textarea  value={this.state.message} onChange={this.onMessageChange} class="form-control" rows="4"></textarea>
                        </div>
                        <button type="button" class="btn btn-block btn-success btn-flat" onClick={this.saveItem}>
                        {this.state.loading ?<i class="fas fa-1x fa-sync-alt fa-spin"></i> : "Save" }
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
    );
  }
}


export default App;