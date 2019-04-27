import React, { Component } from "react";
import {
  Route,
  BrowserRouter,
  Switch,
  Link,
  withRouter
} from "react-router-dom";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NavHeader from "./header/navHeader";
import AppBar from "@material-ui/core/AppBar";
import Home from "./homeComponents/Home";

const styles = theme => ({});

//Create a Main Component
class Quora extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar className="m-bg-color" position="sticky">
          <NavHeader />
        </AppBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/answer" component={Home} />
          <Route exact path="/profile" component={Home} />
          <Route exact path="/notifications" component={Home} />
          <Route render={() => <h3>Page not Found</h3>} />
        </Switch>
      </div>
    );
  }
}

Quora.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(withRouter(Quora)));
