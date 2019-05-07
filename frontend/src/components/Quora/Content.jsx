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
import _ from "lodash";

const styles = theme => ({});

//Create a Main Component
class Content extends Component {
  constructor() {
    super();
    this.state = {
      type: "ALL_TYPES",
      header: "Your Content",
      selectedYear: "All Time",
      sortOrder: "Oldest First",
      topic: "",
      userDetails: {},
      contentDetails: [],
      bgColorType: "All Types",
      showMsg: ""
    };
  }

  componentDidMount = () => {
    this.props.getContentDetails(this.props.userDetails._id);
    this.setState({
      contentDetails: this.props.contentDetails.contents,
      showMsg: "Please Select Filters!!"
    });
  };

  handleTypeChange = type => {
    console.log("Hello", type);
    var header = "";
    var typeInRes = "";
    var bgColorType = "";
    switch (type) {
      case "All Types":
        header = "Your Content";
        typeInRes = "ALL_TYPES";
        bgColorType = "All Types";

        break;

      case "Questions Asked":
        header = "Your Questions";
        typeInRes = "CREATE_QUESTION";
        bgColorType = "Questions Asked";
        break;

      case "Questions Followed":
        header = "Your Followed Questions";
        typeInRes = "FOLLOWED_QUESTION";
        bgColorType = "Questions Followed";
        break;

      case "Answers":
        header = "Your Answers";
        typeInRes = "CREATE_ANSWER";
        bgColorType = "Answers";
        break;
    }

    this.setState(
      {
        type: typeInRes,
        header: header,
        bgColorType: bgColorType
      },
      () => this.updateContent()
    );
  };

  handleYearChange = year => {
    this.setState(
      {
        selectedYear: year
      },
      () => this.updateContent()
    );
  };

  handleOrderChange = order => {
    this.setState(
      {
        sortOrder: order
      },
      () => this.updateContent()
    );
  };
  handleTopic = e => {
    console.log("In");
    this.setState(
      {
        topic: e.target.value
      },
      () => this.updateContent()
    );
  };

  updateContent = () => {
    console.log("In2", this);
    let contentDetails = this.props.contentDetails.contents;
    const type = this.state.type;
    const year = this.state.selectedYear;
    const topic = this.state.topic;
    var tempDetails = _.filter(contentDetails, function(item) {
      if (type == "ALL_TYPES") {
        if (year == "All Time") {
          if (topic == "") {
            console.log("item");
            console.log(item);
            return item;
          } else {
            if (
              item.activityType === "CREATE_QUESTION" &&
              item.createdQuestion.topicList.includes(topic)
            ) {
              return item;
            } else if (
              item.activityType === "FOLLOWED_QUESTION" &&
              item.followedQuestion.topicList.includes(topic)
            ) {
              return item;
            } else if (
              item.activityType === "CREATE_ANSWER" &&
              item.createdAnswer.questionId.topicList.includes(topic)
            ) {
              return item;
            }
          }
        } else {
          if (topic == "" && item.timeStamp.slice(0, 4) == year) {
            return item;
          } else {
            if (
              item.activityType === "CREATE_QUESTION" &&
              item.createdQuestion.topicList.includes(topic) &&
              item.timeStamp.slice(0, 4) == year
            ) {
              return item;
            } else if (
              item.activityType === "FOLLOWED_QUESTION" &&
              item.followedQuestion.topicList.includes(topic) &&
              item.timeStamp.slice(0, 4) == year
            ) {
              return item;
            } else if (
              item.activityType === "CREATE_ANSWER" &&
              item.createdAnswer.questionId.topicList.includes(topic) &&
              item.timeStamp.slice(0, 4) == year
            ) {
              return item;
            }
          }
        }
      } else if (
        type == "CREATE_QUESTION" &&
        item.activityType == "CREATE_QUESTION"
      ) {
        console.log(item);
        if (
          year == "All Time" &&
          item.createdQuestion.topicList.includes(topic)
        ) {
          return item;
        } else if (
          item.timeStamp.slice(0, 4) == year &&
          item.createdQuestion.topicList.includes(topic)
        ) {
          return item;
        }
      } else if (
        type == "CREATE_ANSWER" &&
        item.activityType == "CREATE_ANSWER"
      ) {
        if (
          year == "All Time" &&
          item.createdAnswer.questionId.topicList.includes(topic)
        ) {
          return item;
        } else if (
          item.timeStamp.slice(0, 4) == year &&
          item.createdAnswer.questionId.topicList.includes(topic)
        ) {
          return item;
        }
      } else if (
        type == "FOLLOWED_QUESTION" &&
        item.activityType == "FOLLOWED_QUESTION"
      ) {
        if (
          year == "All Time" &&
          item.followedQuestion.topicList.includes(topic)
        ) {
          return item;
        } else if (
          item.timeStamp.slice(0, 4) == year &&
          item.followedQuestion.topicList.includes(topic)
        ) {
          return item;
        }
      }
    });

    /* Sort by time */
    if (this.state.sortOrder == "Oldest First") {
      tempDetails.sort((a, b) =>
        a.timeStamp > b.timeStamp ? 1 : b.timeStamp > a.timeStamp ? -1 : 0
      );
    } else {
      tempDetails.sort((a, b) =>
        a.timeStamp > b.timeStamp ? -1 : b.timeStamp > a.timeStamp ? 1 : 0
      );
    }
    console.log(tempDetails);
    this.setState({
      contentDetails: tempDetails,
      showMsg: ""
    });
  };

