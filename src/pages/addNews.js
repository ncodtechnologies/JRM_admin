/* eslint-disable */
import React, { Component, } from 'react';
import Nav from '../NavBar';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import ImageUploader from 'react-images-upload';
import {URL_GET_NEWS_DT,
        URL_SAVE_NEWS,
        URL_UPDATE_NEWS,
        URL_FILE_UPLOAD_NEWS_IMG,
        URL_FILE_UPLOAD_NEWS_IMG_BG,
        URL_GET_NEWS_IMG,
        URL_GET_NEWS_IMG_BG
      }
   from './constants';
import { Redirect } from 'react-router'

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
      loadingImg:false,
      loadingBgImg:false,
      selectedFileImg:'',
      selectedFileImgBg:'',
      picturesImg: [],
      picturesImgBg: [],
      date: new Date(),
      newsImageExist: false,
      bgImageExist: false,
      changeNewsImage: false,
      changeBgImage: false,
      redirect: false,
    }

    this.onDateChange = this.onDateChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);  
    this.onDropImage = this.onDropImage.bind(this); 
    this.onDropImageBg = this.onDropImageBg.bind(this);
    this.checkImages = this.checkImages.bind(this);
    this.hasBgImg = this.hasBgImg.bind(this);
    this.hasNewsImg = this.hasNewsImg.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const id_news=this.props.match.params.id_news;
    if(id_news!=0){
      this.loadItems(id_news);
    }
    this.checkImages();
    window.setEditor();
  }

  hasBgImg (){
    this.setState({bgImageExist: true})
  }

  hasNewsImg (){
    this.setState({newsImageExist: true})
  }

  checkImages () {
    this.checkImage(URL_GET_NEWS_IMG+"/"+this.props.match.params.id_news+".jpeg",
      this.hasNewsImg, function(){  } 
    );
    this.checkImage(URL_GET_NEWS_IMG_BG+"/"+this.props.match.params.id_news+".jpeg",
      this.hasBgImg, function(){ } );
  }


  checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.src = imageSrc;
    img.onload = good; 
    img.onerror = bad;
}

  submitImg(id_news){
          if(this.state.picturesImg.length == 0){
            this.submitImgBg(id_news);
          }
          else
          {
            const data = new FormData() 
            data.append('file', this.state.picturesImg[0])
            data.append('id_news', id_news)
            //console.warn(this.state.selectedFile);
        
            let url = `${URL_FILE_UPLOAD_NEWS_IMG}`;
            axios.post(url, data, { // receive two parameter endpoint url ,form data 
            })
            .then(res => { // then print response status
                console.log(res);
                this.submitImgBg(id_news);
            })
          }
      }

  submitImgBg(id_news){
        if(this.state.picturesImgBg.length == 0)
        {
          this.setState({loading: false, redirect: true});
        }
        else{
          const data = new FormData() 
          data.append('file', this.state.picturesImgBg[0])
          data.append('id_news', id_news)
          //console.warn(this.state.selectedFile);
      
          let url = `${URL_FILE_UPLOAD_NEWS_IMG_BG}`;
          axios.post(url, data, { // receive two parameter endpoint url ,form data 
          })
          .then(res => { // then print response status
              console.log(res);
              this.setState({loading: false, redirect: true});
          })
      }
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
            date: new Date(data["news"].date)
          })
          window.setEditorText(data["news"].description);
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

  onDateChange(date) {
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
    const message = window.getJQVal("#txtEditor");
      const url = this.props.match.params.id_news == 0 ? URL_SAVE_NEWS : URL_UPDATE_NEWS;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
          body: JSON.stringify({
          title: this.state.title,
          date: this.formatDate(this.state.date),
          description: message,
          id_news:this.props.match.params.id_news,        
        })
      };

      fetch(url, requestOptions)      
      .then(response => response.json()) // 1
      .then(data => { 
              console.log(data)
          this.setState({
            id:data
          })
          const id_news=this.props.match.params.id_news;          
          const id = (id_news>0 ? id_news : this.state.id )           

          this.submitImg(id);
        }               
      )
       
  }

  render() {

    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/news'/>;
     }

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
                                <label for="inputDescription">Image1</label>                             
                                <div className="form-row">
                                  {(this.state.newsImageExist && !this.state.changeNewsImage) ?
                                 <img src={URL_GET_NEWS_IMG+"/"+this.props.match.params.id_news+".jpeg"}
                                  style={{display: "block", maxWidth: 500, maxHeight: 200, width: "auto", height: "auto"}}
                                />
                                 :
                                     <ImageUploader
                                        withIcon={true}
                                        buttonText='Choose image'
                                        onChange={this.onDropImage} 
                                        imgExtension={['.jpg','.jpeg']}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                        name="upload_file"
                                        accept="accept=image/*"
                                        singleImage
                                    />    
                                  }                                 
                                </div>
                                {(this.state.newsImageExist && !this.state.changeNewsImage) &&
                                  <a href="#" onClick={(e)=>{
                                    e.preventDefault();
                                    this.setState({changeNewsImage: true})
                                  }} >Change Image</a>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 offset-md-3">    
                                <label for="inputDescription">Image2</label>                                                            
                                <div className="form-row"> 
                                {(this.state.bgImageExist && !this.state.changeBgImage) ?
                                <img src={URL_GET_NEWS_IMG_BG+"/"+this.props.match.params.id_news+".jpeg"} 
                                  style={{display: "block", maxWidth: 500, maxHeight: 200, width: "auto", height: "auto"}}
                                />
                                :
                                     <ImageUploader
                                        withIcon={true}
                                        buttonText='Choose image'
                                        onChange={this.onDropImageBg} 
                                        imgExtension={['.jpg','.jpeg']}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                        name="upload_file_bg"
                                        accept="accept=image/*"
                                        singleImage
                                    />          
                                }                           
                                </div>
                                {(this.state.bgImageExist && !this.state.changeBgImage) &&
                                  <a href="#" onClick={(e)=>{
                                    e.preventDefault();
                                    this.setState({changeBgImage: true})
                                  }} >Change Image</a>
                                }
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
                              value={new Date(this.state.date)}
                              format={"dd/MM/yyyy"}
                            />
                        </div>
                        <div class="form-group">
                          <label for="inputDescription">Message</label>
							            <textarea id="txtEditor"></textarea> 
                       {/*   <textarea  value={this.state.message} onChange={this.onMessageChange} class="form-control" rows="15"></textarea>
                       */} </div>
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