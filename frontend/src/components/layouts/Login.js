import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import "./Login.css";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    width: "60px",
    height: "60px"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  divider: {
    width: "100%",
    padding: "2px",
    margin: "32px 0 32px 0"
  }
});

export class Login extends Component {
  //Login Functions
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loginSuccess: true,
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    // console.log(this.state.FACULTY)

    this.props.loginUser(user, this.props.history);
  };

  render() {
    const { classes } = this.props;

    const { errors } = this.props;
    // console.log(this.props);

    return (
      <div className="content">
        <div className="bg_container">
          <div className="bg_image" />
        </div>

        <div id="login-box">
          <div className="okta-sign-in-header">
            <div className="NetworkLogo" style={{ margin: "auto" }}>
              <a className="logo hidden" href="/">
                <span>Quora</span>
              </a>
            </div>
            <h2
              className="NetworkLogoTagline tagline"
              style={{ align: "center" }}
            >
              A place to share knowledge and better understand the world
            </h2>
            <div data-type="beacon-container" className="beacon-container" />
          </div>
          <div className="content-box">
            <div className="left">
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={this.onChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.onChange}
              />

              <input
                type="submit"
                name="signin_submit"
                value="Sign In"
                onClick={this.submitLogin}
              />
            </div>
            <div className="v1" />
            <div className="right">
              <button className="social-signin facebook">
                Log in with facebook
              </button>
              <button className="social-signin twitter">
                Log in with Twitter
              </button>
              <button className="social-signin google">
                Log in with Google+
              </button>
              <br />
              <span className="light_gray TosDisclaimer">
                By signing up you indicate that you have read and agree to
                Quora's{" "}
                <a
                  class="tos_link"
                  href="/about/tos"
                  nav_style="modal_present"
                  target="_blank"
                  rel="noopener"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  class="tos_link"
                  href="/about/privacy"
                  nav_style="modal_present"
                  target="_blank"
                  rel="noopener"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(withRouter(Login)));
