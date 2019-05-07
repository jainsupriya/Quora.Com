import React from "react";
import "../../../styles/home.css";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
// import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import Loading from "../../commons/Loading";

import Pusher from 'pusher-js';


import BookmarkFeed from "../layout/BookmarkFeed";
import {
  addQuestion,
  getUserDetails,
  getTopicQuestions,
  getQuestions
} from "../../../redux/actions/homeAction";

import Feed from "../layout/feed";
import QuestionCard from "../layout/QuestionCard";
import { AskQuestionCard } from "../layout/AskQuestionCard";
import AddQuestion from "./AddQuestion";
import BookmarkedAnswers from "../layout/BookmarkedAnswers";
const styles = theme => ({});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "topic1",
      userDetails: {},
      openAddQuestion: false,
      visible: 2,
      isBookMarkedClicked: false
    };
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState(prev => {
      return { visible: prev.visible + 2 };
    });
  }

  handleAddQuestion = (question, topic) => {
    var questionData = {
      question: question,
      questionOwner: this.props.auth.user._id,
      topicList: topic
    };

    this.props.addQuestion(questionData);
  };

  handleClickOpen = () => {
    this.setState({
      openAddQuestion: true
    });
  };

  handleClose = () => {
    this.setState({ openAddQuestion: false });
  };

  componentDidMount() {
    this.props.getUserDetails(this.props.auth.user._id);
  }

  handleTopicClick = newTopic => {
    this.props.getTopicQuestions(newTopic);
    this.setState({ isBookMarkedClicked: false });
  };

  handleBookMarkClick = userId => {
    this.setState({ isBookMarkedClicked: true });
  };

  render() {
    var QuestionComp;

    
  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

    var pusher = new Pusher('67f71ccfff5990b594ee', {
      cluster: 'us3',
      forceTLS: true
    });

    var channel = pusher.subscribe('quora');
    channel.bind('post-answer', function(data) {
      console.log(JSON.stringify(data));
    });

    var userTopicList =
      this.props.userDetails !== undefined &&
      this.props.userDetails.interestedTopicList !== undefined &&
      this.props.userDetails.interestedTopicList.length
        ? this.props.userDetails.interestedTopicList
        : ["topic1"];
    if (this.props.questions && this.props.questions.length > 0) {
      QuestionComp = this.props.questions

        .sort(
          (ques1, ques2) =>
            new Date(ques2.postedTime) - new Date(ques1.postedTime)
        )
        .slice(0, this.state.visible)
        .map(question => {
          return (
            <QuestionCard
              question={question}
              answerList={question.answerList}
              user={this.props.userDetails}
            />
          );
        });
    } else {
      QuestionComp = (
        <React.Fragment>
          <Loading />
        </React.Fragment>
      );
    }
    var bookMarkedComp = (
      <React.Fragment>
        <BookmarkedAnswers userId={this.props.auth.user._id} />
      </React.Fragment>
    );
    var compToDisplay;
    if (this.state.isBookMarkedClicked) {
      compToDisplay = bookMarkedComp;
    } else {
      compToDisplay = (
        <React.Fragment>
          <AskQuestionCard
            user={this.props.userDetails}
            handleClickOpen={() => this.handleClickOpen()}
          />
          {QuestionComp}
        </React.Fragment>
      );
    }

    var addQuestion = "";

    if (this.state.openAddQuestion === true)
      addQuestion = (
        <AddQuestion
          openAddQuestion={this.state.openAddQuestion}
          handleClose={() => this.handleClose()}
          handleAddQuestion={this.handleAddQuestion}
        />
      );

    return (
      <div>
        {addQuestion}
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
                <div style={{ position: "fixed", width: "11%" }}>
                  <h3>Topics</h3>
                  {userTopicList !== undefined
                    ? userTopicList.map(topic => {
                        return (
                          <Feed
                            topic={topic}
                            handleTopicClick={() =>
                              this.handleTopicClick(topic)
                            }
                          />
                        );
                      })
                    : ""}
                  <BookmarkFeed
                    handleBookMarkClick={() =>
                      this.handleBookMarkClick(this.props.auth.user._id)
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={8} className="m-padding-left-right-15">
                {compToDisplay}
              </Grid>

              <Grid item xs={2} className="fix-pos">
                <Paper className="m-paper" elevation={1}>
                  Improve Your Feed
                  <Divider />
                  {/* {for (let index = 0; index < 10; index++) {
                                        
                                    }} */}
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <div className="check" />
                    </Grid>
                    <Grid item xs={11}>
                      {"Improve Your Feed"}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <div className="check" />
                    </Grid>
                    <Grid item xs={11}>
                      {"Improve Your Feed"}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} />
        </Grid>
        {this.props.questions !== undefined &&
          this.props.questions.length &&
          !this.state.isBookMarkedClicked &&
          this.state.visible < this.props.questions.length && (
            <button onClick={this.loadMore} type="button" className="load-more">
              Load more
            </button>
          )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  userDetails: state.homeState.userDetails,
  questions: state.homeState.questions
});

export default connect(
  mapStateToProps,
  { addQuestion, getUserDetails, getTopicQuestions, getQuestions }
)(withStyles(styles)(Home));
