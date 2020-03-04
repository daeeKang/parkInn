import React from "react";
import "./Login.css";
import background from './signinBackground.jpg'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="login-page">
        <div id="wrap">
          <div id="form-container">
            <p id="sign-in">Sign in</p>
            <form onSubmit={() => console.log("sup")}>
              <input
                type="email"
                className="input"
                autoComplete="false"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              <input
                type="password"
                className="input"
                autoComplete="false"
                placeholder="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              <div className="text-align-left-container">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <div className="text-align-left-container">
                <input type="submit" value="Sign in" id="submit-button" />
                <p id="forgot-password">
                    forgot password?
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
