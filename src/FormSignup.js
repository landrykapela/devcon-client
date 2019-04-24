import React from 'react';
import FormTitle from './FormTitle.js';


class FormSignup extends React.Component {

componentWillReceiveProps(props){

  this.heading = this.props.target;
}
componentDidMount(props){
  this.heading = this.props.target;
}
render(){
  return(
    <div className="form-container" id="form-container">
      <form className="border-primary">
        <FormTitle title={this.heading} />
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your full name"/>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" placeholder="Enter your email"/>
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password"/>
        </div>

        <div className="form-control">

          <input type="submit" id="btnsubmit" name="btnsubmit" value="submit"/>
        </div>

      </form>
    </div>
  );
}

} export default FormSignup;
