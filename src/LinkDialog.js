import React from "react";

class LinkDialog extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { data: this.props.data };
  }
  handleClick() {
    this.props.onClose();
  }
  submit(e) {
    e.preventDefault();
    let link = e.target[0].value;
    let newdata = [link].concat(this.state.data);
    let data = { target: "links", value: newdata };
    this.props.onUpdateLink(data);
  }
  render() {
    return (
      <div>
        <div className="dialog mdl-color--white" id="link-dialog">
          <div className="card-title mdl-color--primary">
            <h4 className="">Add Link</h4>
            <i
              className="material-icons mdl-js-button mdl-js-ripple-effect mdl-button--white"
              onClick={this.handleClick}
            >
              close
            </i>
          </div>
          <form onSubmit={this.submit}>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input
                className="mdl-textfield__input"
                type="text"
                id="link"
                name="link"
              />
              <label className="mdl-textfield__label" htmlFor="link">
                https://...
              </label>
            </div>
            <button
              type="submit"
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
            >
              add
            </button>
          </form>
        </div>
        <div className="dialog-bg"> </div>
      </div>
    );
  }
}
export default LinkDialog;
