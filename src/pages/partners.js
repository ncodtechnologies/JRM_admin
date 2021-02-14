import React, { Component } from "react";
import Nav from "../NavBar";
import axios from "axios";
import {
  URL_GET_PARTNERS_IMG,
  URL_GET_CUSTOMERS_IMG,
  URL_FILE_UPLOAD_CUSTOMERS,
  URL_FILE_UPLOAD_PARTNERS,
  URL_GET_PARTNERS,
  URL_DEL_PARTNER,
  URL_GET_CUSTOMERS,
  URL_DEL_CUSTOMER
} from "./constants";
import ImageUploader from "react-images-upload";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      title: "Table",
      data: null,
      partners: [],
      customers: [],
      selectedFilePartners: "",
      selectedFileCustomers: "",
      picturesPartners: [],
      picturesCustomers: [],
      id: "",
      id_partner: "",
      id_customer: "",
      loading: false,
    };

    this.custImageUploader = React.createRef();
    this.partnerImageUploader = React.createRef();

    this.onDropPartners = this.onDropPartners.bind(this);
    this.onDropCustomers = this.onDropCustomers.bind(this);
    this.submitPartners = this.submitPartners.bind(this);
    this.submitCustomers = this.submitCustomers.bind(this);
  }

  componentDidMount() {
    this.loadPartners();
    this.loadCustomers();
  }

  loadPartners() {
    const url = URL_GET_PARTNERS;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ partners: [...data.partners] });
      });
  }
  loadCustomers() {
    const url = URL_GET_CUSTOMERS;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ customers: [...data.customers] });
      });
  }

  componentWillUnmount() {
    
  }

  confirmDeletePartner(id_partner) {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.delPartner(id_partner),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  delPartner(id_partner) {
    const url = `${URL_DEL_PARTNER}`;
    axios
      .get(url, {
        params: {
          id_partner: id_partner,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        this.loadPartners();
      });
  }


  confirmDeleteCustomer(id_customer) {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.delCustomer(id_customer),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  delCustomer(id_customer) {
    const url = `${URL_DEL_CUSTOMER}`;
    axios
      .get(url, {
        params: {
          id_customer: id_customer,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        this.loadCustomers();
      });
  }

  onDropPartners(picture) {
    this.setState({
      picturesPartners: this.state.picturesPartners[0] = (picture),
    });
  }

  onDropCustomers(picture) {
    this.setState({
      picturesCustomers: this.state.picturesCustomers[0] = (picture),
    });
  }

  submitPartners() {
    this.setState({ loading: true });
    const data = new FormData();
    data.append("file", this.state.picturesPartners[0]);

    let url = `${URL_FILE_UPLOAD_PARTNERS}`;
    axios
      .post(url, data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res);
        this.setState({ loading: false });
        this.loadPartners();
        this.partnerImageUploader.current.clearPictures()
      });
  }

  submitCustomers() {
    this.setState({ loading: true });
    const data = new FormData();
    data.append("file", this.state.picturesCustomers[0]);

    let url = `${URL_FILE_UPLOAD_CUSTOMERS}`;
    axios
      .post(url, data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        this.setState({ loading: false });
        this.loadCustomers();
        console.log(res);
        this.custImageUploader.current.clearPictures()
      });
  }

  render() {
    return (
      <div class="wrapper">
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
          </section>
          <div class="content">
            <div class="container-fluid">
              <div></div>
              <section class="content">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card card-primary">
                      <div class="card-header">
                        <h3 class="card-title">Partners</h3>
                        <div class="card-tools">
                          <button
                            type="button"
                            class="btn btn-tool"
                            data-card-widget="collapse"
                            data-toggle="tooltip"
                            title="Collapse"
                          >
                            <i class="fas fa-minus"></i>
                          </button>
                        </div>
                      </div>
                      <div class="card-body">
                        <div className="row">
                          <div className="col-md-6 offset-md-3">
                            <div className="form-row">
                              <ImageUploader
                                withIcon={true}
                                buttonText="Choose images"
                                onChange={this.onDropPartners}
                                imgExtension={[".png"]}
                                maxFileSize={5242880}
                                withPreview={true}
                                name="upload_file"
                                accept="accept=image/*"
                                singleImage
                                ref={this.partnerImageUploader}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <button
                            type="button"
                            class="btn btn-block btn-success btn-flat"
                            onClick={this.submitPartners}
                          >
                            {this.state.loading ? (
                              <i class="fas fa-1x fa-sync-alt fa-spin"></i>
                            ) : (
                              "Save"
                            )}
                          </button>
                        </div>
                        <div class="col-md-12">
                          <div class="row">
                                {this.state.partners &&
                                  this.state.partners.map((item, index) => (
                                    <div class="col-sm-3">
                                      <div class="card-body">
                                        <div class="tab-content">
                                          <div class="post">
                                            <div class="user-block">
                                              <span class="username">
                                                <a
                                                  href="#"
                                                  class="float-right btn-tool"
                                                >
                                                  <a
                                                    href="#"
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      this.confirmDeletePartner(
                                                        item.id_partner
                                                      );
                                                    }}
                                                  >
                                                    <i class="fas fa-times"></i>
                                                  </a>
                                                </a>
                                              </span>
                                            </div>
                                            <img
                                              class="img-fluid pad"
                                              src={
                                                URL_GET_PARTNERS_IMG +
                                                "/" +
                                                item.id_partner +
                                                ".png"
                                              }
                                              alt="Photo"
                                              style={{
                                                display: "block",
                                                maxWidth: 300,
                                                maxHeight: 100,
                                                width: "auto",
                                                height: "auto",
                                                backgroundColor: "#000",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section class="content">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card card-primary">
                      <div class="card-header">
                        <h3 class="card-title">Customers</h3>

                        <div class="card-tools">
                          <button
                            type="button"
                            class="btn btn-tool"
                            data-card-widget="collapse"
                            data-toggle="tooltip"
                            title="Collapse"
                          >
                            <i class="fas fa-minus"></i>
                          </button>
                        </div>
                      </div>

                      <div class="card-body">
                        <div className="row">
                          <div className="col-md-6 offset-md-3">
                            <div className="form-row">
                              <ImageUploader
                                withIcon={true}
                                buttonText="Choose images"
                                onChange={this.onDropCustomers}
                                imgExtension={[".png"]}
                                maxFileSize={5242880}
                                withPreview={true}
                                name="upload_file_bg"
                                accept="accept=image/*"
                                singleImage
                                ref={this.custImageUploader}
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          class="btn btn-block btn-success btn-flat"
                          onClick={this.submitCustomers}
                        >
                          {this.state.loading ? (
                            <i class="fas fa-1x fa-sync-alt fa-spin"></i>
                          ) : (
                            "Save"
                          )}
                        </button>

                        <div class="col-md-12">
                          <div class="row">
                                {this.state.customers &&
                                  this.state.customers.map((item, index) => (
                                    <div class="col-sm-3">
                                      <div class="card-body">
                                        <div class="tab-content">
                                          <div class="post">
                                            <div class="user-block">
                                              <span class="username">
                                                <a
                                                  href="#"
                                                  class="float-right btn-tool"
                                                >
                                                  <a
                                                    href="#"
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      this.confirmDeleteCustomer(
                                                        item.id_customer
                                                      );
                                                    }}
                                                  >
                                                    <i class="fas fa-times"></i>
                                                  </a>
                                                </a>
                                              </span>
                                            </div>
                                            <img
                                              class="img-fluid pad"
                                              src={
                                                URL_GET_CUSTOMERS_IMG +
                                                "/" +
                                                item.id_customer +
                                                ".png"
                                              }
                                              alt="Photo"
                                              style={{
                                                display: "block",
                                                maxWidth: 300,
                                                maxHeight: 100,
                                                width: "auto",
                                                height: "auto",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
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
    );
  }
}

export default App;
