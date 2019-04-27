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
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { getContentDetails } from "../../redux/actions/contentAction";
import { getUserDetails } from "../../redux/actions/homeAction";

const styles = theme => ({});

//Create a Main Component
class Content extends Component {
  constructor() {
    super();
    this.state = {
      type: "All Types",
      header: "Your Content",
      selectedYear: "All Time",
      sortOrder: "Oldest First",
      userDetails: {},
      contentDetails: []
    };
  }

  componentDidMount = () => {
    this.props.getContentDetails("5cbe44ad5445656fa98b6f7d");
  };

  handleTypeChange = type => {
    console.log("Hello", type);
    var header = "";
    switch (type) {
      case "All Types":
        header = "Your Content";

        break;

      case "Questions Asked":
        header = "Your Questions";
        break;

      case "Questions Followed":
        header = "Your Followed Questions";
        break;

      case "Answers":
        header = "Your Answers";
        break;
    }
    this.setState({
      type: type,
      header: header
    });
  };

  handleYearChange = year => {
    this.setState({
      selectedYear: year
    });
  };

  handleOrderChange = order => {
    this.setState({
      sortOrder: order
    });
  };

  showInfo = type => {
    console.log(type);
    let resultValue = "";
    switch (type) {
      case "Create a Answer":
        resultValue = "Answered";
        break;

      case "CREATE_QUESTION":
        resultValue = "Asked";
        break;
    }

    return <span>{resultValue}</span>;
  };

  render() {
    const { classes } = this.props;

    const contentDetails = this.props.contentDetails.contents;

    return (
      <div>
        <AppBar className="m-bg-color" position="sticky">
          <NavHeader />
        </AppBar>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <Grid item xs={2} className="fix-pos">
                <div style={{ position: "relative", width: "90%" }}>
                  <div style={{ padding: "0 4% 8%" }}>By Content Type</div>
                  <Divider />
                  <div style={{ padding: "8% 0" }}>
                    {[
                      "All Types",
                      "Questions Asked",
                      "Questions Followed",
                      "Answers"
                    ].map(type => {
                      return (
                        <div
                          style={{
                            padding: "1% 4%",
                            backgroundColor:
                              this.state.type === type ? "#e6e6e6" : "#fff"
                          }}
                        >
                          <a onClick={() => this.handleTypeChange(type)}>
                            {type}
                          </a>
                        </div>
                      );
                    })}
                  </div>

                  {/* By Topic */}
                  <div style={{ padding: "20% 4% 8%" }}>By Topic</div>
                  <Divider />
                  <div style={{ padding: "5% 0" }}>All Topics</div>
                  <input
                    className="regular-search secondaryText"
                    placeholder="Search for a topic"
                    autoFocus="True"
                    type="text"
                  />

                  <div style={{ padding: "20% 4% 8%" }}>By Year</div>
                  <Divider />
                  <div style={{ padding: "8% 0" }}>
                    {["All Time", "2019", "2018", "2017"].map(year => {
                      return (
                        <div
                          style={{
                            padding: "1% 4%",
                            backgroundColor:
                              this.state.selectedYear === year
                                ? "#e6e6e6"
                                : "#fff"
                          }}
                        >
                          <a onClick={() => this.handleYearChange(year)}>
                            {year}
                          </a>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ padding: "20% 4% 8%" }}>Sort Order</div>
                  <Divider />
                  <div style={{ padding: "8% 0" }}>
                    {["Newest First", "Oldest First"].map(order => {
                      return (
                        <div
                          style={{
                            padding: "1% 4%",
                            backgroundColor:
                              this.state.sortOrder === order
                                ? "#e6e6e6"
                                : "#fff"
                          }}
                        >
                          <a onClick={() => this.handleOrderChange(order)}>
                            {order}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Grid>
              <Grid item xs={8} className="m-padding-left-right-15">
                <div>
                  <div style={{ padding: "0 0 2%" }}>{this.state.header}</div>
                </div>
                <Divider />

                <div
                  style={{
                    display:
                      this.state.header === "Your Content" ? "block" : "none"
                  }}
                >
                  {Object.keys(contentDetails).map(index => {
                    return (
                      <div>
                        <div style={{ padding: "2% 0" }}>
                          <div className="questionNav">
                            <a>
                              {contentDetails[index].contentId[0].questionId}
                            </a>
                          </div>
                          <div
                            className="secondaryText"
                            style={{ padding: "1% 0 0" }}
                          >
                            {this.showInfo(contentDetails[index].contentType)}{" "}
                            {contentDetails[index].timeStamp.slice(0, 10)}
                          </div>
                        </div>
                        <Divider />
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    display:
                      this.state.header === "Your Questions" ? "block" : "none"
                  }}
                >
                  {Object.keys(contentDetails).map(index => {
                    if (
                      contentDetails[index].contentType == "CREATE_QUESTION"
                    ) {
                      return (
                        <div>
                          <div style={{ padding: "2% 0" }}>
                            <div className="questionNav">
                              <a>
                                {contentDetails[index].contentId[0].questionId}
                              </a>
                            </div>
                            <div
                              className="secondaryText"
                              style={{ padding: "1% 0 0" }}
                            >
                              {this.showInfo(contentDetails[index].contentType)}{" "}
                              {contentDetails[index].timeStamp.slice(0, 10)}
                            </div>
                          </div>
                          <Divider />
                        </div>
                      );
                    }
                  })}
                </div>

                <div
                  style={{
                    display:
                      this.state.header === "Your Answers" ? "block" : "none"
                  }}
                >
                  {Object.keys(contentDetails).map(index => {
                    if (
                      contentDetails[index].contentType == "Create a Answer"
                    ) {
                      return (
                        <div>
                          <div style={{ padding: "2% 0" }}>
                            <div className="questionNav">
                              <a>
                                {contentDetails[index].contentId[0].questionId}
                              </a>
                            </div>
                            <div
                              className="secondaryText"
                              style={{ padding: "1% 0 0" }}
                            >
                              {this.showInfo(contentDetails[index].contentType)}{" "}
                              {contentDetails[index].timeStamp.slice(0, 10)}
                            </div>
                          </div>
                          <Divider />
                        </div>
                      );
                    }
                  })}
                </div>

                <div
                  style={{
                    display:
                      this.state.header === "Your Followed Questions"
                        ? "block"
                        : "none"
                  }}
                >
                  {Object.keys(contentDetails).map(index => {
                    if (
                      contentDetails[index].contentType == "Create a Answer"
                    ) {
                      return (
                        <div>
                          <div style={{ padding: "2% 0" }}>
                            <div className="questionNav">
                              <a>
                                {contentDetails[index].contentId[0].questionId}
                              </a>
                            </div>
                            <div
                              className="secondaryText"
                              style={{ padding: "1% 0 0" }}
                            >
                              {this.showInfo(contentDetails[index].contentType)}{" "}
                              {contentDetails[index].timeStamp.slice(0, 10)}
                            </div>
                          </div>
                          <Divider />
                        </div>
                      );
                    }
                  })}
                </div>
              </Grid>

              <Grid item xs={2} className="fix-pos" />
            </Grid>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </div>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // auth: state.auth,
  // userState: state.userState,
  // errors: state.errors,
  // userDetails: state.homeState.userDetails,
  contentDetails: state.contents
});

export default connect(
  mapStateToProps,
  { getContentDetails }
)(withStyles(styles)(withRouter(Content)));
