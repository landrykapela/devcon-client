import React from "react";
import CustomList from "./CustomList2.js";
import { Spinner } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Redirect } from "react-router-dom";
import ProForm from "./ProForm";
import LinkDialog from "./LinkDialog.js";
import EditForm from "./EditForm";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log("props: ", props);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.delete = this.delete.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.showForm = this.showForm.bind(this);
    this.handleSubmitPro = this.handleSubmitPro.bind(this);
    this.handleLinkButton = this.handleLinkButton.bind(this);
    this.changeView = this.changeView.bind(this);
    this.updateSource = this.updateSource.bind(this);
    this.base64Encode = this.base64Encode.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.source = {};
    this.state = props.location.state || {
      authenticated: false,
      uid: null,
      type: null,
      name: this.source.name,
      email: this.source.email,
      experience: this.source.experience,
      links: this.source.links,
      pic: this.source.pic,
      profession: this.source.profession,
      skills: this.source.skills,
      languages: this.source.languages,
      frameworks: this.source.frameworks,
      work: this.source.work,
      dataChanged: false,
      dialog: null,
      loadingData: false,
      error: "",
      isError: false,
      progress: null,
      proform: null,
      editform: null,
      buttonClicked: false,
      linkChanged: false,
      frameworkChanged: false,
      skillChanged: false,
      workChanged: false,
      langChanged: false
    };
    console.log("props: ", this.state);
  }
  closeDialog() {
    this.changeView(false);
    this.setState({ hasDialog: false });
  }
  handleAuthentication() {
    this.props.onAuthentication(this.state.authenticated);
  }
  updateSource(source) {
    console.log("source skills: ", source.skills.length);
    this.setState(
      {
        name: source.name,
        email: source.email,
        experience: source.experience,
        profession: source.profession,
        links: source.links,
        pic: source.pic,
        skills: source.skills,
        languages: source.languages,
        frameworks: source.frameworks,
        work: source.work,
        dataChanged: false
      },
      () => {
        this.setState({
          linkChanged: false,
          skillChanged: false,
          langChanged: false,
          frameworkChanged: false,
          workChanged: false
        });
      }
    );
  }
  handleUpdate(data) {
    if (data.target === "links") this.setState({ hasDialog: false });
    if (data.target === "skills")
      this.setState({ skillChanged: true, links: data.value });
    console.log("Handleupdate: ", data.target);
    if (data.target) {
      fetch(
        "http://localhost:5000/api/v1/developers/" + this.state.uid + "/edit",
        {
          method: "put",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data)
        }
      )
        .then(res => res.json())
        .then(success => {
          this.setState({ dataChanged: true });
          console.log("handleUpdate: ", success);
          switch (data.target) {
            case "links":
              if (this.state.links !== data.value) {
                console.log("links changed");
                this.setState({ linkChanged: true, links: data.value });
              }

              break;
            case "skills":
              if (this.state.skills !== data.value) {
                console.log("skill changed");
                this.setState({ skillChanged: true, skills: data.value });
              }
              break;
            case "languages":
              if (this.state.languages !== data.value) {
                console.log("language changed: ", data.value);
                this.setState(
                  { langChanged: true, languages: data.value },
                  () => {
                    console.log("new lang: ", this.state.languages);
                  }
                );
              }
              break;
            case "frameworks":
              if (this.state.frameworks !== data.value)
                this.setState({
                  frameworkChanged: true,
                  frameworks: data.value
                });
              break;
            case "work":
              if (this.state.work !== data.value)
                this.setState({ workChanged: true, work: data.value });
              break;
          }

          this.setState({ dataChanged: true, proform: null });
        })
        .catch(e => {
          console.log("handleUpdate", e);
        });
    }
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
              this.state.languages[dialog.id]
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
  changeView(state) {
    if (state) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }
  updateProgress() {
    let p = this.state.progress.value;
    if (this.state.length != 0) {
      p = p + (this.state.pic !== null || this.state.pic !== "" ? 10 : 0);
      p = p + (this.state.links.length > 0 ? 15 : 0);
      p = p + (this.state.languages.length > 0 ? 15 : 0);
      p = p + (this.state.frameworks.length > 0 ? 15 : 0);
      p = p + (this.state.skills.length > 0 ? 15 : 0);
      p = p + (this.state.work.length > 0 ? 15 : 0);
    }
    let variant = "danger";
    if (p > 25 && p < 50) variant = "warning";
    else if (p >= 50 && p < 75) variant = "info";
    else if (p >= 75) variant = "success";
    this.setState({
      progress: { value: p, variant: variant }
    });
  }
  componentDidMount() {
    this.setState({
      progress: { value: 15, variant: "danger" }
    });

    this.handleAuthentication();
    // if(this.state.authenticated){
    //   this.handleUpdate()
    // }
  }
  componentWillMount() {
    this.setState(ps => ({ loadingData: true }));

    this.loadData();
  }
  loadData() {
    if (this.state.uid) {
      // let type = this.state.type === 0 ? "developers/" : "clients/";
      fetch("http://localhost:5000/api/v1/developers/" + this.state.uid)
        .then(res => res.json())
        .then(result => {
          console.log("componentDidMount: ", result);
          if (result.e) {
            this.setState({
              loadingData: false,
              isError: true,
              error:
                result.e.code === "unavailable"
                  ? "Service unavailable. Please try again later"
                  : result.e.name || result.e.message
            });
          } else {
            this.setState({ dataChanged: true });
            this.updateSource(result.dev);
            this.setState({ loadingData: false }, () => {
              this.updateProgress();

              this.changeView(this.state.hasDialog);
            });
          }
        })
        .catch(e => {
          console.log("error: ", e);
          this.setState(prev => {
            return {
              error: e.message,
              loadingData: false,
              isError: !prev.isError
            };
          });
        });
      this.setState({ dataChanged: false, proform: null });
    }
  }
  showForm(id) {
    if (this.state.buttonClicked) {
      if (id === "edit") {
        this.setState(
          ps => ({
            editform: id
          }),
          () => {
            document.getElementById("editform").scrollIntoView();
          }
        );
      } else {
        this.setState(
          ps => ({
            proform: id
          }),
          () => {
            document.getElementById("proform").scrollIntoView();
          }
        );
      }
    } else {
      this.setState(ps => ({
        proform: null,
        editform: null
      }));
    }
  }
  handleSubmitPro(data) {
    console.log("submitpro: ", data);
  }
  handleButtonClick(e) {
    if (!e || e === undefined) {
      this.setState(
        ps => ({
          buttonClicked: false
        }),
        () => {
          this.showForm(null);
        }
      );
    } else {
      let id = e.target.id;
      this.setState(
        ps => ({
          buttonClicked: !ps.buttonClicked
        }),
        () => {
          this.showForm(id);
        }
      );
    }
  }
  handleLinkButton(e) {
    this.setState(
      ps => ({ hasDialog: !ps.hasDialog }),
      () => {
        this.changeView(this.state.hasDialog);
      }
    );
  }
  base64Encode(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    return reader;
  }
  handleImageClick() {
    console.log("clicked image: " + this.state.pic);
    const imageUpload = document.getElementById("profileImageUpload");
    const uploadedImage = document.getElementById("profileImage");
    imageUpload.click();
    imageUpload.onchange = () => {
      let file = imageUpload.files[0];
      let imageUrl = file ? URL.createObjectURL(file) : uploadedImage.src;
      let dataReader = this.base64Encode(file);
      dataReader.onload = () => {
        let data = { target: "pic", value: dataReader.result };
        this.handleUpdate(data);
      };
      uploadedImage.onload = () => {
        URL.revokeObjectURL(imageUrl);
      };
      uploadedImage.src = imageUrl;
    };
  }

  render() {
    if (this.state.authenticated) {
      if (this.state.loadingData) {
        return (
          <div className="spinner">
            <Spinner animation="grow" variant="success" />
          </div>
        );
      } else if (this.state.isError) {
        return (
          <div className="dashboard">
            <div className="error">
              <h2>{this.state.error}</h2>
            </div>
          </div>
        );
      } else if (this.state.uid === undefined) {
        return (
          <div className="dashboard">
            <div className="">
              <h2>No data to show</h2>
              <button
                type="button"
                className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--primary"
                onClick={this.loadData}
              >
                Refresh
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div className="dashboard">
              <div className="personal-details card">
                <div className="control-horizontal mdl-color-text--primary">
                  <i
                    className="material-icons"
                    id="edit"
                    onClick={this.handleButtonClick}
                  >
                    edit
                  </i>
                </div>
                <div className="info">
                  <input
                    type="file"
                    className="hidden"
                    id="profileImageUpload"
                    accept="image/*"
                  />
                  <img
                    id="profileImage"
                    className="profileImage"
                    src={this.state.pic}
                    alt={this.state.name}
                    onClick={this.handleImageClick}
                  />
                </div>
                <div className="info left">
                  <h4>{this.state.name} </h4>
                  <p>{this.state.profession} </p>
                  <b>{this.state.experience} &nbsp;year(s) experience</b>
                  <p>{this.state.email} </p>
                  <div>
                    {this.state.links.length > 0
                      ? this.state.links.map((link, i) => (
                          <a key={i} href={link}>
                            {link}
                          </a>
                        ))
                      : null}
                    {this.state.links.length > 0 &&
                    this.state.links.length < 3 ? (
                      <i
                        id="links"
                        className="material-icons"
                        onClick={this.handleLinkButton}
                      >
                        add
                      </i>
                    ) : null}
                    {this.state.links.length < 1 ? (
                      <button
                        id="links"
                        onClick={this.handleLinkButton}
                        className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--primary"
                      >
                        <i className="material-icons">link</i>
                        &nbsp;&nbsp;&nbsp;&nbsp;Add
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="w-75">
                <ProgressBar
                  label={
                    "Profile completion: " + this.state.progress.value + "%"
                  }
                  now={this.state.progress.value}
                  variant={this.state.progress.variant}
                />
              </div>
              {this.state.editform === "edit" ? (
                <EditForm
                  target={this.state.editform}
                  data={{
                    name: this.state.name,
                    profession: this.state.profession,
                    email: this.state.email,
                    experience: this.state.experience
                  }}
                  // onSubmit={data => this.handleSubmitPro(data)}
                  onClose={e => this.handleButtonClick(e)}
                  onUpdate={data => this.handleUpdate(data)}
                />
              ) : null}
              {this.state.proform !== null ? (
                <ProForm
                  target={this.state.proform}
                  uid={this.state.uid}
                  data={this.state[this.state.proform]}
                  onSubmit={data => this.handleSubmitPro(data)}
                  onClose={e => this.handleButtonClick(e)}
                  onUpdate={data => this.handleUpdate(data)}
                />
              ) : null}
              <div className="professional-details">
                <div className="pro-info card">
                  <div className="card-title mdl-color-text--primary">
                    <h4>Skills</h4>{" "}
                    <div className="d-actions">
                      <i
                        id="skills"
                        className="material-icons mdl-js-button mdl-js-ripple-effect mdl-button--accent"
                        onClick={this.handleButtonClick}
                      >
                        add
                      </i>
                    </div>
                  </div>

                  <CustomList
                    updated={this.state.skillChanged}
                    items={this.state.skills}
                    types="skills"
                    editable={true}
                  />
                </div>

                <div className="pro-info card">
                  <div className="card-title mdl-color-text--primary">
                    <h4>Languages</h4>
                    <div className="d-actions">
                      <i
                        id="languages"
                        className="material-icons mdl-js-button mdl-js-ripple-effect mdl-button--accent"
                        onClick={this.handleButtonClick}
                      >
                        add
                      </i>
                    </div>
                  </div>

                  <CustomList
                    updated={this.state.langChanged}
                    items={
                      this.state.languages.length > 0 || this.state.langChanged
                        ? this.state.languages
                        : []
                    }
                    types="languages"
                    editable={true}
                    onClick={this.showDialog}
                  />
                </div>

                <div className="pro-info card">
                  <div className="card-title mdl-color-text--primary">
                    <h4>Frameworks</h4>
                    <div className="d-actions">
                      <i
                        id="frameworks"
                        className="material-icons mdl-js-button mdl-js-ripple-effect mdl-button--accent"
                        onClick={this.handleButtonClick}
                      >
                        add
                      </i>
                    </div>
                  </div>
                  <CustomList
                    updated={this.state.frameworkChanged}
                    items={
                      this.state.frameworks.length > 0
                        ? this.state.frameworks
                        : []
                    }
                    types="frameworks"
                    editable={true}
                  />
                </div>

                <div className="pro-info card">
                  <div className="card-title mdl-color-text--primary">
                    <h4>Accomplished Work</h4>
                    <div className="d-actions">
                      <i
                        id="work"
                        className="material-icons mdl-js-button mdl-js-ripple-effect mdl-button--accent"
                        onClick={this.handleButtonClick}
                      >
                        add
                      </i>
                    </div>
                  </div>
                  <CustomList
                    updated={this.state.workChanged}
                    items={this.state.work.length > 0 ? this.state.work : []}
                    types="work"
                    editable={true}
                  />
                </div>
              </div>

              {/* {this.state.dialog !== null ? (
                <AlertDialog
                  yesNo={true}
                  title={this.state.dialog.title}
                  message={this.state.dialog.message}
                  unmount={this.hideDialog}
                  delete={this.delete}
                />
              ) : null} */}
            </div>
            {this.state.hasDialog ? (
              <LinkDialog
                onUpdateLink={data => this.handleUpdate(data)}
                data={this.state.links}
                onClose={this.closeDialog}
              />
            ) : null}
          </div>
        );
      }
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { isLoggedIn: false }
          }}
        />
      );
    }
  }
}
export default Dashboard;
