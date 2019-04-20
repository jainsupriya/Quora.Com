import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import AppActions from "../../actions/AppActions";

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
  }

  handleCancelClick() {
    AppActions.hideSignupPopup();
  }

  handleSignUpClick() {
    AppActions.hideSignupPopup();
    const username = this.unameField.value;
    const firstName = this.fnameField.value;
    const lastName = this.lnameField.value;
    const email = this.emailField.value;
    const password = this.passwordField.value;
    const mobile = this.mobileField.value;
    const dob = this.dobField.value;
    const gender = this.genderField.value;

    AppActions.signUp(
      username,
      firstName,
      lastName,
      email,
      password,
      mobile,
      dob,
      gender
    );
  }
  render() {
    let shouldShowDailog = this.props.shouldShowSignUp;
    if (shouldShowDailog) {
      return (
        <div className="static-modal">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Enter Username</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Username"
                  inputRef={ref => {
                    this.unameField = ref;
                  }}
                />
              </FormGroup>

              <FormGroup controlId="formBasicText">
                <ControlLabel>Enter First Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="First name"
                  inputRef={ref => {
                    this.fnameField = ref;
                  }}
                />
              </FormGroup>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Enter Last Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Last name"
                  inputRef={ref => {
                    this.lnameField = ref;
                  }}
                />
              </FormGroup>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Enter Email</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Email"
                  inputRef={ref => {
                    this.emailField = ref;
                  }}
                />
              </FormGroup>

              <FormGroup controlId="formBasicText">
                <ControlLabel>Enter Password</ControlLabel>
                <FormControl
                  type="password"
                  placeholder="Password"
                  inputRef={ref => {
                    this.passwordField = ref;
                  }}
                />
              </FormGroup>

              <FormGroup controlId="formBasicText">
                <ControlLabel>Enter Mobile</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Mobile"
                  inputRef={ref => {
                    this.mobileField = ref;
                  }}
                />
              </FormGroup>

              <FormGroup controlId="formBasicText">
                <ControlLabel>Enter Date Of Birth</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Date of Birth(in Epoch Time format)"
                  inputRef={ref => {
                    this.dobField = ref;
                  }}
                />
              </FormGroup>

              <FormGroup controlId="formBasicText">
                <ControlLabel>Enter Gender</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Gender"
                  inputRef={ref => {
                    this.genderField = ref;
                  }}
                />

                {/* <DropdownButton
                                 title={"Select Gender"}
                                >
                                <MenuItem eventKey="1">Male</MenuItem>
                                <MenuItem eventKey="2">Female</MenuItem>
                                <MenuItem eventKey="3">Other</MenuItem>
                                </DropdownButton> */}
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.handleCancelClick}>Cancel</Button>
              <Button bsStyle="primary" onClick={this.handleSignUpClick}>
                Sign Up
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      );
    }
    return null;
  }
}
