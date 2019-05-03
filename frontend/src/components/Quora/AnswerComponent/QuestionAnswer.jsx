import React from "react";
//import "../../../styles/QuestionAnswer.css";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
// import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import NavHeader from "../header/navHeader";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

import {
  getUserDetails,
  getQuestions
} from "../../../redux/actions/homeAction";

import Feed from "../layout/feed";
import QuestionCard from "../layout/QuestionCard";
import { AskQuestionCard } from "../layout/AskQuestionCard";
import  AddQuestion  from "../homeComponents/AddQuestion"
import AnswerCard from "./AnswerCard";

const styles = theme => ({});

class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "Change",
      userDetails: {},
      openAddQuestion: false
    };
  }

  handleClickOpen = () => {
    this.setState({
      openAddQuestion: true
    });
  };

  handleClose = () => {
    this.setState({ openAddQuestion: false });
  };



  render() {
    //var userTopicList = this.props.userDetails.interestedTopicList;
    var userTopicList = ['test1', 'test2'];
    var QuestionComp;

    if (this.props.questions && this.props.questions.length > 0) {
      QuestionComp = this.props.questions
        .sort(
          (ques1, ques2) =>
            new Date(ques2.postedTime) - new Date(ques1.postedTime)
        )
        .map(question => {
          return (
            <AnswerCard
              question={question}
              answerList={question.answerList}
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
              <Grid item xs={2} className="fix-pos">
                <div style={{ position: "fixed", width: "11%" }}>
                <h6><div>Questions</div></h6>
                <Divider/>
                <h6><div>Questions for you</div></h6>
                <h6><div>Answer Request</div></h6>
                <h6><div>Answer Later</div></h6>
                <h6><div>Draft</div></h6>
                </div>
              </Grid>
              <Grid item xs={8} className="m-padding-left-right-15">
                <AskQuestionCard
                  user={this.props.auth.user}
                  handleClickOpen={() => this.handleClickOpen()}
                />
                <Paper elevation={1} className="m-padding-10">
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                // className="m-margin-up-down"
                >
                <Grid item>
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                    <g id="star" class="icon_svg-stroke icon_svg-fill" stroke="#666" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linejoin="round">
                        <polygon id="Star" points="12 16.6175467 7.05572809 19.2169043 8 13.7113766 4 9.81234022 9.52786405 9.00909456 12 4 14.472136 9.00909456 20 9.81234022 16 13.7113766 16.9442719 19.2169043"></polygon>
                    </g>
                </svg>
                </Grid>
                <Grid item>
                <h5>Question for You</h5>
                </Grid>
                </Grid>
                </Paper> 
                {QuestionComp}
              </Grid>

              <Grid item xs={2} className="fix-pos">
                <Paper className="m-paper" elevation={1}>
                <b>Add topics you know about</b>
             
                  {/* {for (let index = 0; index < 10; index++) {

                                        
                                    }} */}


                    <br/><br/>
                    <p>Adding more topics will helps us find questions for you to answer.</p>
                    <Button variant="contained" className="btn-margin">
                        Add Topic
                    </Button>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} />
        </Grid>
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
    { getUserDetails, getQuestions }
  )(withStyles(styles)(QuestionAnswer));
  