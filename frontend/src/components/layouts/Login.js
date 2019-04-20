import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
              <Form.Group controlId="formBasicText">
                <Form.Label>Username or email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="username"
                  inputRef={ref => {
                    this.usernameField = ref;
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicText">
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  inputRef={ref => {
                    this.passwordField = ref;
                  }}
                />
              </Form.Group>
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
