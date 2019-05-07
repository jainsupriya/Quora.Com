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
//import NavHeader from "./header/navHeader";
import AppBar from "@material-ui/core/AppBar";
//import Home from "./homeComponents/Home";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { getContentDetails } from "../../../redux/actions/contentAction";
import {
  getAskedQuestion,
  getFollowedQuestion,
  getUserAnswer,
  getFollowers,
  getFollowing
} from "../../../redux/actions/profileActions";
import _ from "lodash";
import QuestionCardForAnswerPage from "../AnswerComponent/QuestionCardForAnswerPage";
import AnswerCardForAnswerPage from "../AnswerComponent/AnswerCardForAnswerPage";
const styles = theme => ({});

//Create a Main Component
class ProfileContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "ALL_TYPES",
      header: "Your Content",
      selectedYear: "All Time",
      sortOrder: "Oldest First",
      topic: "",
      userDetails: {},
      contentDetails: [],
      bgColorType: "All Types",
      questionAsked: [],
      questionfollowed: [],
      answer: [],
      follower: [],
      following: []
    };
  }

  componentDidMount = () => {
    this.props.getContentDetails(this.props.user);
    this.setState({
      contentDetails: this.props.contentDetails.contents
    });
  };

  handleTypeChange = type => {
    // console.log("Hello", type);
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
        this.props.getAskedQuestion(this.props.user);

        break;

      case "Questions Followed":
        header = "Your Followed Questions";
        typeInRes = "FOLLOWED_QUESTION";
        bgColorType = "Questions Followed";
        this.props.getFollowedQuestion(this.props.user);
        break;

      case "Answers":
        header = "Your Answers";
        typeInRes = "CREATE_ANSWER";
        bgColorType = "Answers";
        this.props.getUserAnswer(this.props.user);
        break;

      case "Followers":
        header = "Followers";
        typeInRes = "CREATE_ANSWER";
        bgColorType = "Followers";
        this.props.getFollowers(this.props.user);

        break;

      case "Following":
        header = "Following";
        typeInRes = "CREATE_ANSWER";
        bgColorType = "Following";
        this.props.getFollowing(this.props.user);

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
    // console.log("In");
    this.setState(
      {
        topic: e.target.value
      },
      () => this.updateContent()
    );
  };

  updateContent = () => {
    // console.log("In2", this);
    let contentDetails = this.props.contentDetails.contents;
    const type = this.state.type;
    const year = this.state.selectedYear;
    const topic = this.state.topic;
    var tempDetails = _.filter(contentDetails, function(item) {
      // console.log(type);
      // console.log(year);
      // console.log(topic);
      if (type == "ALL_TYPES") {
        if (year == "All Time") {
          if (topic == "") {
            // console.log("item");
            // console.log(item);
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
        // console.log(item);
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
    // console.log(tempDetails);
    this.setState({
      contentDetails: tempDetails
    });
  };

  showInfo = type => {
    // console.log(type);
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
    console.log(this.props);
    var QuestionComp;

    return (
      <div>
        {/* <AppBar className="m-bg-color" position="sticky">
          <NavHeader />
        </AppBar> */}

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <Grid item xs={3} className="fix-pos">
                <div
                  style={{
                    position: "relative",
                    width: "90%"
                  }}
                >
                  <div style={{ padding: "4% 4% 4%" }}>Feeds</div>
                  <Divider />
                  <div style={{ padding: "8% 0" }}>
                    {[
                      "All Types",
                      "Questions Asked",
                      "Questions Followed",
                      "Answers",
                      "Following",
                      "Followers",
                      "Activity",
                      "Posts",
                      "Spaces",
                      "Activity",
                      "Posts"
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
                </div>
              </Grid>

              <Grid item xs={9} className="m-padding-left-right-15">
                <div>
                  <div style={{ padding: "1% 2% 2% 1%" }}>
                    {this.state.header}
                  </div>
                </div>

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
                            <a>
                              {(() => {
                                switch (
                                  this.state.contentDetails[index].activityType
                                ) {
                                  case "CREATE_QUESTION":
                                    return (
                                      <AnswerCardForAnswerPage
                                        question={
                                          this.state.contentDetails[index]
                                            .createdQuestion.question
                                        }
                                        answerList={
                                          this.state.contentDetails[index]
                                            .createdQuestion.answerList
                                        }
                                        myanswer="true"
                                        question_id={
                                          this.state.contentDetails[index]
                                            .createdQuestion._id
                                        }
                                      />
                                    );
                                  case "CREATE_ANSWER":
                                    return (
                                      <QuestionCardForAnswerPage
                                        question={
                                          this.state.contentDetails[index]
                                            .createdAnswer.questionId.question
                                        }
                                        answer={
                                          this.state.contentDetails[index]
                                            .createdAnswer.answer
                                        }
                                        upvoteCount={
                                          this.state.contentDetails[index]
                                            .createdAnswer.upVotes
                                        }
                                        user={this.props.auth.user}
                                        answerOwner={
                                          this.state.contentDetails[index]
                                            .createdAnswer.answerOwner
                                        }
                                        postedTime={
                                          this.state.contentDetails[index]
                                            .createdAnswer.postedTime
                                        }
                                        views={
                                          this.state.contentDetails[index]
                                            .createdAnswer.views
                                        }
                                        myanswer="true"
                                      />
                                    );
                                  case "FOLLOWED_QUESTION":
                                    return this.state.contentDetails[index]
                                      .followedQuestion.question;
                                }
                              })()}
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Grid>

              <Grid item xs={2} className="fix-pos" />
            </Grid>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </div>
    );
  }
}

ProfileContent.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object,
  getAskedQuestion: PropTypes.func,
  getFollowedQuestion: PropTypes.func,
  getFollowedQuestion: PropTypes.func,
  getFollowers: PropTypes.func,
  getFollowing: PropTypes.func
};

const mapStateToProps = state => ({
  // auth: state.auth,
  // userState: state.userState,
  // errors: state.errors,
  //userDetails: state.homeState.userDetails,
  profile: state.profile,
  auth: state.auth,
  contentDetails: state.contents
});

export default connect(
  mapStateToProps,
  {
    getContentDetails,
    getAskedQuestion,
    getFollowedQuestion,
    getUserAnswer,
    getFollowers,
    getFollowing
  }
)(withStyles(styles)(withRouter(ProfileContent)));
