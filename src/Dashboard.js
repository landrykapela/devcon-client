import React from "react";
import CustomList from "./CustomList2.js";
import AlertDialog from "./AlertDialog.js";
import { Spinner } from "react-bootstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.delete = this.delete.bind(this);
    this.state = {
      data: [],
      dataChanged: false,
      dialog: null,
      loadingData: false
    };
  }
  delete() {
    if (this.state.dialog !== null) {
      console.log("starting to delete...");
      let dialog = this.state.dialog;
      if (dialog.group === "languages") {
        //  let lang = this.source.professional.languages.splice(dialog.id);
        this.source.professional.languages[dialog.id] = "deleted language";

        console.log("delete: " + this.state.dataChanged);
        this.setState({ data: this.source, dataChanged: true }, () => {
          console.log(
            "Successfully " +
              this.state.dataChanged +
              " deleted " +
              this.state.data.languages[dialog.id]
          );
          if (this.state.dataChanged) {
            this.setState({ dataChanged: false, dialog: null }, () => {
              console.log("dataChanged: " + this.state.dataChanged);
            });
          }
        });
      }
      //  this.source[dialog.category][dialog.group][dialog.id]
    }
    this.hideDialog();
  }
  showDialog(x) {
    console.log("attempting to delete..." + x);
    if (x !== null) {
      this.setState({ dialog: x }, () => {
        console.log("dialog title: " + this.state.dialog.title);
      });
    }
  }
  hideDialog() {
    this.setState({ dialog: null }, () => {
      console.log("Successfully unmounted dialog");
    });
  }

  componentDidMount() {
    this.setState(ps => ({ loadingData: true }));
    let parts = window.location.href.split("/");
    let id = parts[parts.length - 1];
    console.log("id: " + id);
    fetch("http://localhost:5000/api/dev/" + id)
      .then(res => res.json())
      .then(result => {
        this.setState(prev => {
          return { data: result.dev, loadingData: false };
        });
      });
  }

  handleClick() {
    console.log("clicked image: " + this.state.data.pic);
    const imageUpload = document.getElementById("profileImageUpload");
    const uploadedImage = document.getElementById("profileImage");
    imageUpload.click();
    imageUpload.onchange = () => {
      let file = imageUpload.files[0];
      let imageUrl = file ? URL.createObjectURL(file) : uploadedImage.src;
      uploadedImage.onload = () => {
        URL.revokeObjectURL(imageUrl);
      };
      uploadedImage.src = imageUrl;
    };
  }
  render() {
    if (this.state.loadingData) {
      return (
        <div className="spinner">
          <Spinner animation="grow" variant="success" />
        </div>
      );
    } else {
      if (!this.state.data.languages) {
        return (
          <div className="spinner">
            <h1>Cannot retrieve any information</h1>
          </div>
        );
      } else {
        return (
          <div className="dashboard">
            <div className="personal-details">
              <div className="info">
                <h1>User Profile</h1>
                <input
                  type="file"
                  className="hidden"
                  id="profileImageUpload"
                  accept="image/*"
                />
                <img
                  id="profileImage"
                  className="profileImage"
                  src={this.state.data.pic}
                  alt={this.state.data.name}
                  onClick={this.handleClick}
                />
              </div>
              <div className="info left">
                <p>{this.state.data.name} </p>
                <p>{this.state.data.profession} </p>
                <p>{this.state.data.email} </p>
                {this.state.data.links.map(link => (
                  <a key={link} href={link}>
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div className="professional-details">
              {this.state.data.Skills ? (
                <div className="pro-info card border-primary">
                  <div className="card-title">
                    <h3>Skills</h3>
                  </div>

                  <CustomList
                    cssClass="card-list"
                    items={this.state.data.Skills}
                    types="skills"
                    editable={true}
                  />
                </div>
              ) : null}
              {this.state.data.languages ? (
                <div className="pro-info card border-primary">
                  <div className="card-title">
                    <h3>Languages</h3>
                  </div>
                  <CustomList
                    cssClass="card-list"
                    items={this.state.data.languages}
                    types="languages"
                    editable={true}
                    onClick={this.showDialog}
                  />
                </div>
              ) : null}
              {this.state.data.frameworks ? (
                <div className="pro-info card border-primary">
                  <div className="card-title">
                    <h3>Frameworks/Libraries</h3>
                  </div>
                  <CustomList
                    cssClass="card-list"
                    items={
                      this.state.data.frameworks
                        ? this.state.data.frameworks
                        : []
                    }
                    types="frameworks"
                    editable={true}
                  />
                </div>
              ) : null}
              {this.state.data.work ? (
                <div className="pro-info card border-primary">
                  <div className="card-title">
                    <h3>Accomplished Work</h3>
                  </div>
                  <CustomList
                    cssClass="card-list"
                    items={this.state.data.work}
                    types="work"
                    editable={true}
                  />
                </div>
              ) : null}
            </div>
            {this.state.dialog !== null ? (
              <AlertDialog
                yesNo={true}
                title={this.state.dialog.title}
                message={this.state.dialog.message}
                unmount={this.hideDialog}
                delete={this.delete}
              />
            ) : null}
          </div>
        );
      }
    }
  }
}
export default Dashboard;
