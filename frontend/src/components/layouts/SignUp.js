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

import { withRouter } from "react-router-dom";

import classnames from "classnames";
import "./SignUp.css";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

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
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onSubmit = e => {
    e.preventDefault();

    console.log(this.state);

    const user = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(user, this.props.history);
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
      <div className="content">
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
                      className="text"
                      type="text"
                      name="first_name"
                      autocapitalize="words"
                      autocorrect="off"
                      value={this.state.fname}
                      onChange={this.onChange}
                      tabindex="9"
                      data-group="js-editable"
                      w2cid="wJNkelKg12"
                      id="__w2_wJNkelKg12_first_name"
                    />
                  </div>
                </div>
                <div className="form_row half">
                  <label>Last Name</label>
                  <div className="input_wrapper">
                    <input
                      className="text"
                      type="text"
                      name="last_name"
                      autocapitalize="words"
                      autocorrect="off"
                      value={this.state.lname}
                      onChange={this.onChange}
                      tabindex="9"
                      data-group="js-editable"
                      w2cid="wJNkelKg12"
                      id="last_name"
                    />
                  </div>
                </div>
              </div>
              <div className="form_row" style={{ height: "50px", margin: 0 }}>
                <label>Email</label>
                <div className="input_wrapper">
                  <input
                    className="text"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    tabindex="10"
                    data-group="js-editable"
                    w2cid="wJNkelKg12"
                    id="__w2_wJNkelKg12_email"
                  />
                </div>
              </div>

              <div className="form_row">
                <label>Password</label>
                <div className="input_wrapper">
                  <input
                    className="text"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    tabindex="11"
                    data-group="js-editable"
                    w2cid="wJNkelKg12"
                    id="__w2_wJNkelKg12_password"
                  />
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
                    w2cid="wJNkelKg12"
                    id="__w2_wJNkelKg12_password"
                  />
                </div>
              </div>

              <input
                type="submit"
                name="signin_submit"
                value="Sign Up"
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
              <div id="__w2_wJNkelKg8_connect_explanation">
                <a
                  className="signup_email_link"
                  href="/signup"
                  tabindex="8"
                  id="__w2_wJNkelKg8_continue_with_email"
                >
                  Sign Up With Email
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
