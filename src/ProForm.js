import React from "react";
import { Spinner } from "react-bootstrap";

class ProForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      loading: false,
      dataChanged: false,
      source: []
    };
    this.submit = this.submit.bind(this);
    this.update = this.update.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  // filterSource(source) {
  //   this.setState(ps => {
  //     return {
  //       filteredSource: this.state.source.filter(
  //         value => !this.props.data.includes(value)
  //       )
  //     };
  //   });
  // }
  componentWillMount() {}
  componentDidMount() {
    if (this.props.target !== "work") {
      fetch("http://localhost:5000/api/v1/data/" + this.props.target, {
        method: "get",
        headers: { "content-type": "application/json" }
      })
        .then(res => res.json())
        .then(result => {
          console.log("skills: ", result.response);
          let sorted = result.response.sort((d1, d2) => {
            if (d1.name.toLowerCase() > d2.name.toLowerCase()) return 1;
            if (d1.name.toLowerCase() < d2.name.toLowerCase()) return -1;
            return 0;
          });
          this.setState({ source: sorted });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
  handleClick() {
    this.props.onClose();
  }
  load() {}
  update(e) {
    e.preventDefault();
    this.setState({ loading: true });
    let data = { target: this.props.target, value: this.state.data };
    this.props.onUpdate(data);
  }
  submit(e) {
    e.preventDefault();
    let uid = e.target[0].value;
    let name = e.target[1].value;
    let level = e.target[2].value;
    const data = {
      uid: uid,
      name: name,
      target: this.props.target
    };
    let newData = [];
    if (this.props.target === "work") {
      data.link = level;
      newData = [{ name: name, link: level }].concat(this.state.data);
    } else {
      data.level = level;
      newData = [{ name: name, level: level }].concat(this.state.data);
    }

    this.setState({ data: newData, dataChanged: true });
    e.target.reset();
  }
  render() {
    return (
      <div className="form-container-pro card" id="proform">
        <div className="card-title">
          <h4>
            Add New{" "}
            {this.props.target === "work"
              ? "Accomplished Work"
              : this.props.target}
          </h4>
          <i
            className="material-icons mdl-js-button mdl-js-ripple-effect mdl-button--accent"
            onClick={this.handleClick}
          >
            close
          </i>
        </div>
        <form onSubmit={this.submit}>
          <input type="hidden" name="uid" value={this.props.uid} id="uid" />
          {this.props.target !== "work" ? (
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <select name="name" id="name" className="mdl-textfield__input ">
                {this.state.source.map(skill => (
                  <option className="cust-option" key={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input
                className="mdl-textfield__input"
                type="text"
                id="name"
                name="name"
              />
              <label className="mdl-textfield__label" htmlFor="name">
                {this.props.target === "work"
                  ? "project name..."
                  : this.props.target + " name..."}
              </label>
            </div>
          )}

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              className="mdl-textfield__input"
              type="text"
              id="level"
              name="level"
            />
            <label className="mdl-textfield__label" htmlFor="level">
              {this.props.target === "work"
                ? "https://..."
                : this.props.target + " level..."}
            </label>
          </div>
          <button
            type="submit"
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
          >
            add
          </button>
        </form>
        <div className="right-space">
          <ul>
            {this.state.data.length > 0 ? (
              this.state.data.map(item => (
                <li key={item.name}>
                  <b>{item.name}</b>
                  <span>
                    {":"}&nbsp;&nbsp;{item.level || item.link}
                  </span>
                </li>
              ))
            ) : (
              <li>No {this.props.target}</li>
            )}
          </ul>
          {this.state.loading ? (
            <Spinner variant="success" animation="grow" />
          ) : this.state.dataChanged ? (
            <button
              id="save"
              onClick={this.update}
              type="button"
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary"
            >
              save
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}
export default ProForm;
