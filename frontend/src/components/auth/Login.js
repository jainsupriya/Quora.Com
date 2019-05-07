import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import "./Login.css";
import SimpleReactValidator from "simple-react-validator";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import { getUserDetails } from "../../redux/actions/homeAction";
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
    this.validator = new SimpleReactValidator();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value, errors: {} });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.validator.allValid()) {
      const user = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.loginUser(user);
    } else {
      this.setState({
        errors: {}
      });
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { classes } = this.props;

    const { errors } = this.props;
    // console.log(this.props);

    return (
      <div className="login-content">
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
                className="text2"
              />
              {this.validator.message(
                "email",
                this.state.email,
                "required|email"
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.onChange}
                className="password2"
              />
              {this.validator.message(
                "password",
                this.state.password,
                "required"
              )}

              <input
                type="submit"
                name="signin_submit"
                value="Login"
                onClick={this.onSubmit}
              />
              <div className="srv-validation-message">
                {this.state.errors !== undefined ? this.state.errors.msg : ""}
              </div>
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
                  tabIndex="8"
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  userDetails: state.homeState.userDetails
});

export default connect(
  mapStateToProps,
  { loginUser, getUserDetails }
)(withStyles(styles)(withRouter(Login)));
