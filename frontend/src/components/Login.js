import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import AppActions from "../actions/AppActions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }
  /*
  handleCancelClick() {
    AppActions.hideLoginPopup();
  }*/

  handleLoginClick() {
    //AppActions.hideLoginPopup();
    e.preventDefault();
    const userData = {
      username: this.usernameField.value,
      password: this.passwordField.value
    };

    this.props.loginUser(userData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    return (
      <div className='static-modal'>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Please login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormGroup controlId='formBasicText'>
              <ControlLabel>Username or email</ControlLabel>
              <FormControl
                type='text'
                placeholder='username'
                inputRef={ref => {
                  this.usernameField = ref;
                }}
              />
            </FormGroup>
            <FormGroup controlId='formBasicText'>
              <ControlLabel>password</ControlLabel>
              <FormControl
                type='password'
                placeholder='password'
                inputRef={ref => {
                  this.passwordField = ref;
                }}
              />
            </FormGroup>
          </Modal.Body>

          <Modal.Footer>
            {/* <Button onClick={this.handleCancelClick}>Cancel</Button> */}
            <Button bsStyle='primary' onClick={this.handleLoginClick}>
              Login
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

Login.propTypes = {
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
)(withRouter(Login));
