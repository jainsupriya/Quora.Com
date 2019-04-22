import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Link, withRouter } from "react-router-dom";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({

})

//Create a Main Component
class Login extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
          <h1>This is Login Page</h1>
      </div>
    );
  }
}


Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({

});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(withRouter(Login)));