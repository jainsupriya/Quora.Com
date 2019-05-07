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
import Avatar from "@material-ui/core/Avatar";
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
      askedQuestion: [],
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
        console.log(this.props.user);
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
        bgColorType: bgColorType,
        askedQuestion: this.props.profile.askedQuestion,
        answer: this.props.profile.userAnswer,
        questionfollowed: this.props.profile.followedQuestion
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
    let askedQuestion = this.props.profile.askedQuestion;
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
      contentDetails: tempDetails,
      askedQuestion: askedQuestion
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
    
    var QuestionComp;
    var questionAskedMap = this.props.profile.askedQuestion.map(item => {
      console.log(item);
      return (
        <AnswerCardForAnswerPage
          question={item.createdQuestion.question}
          answerList={item.createdQuestion.answerList}
          myanswer="true"
          question_id={item.createdQuestion._id}
        />
      );
    });
    var questionAnswerMap = Object.keys(this.props.profile.userAnswer).map(
      index => {
        return (
          <QuestionCardForAnswerPage
            question={
              this.props.profile.userAnswer[index].createdAnswer.questionId
                .question
            }
            answer={this.props.profile.userAnswer[index].createdAnswer.answer}
            upvoteCount={
              this.props.profile.userAnswer[index].createdAnswer.upVotes
            }
            user={this.props.auth.user}
            answerOwner={
              this.props.profile.userAnswer[index].createdAnswer.answerOwner
            }
            postedTime={
              this.props.profile.userAnswer[index].createdAnswer.postedTime
            }
            views={this.props.profile.userAnswer[index].createdAnswer.views}
            myanswer="true"
          />
        );
      }
    );
    var questionFollowedMap = Object.keys(
      this.props.profile.followedQuestion
    ).map(index => {
      return (
        <div style={{ padding: "2% 0" }}>
          <div className="questionNav">
            <a
              style={{ color: "#2b6dad" }}
              href={
                "/" +
                this.props.profile.followedQuestion[index].followedQuestion._id
              }
            >
              {
                this.props.profile.followedQuestion[index].followedQuestion
                  .question
              }
            </a>
          </div>
        </div>
      );
    });
    var followerMap =
      this.props.profile.follower.size !== 0
        ? Object.keys(this.props.profile.follower[0].followersUserList).map(
            index => {
              return (
                <div>
                  <div style={{ padding: "2% 0" }}>
                    <div className="questionNav">
                      <Avatar
                        alt={
                          this.props.profile.follower[0].followersUserList[
                            index
                          ]
                        }
                        src={
                          this.props.profile.follower[0].followersUserList[
                            index
                          ].profileImg
                        }
                        className="avatar"
                      />
                      <a
                        href={`/profile/${
                          this.props.profile.follower[0].followersUserList[
                            index
                          ]._id
                        }`}
                      >
                        {this.props.profile.follower[0].followersUserList[index]
                          .fname +
                          "  " +
                          this.props.profile.follower[0].followersUserList[
                            index
                          ].lname}
                      </a>
                    </div>
                    <div
                      className="secondaryText"
                      style={{
                        padding: "1% 0 0"
                      }}
                    />
                  </div>
                  <Divider />
                </div>
              );
            }
          )
        : "";
    var followingMap = Object.keys(
      this.props.profile.following[0].followingUserList
    ).map(index => {
      return (
        <div>
          <div style={{ padding: "2% 0" }}>
            <div className="questionNav">
              <Avatar
                alt={this.props.profile.following[0].followingUserList[index]}
                src={
                  this.props.profile.following[0].followingUserList[index]
                    .profileImg
                }
                className="avatar"
              />
              <a
                href={`/profile/${
                  this.props.profile.following[0].followingUserList[index]._id
                }`}
              >
                {this.props.profile.following[0].followingUserList[index]
                  .fname +
                  "  " +
                  this.props.profile.following[0].followingUserList[index]
                    .lname}
              </a>
            </div>
            <div
              className="secondaryText"
              style={{
                padding: "1% 0 0"
              }}
            />
          </div>
          <Divider />
        </div>
      );
    });

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
                  <Divider />
                </div>

                <div>
                  {(() => {
                  
                    switch (this.state.header) {
                      case "Your Questions":
                        return questionAskedMap;
                        break;
                      case "Your Answers":
                        // if (this.props.profile.userAnswer !== undefined) {
                        return questionAnswerMap;
                        // }
                        break;
                      case "Your Followed Questions":
                        // if (
                        //   this.props.profile.followedQuestion != undefined ||
                        //   this.props.profile.followedQuestion != []
                        // ) {
                        return questionFollowedMap;
                        // }
                        break;
                      case "Followers":
                        // if (this.props.profile.follower[0] !== undefined) {
                        return followerMap;
                        //  }
                        break;
                      case "Following":
                        // if (this.props.profile.following[0] !== undefined) {
                        return followingMap;
                        //}
                        break;
                    }
                  })()}
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
