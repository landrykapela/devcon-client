import React from "react";
import { Spinner } from "react-bootstrap";

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.data.name,
      email: props.data.email,
      profession: props.data.profession,
      experience: props.data.experience,
      loading: false,
      dataChanged: false,
      data: null
    };
    this.data = {
      name: props.data.name,
      profession: props.data.profession,
      experience: props.data.experience
    };
    this.submit = this.submit.bind(this);
    // this.update = this.update.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {}
  Edit;
  handleClick() {
    this.props.onClose();
  }
  handleChange(e) {
    e.preventDefault();
    let value = e.target.value;
    let new_data = {
      name: this.state.name,
      profession: this.state.profession,
      experience: this.state.experience
    };
    switch (e.target.id) {
      case "name":
        this.setState({ name: value }, () => {
          new_data.name = this.state.name;
        });
        break;
      case "experience":
        this.setState({ experience: value }, () => {
          new_data.experience = value;
        });
        break;
      case "profession":
        this.setState({ profession: value }, () => {
          new_data.profession = this.state.profession;
        });
        break;
    }
    console.log("new data: ", new_data);
    if (new_data === this.data) {
      this.handleClick();
    } else {
      new_data.target = "edit";
      this.setState({ data: new_data });
    }
  }
  load() {}

  submit(e) {
    e.preventDefault();
    let inputs = e.target;

    // this.setState({
    //   name: inputs[0].value,
    //   profession: inputs[1].value,
    //   experience: inputs[2].value
    // });
    this.setState(ps => ({ loading: !ps.loading }));
    if (this.props.target === "edit" && this.state.data !== null) {
      console.log("data: ", this.state.data);
      // let d = { target: "edit", value: this.state.data };
      this.props.onUpdate(this.state.data);
    }

    e.target.reset();
    this.handleClick();
  }
  render() {
    return (
      <div className="form-container-pro card" id="editform">
        <div className="card-title">
          <h4>Edit Basic Information</h4>
          <i
            className="material-icons mdl-js-button mdl-js-ripple-effect mdl-button--accent"
            onClick={this.handleClick}
          >
            close
          </i>
        </div>
        <form onSubmit={this.submit}>
          <label htmlFor="name" className="mdl-color-text--primary">
            Name
          </label>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              type="text"
              id="name"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="Name..."
            />
          </div>
          <label htmlFor="profession" className="mdl-color-text--primary">
            Profession
          </label>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              type="text"
              id="profession"
              name="profession"
              onChange={this.handleChange}
              value={this.state.profession}
              placeholder="Profession..."
            />
          </div>
          <label htmlFor="experience" className="mdl-color-text--primary">
            Year of experience
          </label>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              type="number"
              id="experience"
              name="experience"
              onChange={this.handleChange}
              value={this.state.experience}
              placeholder="Years of experience..."
            />
          </div>
          <label htmlFor="email" className="mdl-color-text--primary">
            E-mail Address
          </label>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input mdl-color--grey-100"
              type="email"
              id="email"
              name="email"
              disabled
              value={this.state.email}
              placeholder="E-mail..."
            />
          </div>
          {this.state.loading ? (
            <Spinner variant="success" animation="grow" />
          ) : !this.state.dataChanged ? (
            <button
              id="save"
              type="submit"
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary"
            >
              save
            </button>
          ) : null}
        </form>
      </div>
    );
  }
}
export default EditForm;