  showInfo = type => {
    let resultValue = "";
    switch (type) {
      case "CREATE_ANSWER":
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

    // const contentDetails = this.props.contentDetails.contents;
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
            <div style={{ textAlign: "center", color: "#2b6dad" }}>
              {this.state.showMsg}
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <Grid item xs={2} className="fix-pos">
                <div
                  style={{
                    position: "relative",
                    width: "90%"
                  }}
                >
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
                            cursor: "pointer",
                            backgroundColor:
                              this.state.bgColorType === type
                                ? "#e6e6e6"
                                : "#fff"
                          }}
                          onClick={() => this.handleTypeChange(type)}
                        >
                          {type}
                        </div>
                      );
                    })}
                  </div>

                  {/* By Topic */}
                  <div style={{ padding: "20% 4% 8%" }}>By Topic</div>
                  <Divider />
                  <div style={{ padding: "5% 4%" }}>All Topics</div>
                  <input
                    className="regular-search secondaryText"
                    placeholder="Search for a topic"
                    autoFocus="True"
                    type="text"
                    value={this.topic}
                    onChange={this.handleTopic}
                  />

                  <div style={{ padding: "20% 4% 8%" }}>By Year</div>
                  <Divider />
                  <div style={{ padding: "8% 0" }}>
                    {["All Time", "2019", "2018", "2017"].map(year => {
                      return (
                        <div
                          style={{
                            padding: "1% 4%",
                            cursor: "pointer",
                            backgroundColor:
                              this.state.selectedYear === year
                                ? "#e6e6e6"
                                : "#fff"
                          }}
                          onClick={() => this.handleYearChange(year)}
                        >
                          {year}
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
                            cursor: "pointer",
                            backgroundColor:
                              this.state.sortOrder === order
                                ? "#e6e6e6"
                                : "#fff"
                          }}
                          onClick={() => this.handleOrderChange(order)}
                        >
                          {order}
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
                // style={{
                //   display:
                //     this.state.header === "Your Content" ? "block" : "none"
                // }}
                >
                  {Object.keys(this.state.contentDetails).map(index => {
                    return (
                      <div>
                        <div style={{ padding: "2% 0" }}>
                          <div className="questionNav">
                            {(() => {
                              switch (
                                this.state.contentDetails[index].activityType
                              ) {
                                case "CREATE_QUESTION":
                                  return (
                                    <a
                                    style={{color: '#2b6dad'}}
                                      href={
                                        "/" +
                                        this.state.contentDetails[index]
                                          .createdQuestion._id
                                      }
                                    >
                                      {
                                        this.state.contentDetails[index]
                                          .createdQuestion.question
                                      }
                                    </a>
                                  );

                                case "CREATE_ANSWER":
                                  return (
                                    <a
                                    style={{color: '#2b6dad'}}
                                    href={
                                      "/" +
                                      this.state.contentDetails[index]
                                        .createdAnswer.questionId._id
                                    }
                                    >
                                      {
                                        this.state.contentDetails[index]
                                          .createdAnswer.questionId.question
                                      }
                                    </a>
                                  );

                                case "FOLLOWED_QUESTION":
                                  return (
                                    <a
                                    style={{color: '#2b6dad'}}
                                    href={
                                      "/" +
                                      this.state.contentDetails[index]
                                        .followedQuestion._id
                                    }
                                    >
                                      {
                                        this.state.contentDetails[index]
                                          .followedQuestion.question
                                      }
                                    </a>
                                  );
                              }
                            })()}
                          </div>
                          <div
                            className="secondaryText"
                            style={{
                              padding: "1% 0 0"
                            }}
                          >
                            {this.showInfo(
                              this.state.contentDetails[index].activityType
                            )}{" "}
                            {this.state.contentDetails[index].timeStamp.slice(
                              0,
                              10
                            )}
                          </div>
                        </div>
                        <Divider />
                      </div>
                    );
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
  userDetails: state.homeState.userDetails,
  contentDetails: state.contents
});

export default connect(
  mapStateToProps,
  { getContentDetails }
)(withStyles(styles)(withRouter(Content)));
