import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import "./SignUp.css";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
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

export class SignUp extends Component {
  //Register Functions
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.validator = new SimpleReactValidator({
      validators: {
        password2: {
          message: "Passwords do not match",
          rule: (val, params, validator) => {
            return this.state.password === this.state.password2;
          }
        }
      }
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked, errors: {} });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.validator.allValid()) {
      const user = {
        fname: this.state.fname,
        lname: this.state.lname,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };
      this.props.registerUser(user, this.props.history);
    } else {
      this.setState({
        errors: {}
      });
      this.validator.showMessages();
      this.forceUpdate();
    }
    console.log(this.state);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { classes } = this.props;

    const { errors } = this.props;

    return (
      <div className="signup-content">
        <div className="bg_container">
          <div className="bg_image" />
        </div>

        <div id="signup-box">
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
              <div className="first_last_group" style={{ height: "18%" }}>
                <div className="form_row half">
                  <label>First Name</label>
                  <div className="input_wrapper">
                    <input
                      className="text1"
                      type="text"
                      name="fname"
                      autocapitalize="words"
                      autocorrect="off"
                      value={this.state.fname}
                      onChange={this.onChange}
                      tabindex="9"
                      data-group="js-editable"
                    />

                    <span className="error">
                      {this.validator.message(
                        "first_name",
                        this.state.fname,
                        "required|alpha"
                      )}
                    </span>
                  </div>
                </div>
                <div className="form_row half">
                  <label>Last Name</label>
                  <div className="input_wrapper">
                    <input
                      className="text1"
                      type="text"
                      name="lname"
                      autocapitalize="words"
                      autocorrect="off"
                      value={this.state.lname}
                      onChange={this.onChange}
                      tabindex="9"
                      data-group="js-editable"
                      id="last_name"
                    />
                    {this.validator.message(
                      "last_name",
                      this.state.lname,
                      "required|alpha"
                    )}
                  </div>
                </div>
              </div>
              <div className="form_row" style={{ height: "18%", margin: 0 }}>
                <label>Username</label>
                <div className="input_wrapper">
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    tabindex="9"
                    className="text1"
                  />
                  {this.validator.message(
                    "username",
                    this.state.username,
                    "required|username"
                  )}
                </div>
              </div>
              <div className="form_row" style={{ height: "18%", margin: 0 }}>
                <label>Email</label>
                <div className="input_wrapper">
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    tabindex="10"
                    data-group="js-editable"
                    w2cid="wJNkelKg12"
                    className="email1 overrides"
                  />
                  {this.validator.message(
                    "email",
                    this.state.email,
                    "required|email"
                  )}
                  <div className="srv-validation-message">
                    {this.state.errors !== undefined
                      ? this.state.errors.msg
                      : ""}
                  </div>
                </div>
              </div>

              <div className="form_row">
                <label>Password</label>
                <div className="input_wrapper">
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    tabindex="11"
                    data-group="js-editable"
                    w2cid="wJNkelKg12"
                    className="password1 overrides"
                  />
                  {this.validator.message(
                    "password",
                    this.state.password,
                    "required|password"
                  )}
                </div>
              </div>

              <div className="form_row">
                <label>Retype Password</label>
                <div className="input_wrapper">
                  <input
                    className="text"
                    type="password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    tabindex="11"
                    data-group="js-editable"
                    className="password1"
                  />{" "}
                  {this.validator.message(
                    "password2",
                    this.state.password,
                    "password2"
                  )}
                </div>
              </div>

              <input
                type="submit"
                name="signin_submit"
                value="Sign Up"
                onClick={this.onSubmit}
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
              <div id="__w2_wJNkelKg8_connect_explanation">
                <a
                  className="signup_email_link"
                  href="/login"
                  tabindex="8"
                  id="__w2_wJNkelKg8_continue_with_email"
                >
                  Login
                </a>
                <span className="tos_disclaimer">
                  .{" "}
                  <span className="light_gray TosDisclaimer">
                    By signing up you indicate that you have read and agree to
                    Quora's{" "}
                    <a
                      className="tos_link"
                      href="/about/tos"
                      nav_style="modal_present"
                      target="_blank"
                      rel="noopener"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      className="tos_link"
                      href="/about/privacy"
                      nav_style="modal_present"
                      target="_blank"
                      rel="noopener"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withStyles(styles)(withRouter(SignUp)));
