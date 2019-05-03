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
import Grid from "@material-ui/core/Grid";
import "../../../styles/home.css";

const styles = theme => ({});

//Create a Main Component
class Feed extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className="m-margin-up-down"
        >
          <Grid item xs={2}>
            <div className="feed-bg-1" />
          </Grid>
          <Grid item xs={10}>
            <Link to="" onClick={this.props.handleTopicClick}>
              {this.props.topic}
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Feed.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(withRouter(Feed)));
