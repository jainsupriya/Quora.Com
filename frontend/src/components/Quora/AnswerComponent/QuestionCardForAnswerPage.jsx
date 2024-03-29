import React from "react";
// import "../styles/home.css";
import "../../../styles/questionCard.css";
import { withStyles } from "@material-ui/core/styles";
// import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Parser from "html-react-parser";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import ReadMoreReact from "read-more-react";
import isEmpty from "../../../validator/is-empty";
import moment from "moment";
import axios from "axios";

import { Link } from "react-router-dom";
import AnswerCard from "../AnswerComponent/AnswerCard";
import AnswerCardForAnswerPage from "./AnswerCardForAnswerPage";
import Editor from "./Editor";
const styles = theme => ({});

class QuestionCardForAnswerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "No answer",
      isUpvoted: false,
      upvoteCount: 0,
      comment: "New Comment added",
      showComment: false,
      readMore: false,
      views: "",
      editAnswer:false
    };
  }
  readMoreText = () => {
    this.setState({ readMore: true });
    console.log(this.props.answer._id);
    if (this.props.answer !== undefined) {
      axios.put(`/answer/view/` + this.props.answer_id).then(response => {
        if (response.status === 200) {
          this.setState({
            views: this.state.views + 1
          });
        }
      });
    }
  };
  handleClose = () => {
    this.setState({ openQuill: false });
  };
  handleEdit = () => {
    this.setState({ 
      editAnswer: !this.state.editAnswer ,
      openQuill:true });
  };
  readMoreTextClose = () => {
    this.setState({ readMore: false });
  };
  componentDidMount() {
    console.log("answerList" + this.props.answerList);
    var upvoteCount = 0;
    var isUpvoted = false;

    this.setState({ views: this.props.views });
    if (this.props.answerList !== undefined && this.props.answerList.length) {
      if (
        this.props.answerList[0].upVotes !== undefined &&
        this.props.answerList[0].upVotes.length
      ) {
        upvoteCount = this.props.answerList[0].upVotes.length;
        if (this.props.answerList[0].upVotes.includes(this.props.user._id)) {
          isUpvoted = true;
        }
      }
    }
    this.setState({
      isUpvoted: isUpvoted,
      upvoteCount: upvoteCount
    });
  }

  handleUpvote = (isUpvoted, upvoteCount, answerOwnerId) => {
    if (!isUpvoted) {
      upvoteCount = upvoteCount + 1;
      axios
        .put(`/answer/upvoteInc/${this.props.user._id}/${answerOwnerId}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    } else {
      upvoteCount = upvoteCount > 0 ? upvoteCount - 1 : 0;
      axios
        .put(`/answer/upvoteDec/${this.props.user._id}/${answerOwnerId}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    this.setState({
      isUpvoted: !isUpvoted,
      upvoteCount: upvoteCount
    });
  };

  handleAddComment = () => {
    this.setState({
      showComment: true
    });
  };

  render() {
    const { question, user } = this.props;
    var comp = "";
    var upvotecomp = "";
    var upvoteCount = 0;
    var isUpvoted = false;
    if (this.props.answer !== undefined && this.props.answer.length) {
      var answer = this.props.answerList;

      if (this.props.upVotes !== undefined && this.props.upVotes.length) {
        upvoteCount = this.props.upVotes.length;

        if (this.props.answer.includes(user._id)) {
          isUpvoted = true;
          upvotecomp = (
            <span>
              <span>
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    id="upvote"
                    className="icon_svg-stroke icon_svg-fill"
                    stroke-width="1.5"
                    stroke="#666"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                  >
                    <polygon points="12 4 3 15 9 15 9 20 15 20 15 15 21 15" />
                  </g>
                </svg>
              </span>
              <span className="m-padding-left-right-15 upvote-pressed">
                {" "}
                <Link
                  to=""
                  onClick={() =>
                    this.handleUpvote(
                      isUpvoted,
                      upvoteCount,
                      question.answerList[0]._id
                    )
                  }
                >{`Upvote`}</Link>
              </span>
            </span>
          );
        }
      } else {
        isUpvoted = false;
        upvotecomp = (
          <span>
            <span>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="upvote"
                  stroke-width="1.5"
                  stroke="#666"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                >
                  <polygon points="12 4 3 15 9 15 9 20 15 20 15 15 21 15" />
                </g>
              </svg>
            </span>
            <span className="m-padding-left-right-15">
              <Link
                to=""
                onClick={() =>
                  this.handleUpvote(
                    isUpvoted,
                    upvoteCount,
                    question.answerList[0]._id
                  )
                }
              >{`Upvote`}</Link>
            </span>
          </span>
        );
      }

      comp = (
        <div>
          <Paper elevation={2} className="m-padding-10">
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              // className="m-margin-up-down"
            >
              <Grid item>
                <span className="reason-txt">Answer · Recommended for you</span>
              </Grid>
              <React.Fragment>
                {this.props.question && (
                  <Typography variant="subtitle">
                    {this.props.question}
                  </Typography>
                )}
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item>
                    {this.props.user && (
                      <Avatar
                        alt={
                          this.props.isAnonymous === false
                            ? this.props.user.fname +
                              " " +
                              this.props.user.lname
                            : "Anonymous User"
                        }
                        src={
                          this.props.isAnonymous === false
                            ? this.props.user.profileImg
                            : ""
                        }
                        className="avatar"
                      />
                    )}
                    {!this.props.user && (
                      <Avatar
                        alt={
                          this.props.isAnonymous === false
                            ? this.props.answerOwner.fname +
                              " " +
                              this.props.answerOwner.lname
                            : "Anonymous User"
                        }
                        src={
                          this.props.answerOwner !== undefined
                            ? this.props.answerOwner.profileImg
                            : ""
                        }
                        className="avatar"
                      />
                    )}
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="flex-start"
                      className="m-margin-up-down"
                    >
                      {this.props.user && (
                        <Grid item className="black-clr">
                          {this.props.isAnonymous === false
                            ? this.props.user.fname +
                              " " +
                              this.props.user.lname
                            : "Anonymous User"}
                        </Grid>
                      )}
                      {!this.props.user && (
                        <Grid item className="black-clr">
                          {this.props.answerOwner === false
                            ? this.props.answerOwner.fname +
                              " " +
                              this.props.answerOwner.lname
                            : "Anonymous User"}
                        </Grid>
                      )}
                      <Grid item className="fnt-13">
                        {"Answered"}{" "}
                        {moment(
                          new Date(this.props.postedTime),
                          "MMMM Do YYYY, h:mm:ss a"
                        ).fromNow()}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item className="ans-main-content">
                  {!this.state.readMore && (
                    <Typography
                      variant="subtitle"
                      style={{
                        height: 20,
                        maxWidth: 750,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}
                      onClick={() => this.readMoreText()}
                    >
                      {Parser(this.props.answer)}
                    </Typography>
                  )}
                  {this.state.readMore && (
                    <Typography
                      variant="subtitle"
                      onClick={() => this.readMoreTextClose()}
                    >
                      {Parser(this.props.answer)}
                    </Typography>
                  )}
                </Grid>

                <Grid item className="votes">
                  {this.state.views} {`views`}
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                  className="answer-actions"
                >
                  <Grid item>
                    {upvotecomp}
                    <span className="m-padding-left-right-15">
                      {" "}
                      {upvoteCount}
                    </span>
                    <span>
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="sync"
                          class="icon_svg-stroke"
                          stroke="#666"
                          stroke-width="1.5"
                          fill="none"
                          fill-rule="evenodd"
                          stroke-linecap="round"
                        >
                          <path
                            d="M19.7477789,9.99927692 C18.8594418,6.54918939 15.7274185,4 12,4 C8.27166139,4 5.13901185,6.55044813 4.25156364,10.0018321 M4.25328626,14.0048552 C5.14305933,17.4528459 8.2740698,20 12,20 C15.7261126,20 18.8572473,17.4525964 19.7468444,14.0043488"
                            id="circle"
                          />
                          <polyline
                            id="arrow"
                            transform="translate(4.742997, 8.742997) rotate(-20.000000) translate(-4.742997, -8.742997) "
                            points="2.99299734 6.99299734 2.99299734 10.4929973 6.49299734 10.4929973"
                          />
                          <polyline
                            id="arrow"
                            transform="translate(19.242997, 15.242997) scale(-1, -1) rotate(-20.000000) translate(-19.242997, -15.242997) "
                            points="17.4929973 13.4929973 17.4929973 16.9929973 20.9929973 16.9929973"
                          />
                        </g>
                      </svg>
                    </span>
                    <span className="m-padding-left-right-15" style={{cursor:"pointer"}} onClick={this.handleEdit}>{`Edit`}</span>
                    <span className="m-padding-left-right-15">{`2`}</span>
                  </Grid>
                  <Grid item>
                    <span className="m-padding-left-right-15">
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="downvote"
                          class=""
                          stroke="#666"
                          fill="none"
                          stroke-width="1.5"
                          fill-rule="evenodd"
                          stroke-linejoin="round"
                        >
                          <polygon
                            transform="translate(12.000000, 12.000000) rotate(-180.000000) translate(-12.000000, -12.000000) "
                            points="12 4 3 15 9 15 9 20 15 20 15 15 21 15"
                          />
                        </g>
                      </svg>
                    </span>
                    <span className="m-padding-left-right-15">
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="share"
                          class="icon_svg-stroke"
                          stroke="#666"
                          fill="none"
                          stroke-width="1.5"
                          fill-rule="evenodd"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M12.0001053,2.99989467 L4.00010533,12.7776724 L9.33343867,12.7776724 C9.78266695,14.7041066 10.5048892,16.2782509 11.5001053,17.5001053 C12.4953215,18.7219597 13.9953215,19.8886264 16.0001053,21.0001053 C15.3415908,19.6668553 14.8428108,18.1668553 14.5037654,16.5001053 C14.16472,14.8333553 14.2190556,13.5925444 14.666772,12.7776724 L20.0001053,12.7776724 L12.0001053,2.99989467 Z"
                            transform="translate(12.000105, 12.000000) rotate(90.000000) translate(-12.000105, -12.000000) "
                          />
                        </g>
                      </svg>
                    </span>
                    <span className="m-padding-left-right-15">
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="overflow"
                          class="icon_svg-stroke"
                          stroke-width="1.5"
                          stroke="#666"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <path d="M5,14 C3.8954305,14 3,13.1045695 3,12 C3,10.8954305 3.8954305,10 5,10 C6.1045695,10 7,10.8954305 7,12 C7,13.1045695 6.1045695,14 5,14 Z M12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 Z M19,14 C17.8954305,14 17,13.1045695 17,12 C17,10.8954305 17.8954305,10 19,10 C20.1045695,10 21,10.8954305 21,12 C21,13.1045695 20.1045695,14 19,14 Z" />
                        </g>
                      </svg>
                    </span>
                  </Grid>
                </Grid>
                <Divider className="m-divider" />
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  // className="m-margin-up-down"
                >
                  <Grid item>
                    <Avatar
                      alt={user.firstname}
                      src={user.profileImg}
                      className="avatar"
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <input
                      type="text"
                      class="form-control corner-rounded"
                      placeholder="Add a Comment"
                      onChange={e => {
                        this.setState({
                          comment: e.target.value
                        });
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      className="btn-margin"
                      onClick={() => {
                        this.handleAddComment();
                      }}
                    >
                      Add Comment
                    </Button>
                  </Grid>
                  {this.state.showComment ? (
                    <div className="comment_wrapper">
                      <Avatar
                        alt={user.fname}
                        src={user.profileImg}
                        className="avatar"
                      />
                      <div className="ui_layout_text">
                        <span style={{ fontWeight: "bold", color: "black" }}>
                          {" "}
                          {user.fname + " " + user.lname}
                        </span>
                        <Grid item className="fnt-13">
                          {"Just now"}
                        </Grid>
                        {this.state.comment}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>
              </React.Fragment>
            </Grid>
            {this.state.openQuill && (
            <Editor answerid={ this.props.answer_id}  toggle={this.handleClose}  editAnswer={this.props.question}/>
          )}
          </Paper>
        </div>
      );
    } else {
      answer = "No Answer";
    }

    return <React.Fragment>{comp}</React.Fragment>;
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  state: state.homeState,
  userState: state.userState
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(QuestionCardForAnswerPage));

// comp =  <AnswerCardForAnswerPage question={this.props.question}  answerList = {this.props.answerList[0]}/>
