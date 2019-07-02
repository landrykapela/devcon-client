import React from "react";

class FormSignup extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit(e) {
    const inputs = e.target;
    const name = inputs[0];
    const email = inputs[1];
    const password = inputs[2];
  }
  componentWillReceiveProps(props) {
    this.heading = this.props.target;
  }
  componentDidMount(props) {}
  render() {
    return (
      <div className="form-container" id="form-container">
        <form
          onSubmit={this.submit}
          className="border-primary"
          method="post"
          action="http://localhost:5000/api/auth/signup"
        >
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-control">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="form-control">
            <input
              type="submit"
              id="btnsubmit"
              name="btnsubmit"
              value="submit"
            />
          </div>
        </form>
      </div>
    );
  }
}
export default FormSignup;
