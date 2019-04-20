import React from "react";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import Badge from "react-bootstrap/lib/Badge";
import Button from "react-bootstrap/lib/Button";
import FormControl from "react-bootstrap/lib/FormControl";
import AppActions from "../../actions/AppActions";
import Notificationpopup from "./Notification/NotificationPopUp";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

export default class MyNavBar extends React.Component {
  constructor() {
    super();
    this.getUserButton = this.getUserButton.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleUserClick = () => {
    AppActions.showLoginPopup();
  };

  handleSignUpClick = () => {
    AppActions.showSignUpPopup();
  };

  handleOnAddQclick = () => {
    AppActions.showAddQPopup();
  };

  handleUserProfileClick = () => {
    AppActions.handleUserProfileClick();
  };

  handleLogOut = () => {
    AppActions.getLogOut();
  };

  componentDidMount() {
    var cookie = document.cookie;
    if (cookie) AppActions.showNotification();
  }
  getUserButton = () => {
    let user = this.props.user;

    if (Object.keys(user).length === 0) {
      return (
        <Nav>
          <NavItem eventKey={1} href="#">
            <Button bsStyle="primary" onClick={this.handleUserClick}>
              Login
            </Button>
          </NavItem>
          <NavItem eventKey={1} href="#">
            <Button bsStyle="primary" onClick={this.handleSignUpClick}>
              Sign Up
            </Button>
          </NavItem>
        </Nav>
      );
    }

    return (
      <NavItem eventKey={4} href="#">
        <font size="4">
          <span class="glyphicon glyphicon-user text-primary" />
          &nbsp;
        </font>
        {user.firstName}&nbsp;
        {
          <DropdownButton>
            <MenuItem>
              User: {user.firstName}&nbsp;{user.lastName}
            </MenuItem>
            <hr />
            <MenuItem>Mobile No.: {user.dob}</MenuItem>
            <hr />
            <MenuItem>Email Id: {user.email}</MenuItem>
            <hr />
            <MenuItem onClick={this.handleLogOut}>Log Out</MenuItem>
          </DropdownButton>
        }
      </NavItem>
    );
  };

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <font size="+5">
                <a href="/">Quora</a>
              </font>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">
                <font size="3">
                  <span class="glyphicon glyphicon-home text-info" />
                  &nbsp;
                </font>
                Home
              </NavItem>
              <NavItem eventKey={2} href="#">
                <font size="3">
                  <span class="glyphicon glyphicon-pencil text-success" />
                  &nbsp;
                </font>
                Answer
              </NavItem>
              <NavItem eventKey={2} href="#">
                <Notificationpopup notification={this.props.notification} />
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                <FormControl type="text" placeholder="Search anything" />
              </NavItem>
              {this.getUserButton()}
              <NavItem eventKey={2} href="#">
                <Button
                  bsStyle="danger"
                  bsSize="small"
                  onClick={this.handleOnAddQclick}
                >
                  Add Question
                </Button>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
