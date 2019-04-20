import React from "react";
import Button from "react-bootstrap/lib/Button";
import Overlay from "react-bootstrap/lib/Overlay";
import ReactDOM from "react-dom";
import NavItem from "react-bootstrap/lib/NavItem";

import NotificationComponent from "./NotificationComponent";
import Badge from "react-bootstrap/lib/Badge";

export default class Notificationpopup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleAllRead = this.handleAllRead.bind(this);

    this.state = {
      show: false
    };
  }
  handleAllRead() {
    //AppActions.handleAllNotificationRead();
    this.handleToggle();
  }
  handleToggle() {
    // /AppAction.showNotificationAsRead();
    this.setState({ show: !this.state.show });
  }

  render() {
    const notification = this.props.notification;
    const notificationStrings = notification.notification;

    return (
      <div style={{ height: 20, position: "relative" }}>
        <NavItem
          eventKey={1}
          href="#"
          ref={button => {
            this.target = button;
          }}
          onClick={this.handleToggle}
        >
          <font size="3">
            <span class="glyphicon glyphicon-bell text-success" />
            &nbsp;
          </font>
          Notification &nbsp;<Badge>{notificationStrings.length}</Badge>
        </NavItem>

        <Overlay
          show={this.state.show}
          onHide={() => this.setState({ show: true })}
          placement="bottom"
          container={this}
          target={() => ReactDOM.findDOMNode(this.target)}
        >
          <NotificationComponent
            notification={this.props.notification}
            handleAllRead={this.handleAllRead}
          />
        </Overlay>
      </div>
    );
  }
}
