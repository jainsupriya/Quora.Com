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
const styles = theme => ({});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "Change",
      userDetails: {},
      openAddQuestion: false,
      visible :2
    };
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState((prev) => {
      return {visible: prev.visible + 2};
    });
  }


  handleAddQuestion = (question, topic) => {
    var questionData = {
      question: question,
      questionOwner: this.props.auth.user._id,
      interestedTopicList: []
    };

    this.props.addQuestion(questionData);
    this.setState({ openAddQuestion: false });
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

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.questions != this.props.questions) {
  //     console.log("changed::" + JSON.stringify(nextProps.questions));
  //     this.props.getUserDetails(nextProps.auth.user._id);
  //   }
  // }

  handleTopicClick = newTopic => {
    this.props.getTopicQuestions(newTopic);
  };

  render() {
    var QuestionComp;
    var userTopicList =
      this.props.userDetails !== undefined
        ? this.props.userDetails.interestedTopicList
        : [];
    if (this.props.questions && this.props.questions.length > 0) {
      QuestionComp = this.props.questions.slice(0, this.state.visible)
        .sort(
          (ques1, ques2) =>
            new Date(ques2.postedTime) - new Date(ques1.postedTime)
        )
        .map(question => {
          return (
            <QuestionCard
              question={question}
              answerList={question.answerList}
              user={this.props.auth.user}
            />
          );
        });
    } else {
      QuestionComp = <React.Fragment>No Data Found</React.Fragment>;
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
                </div>
              </Grid>
              <Grid item xs={8} className="m-padding-left-right-15">
                <AskQuestionCard
                  user={this.props.auth.user}
                  handleClickOpen={() => this.handleClickOpen()}
                />
                {QuestionComp}
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
          {this.props.questions.length&& this.state.visible <  this.props.questions.length &&
             <button onClick={this.loadMore} type="button" className="load-more">Load more</button>
          }
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
