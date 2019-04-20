import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import AppActions from "../../actions/AppActions";

export default class Login extends React.Component {
  constructor() {
    super();
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleCancelClick() {
    //AppActions.hideLoginPopup();
  }

  handleLoginClick() {
    //AppActions.hideLoginPopup();
    const username = this.usernameField.value;
    const password = this.passwordField.value;

    //AppActions.login(username, password);
  }

  render() {
    let shouldShowDialog = this.props.shouldShowLogin;
    if (shouldShowDialog) {
      return (
        <div className="static-modal">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Please login</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Username or email</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="username"
                  inputRef={ref => {
                    this.usernameField = ref;
                  }}
                />
              </FormGroup>
              <FormGroup controlId="formBasicText">
                <ControlLabel>password</ControlLabel>
                <FormControl
                  type="password"
                  placeholder="password"
                  inputRef={ref => {
                    this.passwordField = ref;
                  }}
                />
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.handleCancelClick}>Cancel</Button>
              <Button bsStyle="primary" onClick={this.handleLoginClick}>
                Login
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      );
    }
    return null;
  }
}
