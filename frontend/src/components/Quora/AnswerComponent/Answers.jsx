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
import Typography from '@material-ui/core/Typography';

import {
  addQuestion,
  getUserDetails,
  getTopicQuestions,
  getQuestions,
  getAnswersForQuestion,
} from "../../../redux/actions/homeAction";

import Feed from "../layout/feed";
import QuestionCard from "../layout/QuestionCard";
import { AskQuestionCard } from "../layout/AskQuestionCard";
import AddQuestion from "../homeComponents/AddQuestion";
import NavHeader from "../header/navHeader";
import AnswerCardForAnswerPage from "./AnswerCardForAnswerPage";
import QuestionCardForAnswerPage from "./QuestionCardForAnswerPage";
const styles = theme => ({});

class Answers extends React.Component {
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
      topicList: topic
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

  /*async componentDidMount() {
    await this.props.getUserDetails(this.props.auth.user._id);

    if (
      this.props.userDetails.interestedTopicList &&
      this.props.userDetails.interestedTopicList.length > 0
    ) {
      this.props.getTopicQuestions(
        this.props.userDetails.interestedTopicList[0]
      );
    } else {
      this.props.getQuestions();
    }
  }*/

  componentDidMount()
  { 
    this.props.getAnswersForQuestion(this.props.match.params.id);
  }

  handleTopicClick = newTopic => {
    this.props.getTopicQuestions(newTopic);
  };

  render() {
    var userTopicList = this.props.userDetails.interestedTopicList;
    var QuestionComp;

    if (this.props.answerforquestions && this.props.answerforquestions.length > 0) {
      QuestionComp = this.props.answerforquestions
        .sort(
          (ques1, ques2) =>
            new Date(ques2.postedTime) - new Date(ques1.postedTime)
        )
        .map(question => {
          return (

            <AnswerCardForAnswerPage question={this.props.answerforquestions[0].question}  answerList = {this.props.answerforquestions[0].answerList}/>
          );
        });
    } else {
      QuestionComp = <React.Fragment>No Data Found</React.Fragment>;
    }
    var AnswerComp;
    if (this.props.answerforquestions && this.props.answerforquestions[0].answerList.length > 0) {
      AnswerComp = this.props.answerforquestions[0].answerList.slice(0, this.state.visible)
        .map(answer => {
          return (

            <QuestionCardForAnswerPage
            answer={answer.answer}
            upvoteCount = {answer.upVotes}
            user={this.props.auth.user}
            answerOwner = {answer.answerOwner}
            postedTime = {answer.postedTime}
            views = {answer.views}
          />
          );
        });
    } else {
      AnswerComp = <React.Fragment>No Data Found</React.Fragment>;
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
        <AppBar className="m-bg-color" position="sticky">
          <NavHeader/>
        </AppBar>
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

              <Grid item xs={8} className="m-padding-left-right-15">
                {QuestionComp}
                {this.props.answerforquestions && <Typography variant="title" component="p">{this.props.answerforquestions[0].answerList.length} Answer</Typography>}<br/>
                {AnswerComp}
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
        { this.props.answerforquestions && this.state.visible <  this.props.answerforquestions[0].answerList.length  &&
             <button onClick={this.loadMore} type="button" className="load-more" style ={{marginLeft: 650}}>Load more</button>
          }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  userDetails: state.homeState.userDetails,
  questions: state.homeState.questions,
  answerforquestions: state.homeState.answerforquestions,

});

export default connect(
  mapStateToProps,
  { addQuestion, getUserDetails, getTopicQuestions, getQuestions, getAnswersForQuestion }
)(withStyles(styles)(Answers));
