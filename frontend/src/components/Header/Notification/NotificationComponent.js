import React from "react";
import "./notification.css";
import Button from "react-bootstrap/lib/Button";
import AppActions from "../../../actions/AppActions";

export default class NotificationComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    const notification = this.props.notification;
    if (!notification || Object.keys(notification).length === 0) {
      return null;
    }
    const notificationStrings = notification.notification;
    return (
      <div className="notifications">
        <Button bsStyle="primary" onClick={this.props.handleAllRead}>
          Mark as all read
        </Button>
        <br />
        <br />
        {notificationStrings.map((notificationString, index) => {
          return (
            <div key={index}>
              {notificationString.notificationString}

              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}
