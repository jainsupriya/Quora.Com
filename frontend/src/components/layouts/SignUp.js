import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
              <Form.Group controlId="formBasicText">
                <Form.Label>Enter Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  inputRef={ref => {
                    this.unameField = ref;
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicText">
                <Form.Label>Enter First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  inputRef={ref => {
                    this.fnameField = ref;
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicText">
                <Form.Label>Enter Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  inputRef={ref => {
                    this.lnameField = ref;
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicText">
                <Form.Label>Enter Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  inputRef={ref => {
                    this.emailField = ref;
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicText">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  inputRef={ref => {
                    this.passwordField = ref;
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicText">
                <Form.Label>Enter Mobile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mobile"
                  inputRef={ref => {
                    this.mobileField = ref;
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicText">
                <Form.Label>Enter Date Of Birth</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Date of Birth(in Epoch Time format)"
                  inputRef={ref => {
                    this.dobField = ref;
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicText">
                <Form.Label>Enter Gender</Form.Label>
                <Form.Control
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
              </Form.Group>
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
