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
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import _ from "lodash";
import { PieChart } from "./charts/PieChart";

const styles = theme => ({});

//Create a Main Component
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount = () => {
  };

  render() {
    const { classes } = this.props;

    // const contentDetails = this.props.contentDetails.contents;

    return (
      <div>
        <AppBar className="m-bg-color" position="sticky">
          <NavHeader />
        </AppBar>
        <div>
          <PieChart />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({

});

export default connect(
  mapStateToProps,
  {  }
)(withStyles(styles)(withRouter(Dashboard)));
