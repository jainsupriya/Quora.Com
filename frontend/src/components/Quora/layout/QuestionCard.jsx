import React from "react";
// import "../styles/home.css";
import "../../../styles/questionCard.css";
import Parser from "html-react-parser";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import { BookmarkBorder, Bookmark } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
import iReact from "read-more-react";
import isEmpty from "../../../validator/is-empty";
import moment from "moment";
import axios from "axios";

import { Link } from "react-router-dom";
import AnswerCard from "../AnswerComponent/AnswerCard";
const styles = theme => ({});

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "No answer",
      isUpvoted: false,
      upvoteCount: 0,
      addedComment: "",
      showComments: false,
      readMore: false,
      isBookmarked: false,
      commentList: [],
      visible: 2
    };
    this.loadMore = this.loadMore.bind(this);
  }
  loadMore() {
    this.setState(prev => {
      return { visible: prev.visible + 2 };
    });
  }
  showComments = () => {
    this.setState({ showComments: !this.state.showComments });
  };
  readMoreText = () => {
    this.setState({ readMore: true });

    if (this.props.question !== undefined) {
      console.log(this.props.question.answerList[0]._id);
      axios
        .put(`/answer/view/` + this.props.question.answerList[0]._id)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data);

            this.setState({
              view: this.state.view + 1
            });
          }
        });
    }
  };
  readMoreTextClose = () => {
    this.setState({ readMore: false });
  };
  componentDidMount() {
    var upvoteCount = 0;
    var isUpvoted = false;
    var isBookmarked = false;

    if (
      this.props.question.answerList !== undefined &&
      this.props.question.answerList.length
    ) {
      axios
        .get(`/answerWithCommentList/${this.props.question.answerList[0]._id}`)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              commentList: response.data[0].commentList
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      // commentList = this.props.question.answerList[0].commentList;
      if (
        this.props.user.bookmarkedAnswerList !== undefined &&
        this.props.user.bookmarkedAnswerList.length &&
        this.props.user.bookmarkedAnswerList.includes(
          this.props.question.answerList[0]._id
        )
      ) {
        isBookmarked = true;
      }

      if (
        this.props.question.answerList[0].upVotes !== undefined &&
        this.props.question.answerList[0].upVotes.length
      ) {
        upvoteCount = this.props.question.answerList[0].upVotes.length;
        if (
          this.props.question.answerList[0].upVotes.includes(
            this.props.user._id
          )
        ) {
          isUpvoted = true;
        }
      }
    }
    this.setState({
      isUpvoted: isUpvoted,
      upvoteCount: upvoteCount,
      isBookmarked: isBookmarked
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.question != nextProps.question) {
      var upvoteCount = 0;
      var isUpvoted = false;
      var isBookmarked = false;
      var commentList = [];
      if (
        nextProps.question.answerList !== undefined &&
        nextProps.question.answerList.length
      ) {
        axios
          .get(`/answerWithCommentList/${nextProps.question.answerList[0]._id}`)
          .then(response => {
            if (response.status === 200) {
              this.setState({
                commentList: response.data[0].commentList
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
        // commentList = nextProps.question.answerList[0].commentList;
        if (
          nextProps.user.bookmarkedAnswerList !== undefined &&
          nextProps.user.bookmarkedAnswerList.length &&
          nextProps.user.bookmarkedAnswerList.includes(
            nextProps.question.answerList[0]._id
          )
        ) {
          isBookmarked = true;
        }
        if (
          nextProps.question.answerList[0].upVotes !== undefined &&
          nextProps.question.answerList[0].upVotes.length
        ) {
          upvoteCount = nextProps.question.answerList[0].upVotes.length;
          if (
            nextProps.question.answerList[0].upVotes.includes(
              this.props.user._id
            )
          ) {
            isUpvoted = true;
          }
        }
      }
      this.setState({
        isUpvoted: isUpvoted,
        upvoteCount: upvoteCount,
        isBookmarked: isBookmarked,
        commentList: commentList
      });
    }
  }

  handleUpvote = answerOwnerId => {
    var upvoteCount = 0;
    if (!this.state.isUpvoted) {
      upvoteCount = this.state.upvoteCount + 1;
      axios
        .put(`/answer/upvoteInc/${this.props.user._id}/${answerOwnerId}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    } else {
      upvoteCount = this.state.upvoteCount > 0 ? this.state.upvoteCount - 1 : 0;
      axios
        .put(`/answer/upvoteDec/${this.props.user._id}/${answerOwnerId}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    this.setState({
      isUpvoted: !this.state.isUpvoted,
      upvoteCount: upvoteCount
    });
  };

  handleBookmarkAnswer = answerId => {
    if (!this.state.isBookmarked) {
      axios
        .put(`/user/bookmarkAnswer/${this.props.user._id}/${answerId}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    } else {
      axios
        .put(`/user/unBookmarkAnswer/${this.props.user._id}/${answerId}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    this.setState({
      isBookmarked: !this.state.isBookmarked
    });
  };

  handleAddComment = answerId => {
    var commentList = this.state.commentList;
    var commentData = {
      comment: this.state.addedComment,
      answerId: answerId,
      commentOwner: this.props.user._id
    };
    axios
      .post("/comment", commentData)
      .then(res => console.log())
      .catch(err => console.log(err));

    commentList.push(commentData);
    this.setState({
      showComments: true,
      commentList: commentList
    });
  };

  render() {
    const { question } = this.props;
    const { isUpvoted, upvoteCount } = this.state;

    var comp = "";
    var upvotecomp = "";
    var answer = {};

    if (question.answerList !== undefined && question.answerList.length) {
      answer = question.answerList[0];
      if (isUpvoted) {
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
                onClick={() => this.handleUpvote(question.answerList[0]._id)}
              >{`Upvoted`}</Link>
            </span>
          </span>
        );
      } else {
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
                onClick={() => this.handleUpvote(question.answerList[0]._id)}
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
              <Grid item>
                <Link to={"/" + question._id} style={{ color: "#000000" }}>
                  <span className="question-txt">
                    <Typography variant="title">{question.question}</Typography>
                  </span>
                </Link>
              </Grid>

              <React.Fragment>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Avatar
                      alt={
                        
                        answer.isAnonymous === false
                          ? answer.answerOwner.fname +
                            " " +
                            answer.answerOwner.lname
                          : "Anonymous User"
                      }
                      src={
                        answer.answerOwner !== undefined
                          ? answer.answerOwner.profileImg
                          : ""
                      }
                      className="avatar"
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="flex-start"
                      className="m-margin-up-down"
                    >
                      <Grid item className="black-clr">
                        {answer.answerOwner !== undefined ? (
                          <Link to={`/profile/${answer.answerOwner._id}`}>
                            {answer.answerOwner.fname +
                              " " +
                              answer.answerOwner.lname}
                          </Link>
                        ) : (
                          "Anonymous User"
                        )}
                      </Grid>
                      <Grid item className="fnt-13">
                        {"Answered"}{" "}
                        {moment(
                          new Date(answer.postedTime),
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
                        height: 30,
                        maxWidth: 750,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}
                      onClick={() => this.readMoreText()}
                    >
                      {answer.answer !== undefined ? Parser(answer.answer) : ""}
                    </Typography>
                  )}
                  {this.state.readMore && (
                    <Typography
                      variant="subtitle1"
                      onClick={() => this.readMoreTextClose()}
                    >
                      {answer.answer !== undefined ? Parser(answer.answer) : ""}
                    </Typography>
                  )}
                </Grid>
                <Grid item className="votes">
                  {answer.views} {`views · View Upvoters`}
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
                    <span className="m-padding-left-right-15">{`Share`}</span>
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
                    <span className="m-padding-left-right-15" >
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
                    <span className="m-padding-left-right-15">
                      {this.state.isBookmarked ? (
                        <Bookmark
                          onClick={() => {
                            this.handleBookmarkAnswer(answer._id);
                          }}
                        />
                      ) : (
                        <BookmarkBorder
                          onClick={() => {
                            this.handleBookmarkAnswer(answer._id);
                          }}
                        />
                      )}
                    </span>
                  </Grid>
                  <Grid item>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.showComments();
                      }}
                    >
                      All
                    </div>
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
                  <Grid item xs={1}>
                    <Avatar
                      alt={this.props.user.fname}
                      src={this.props.user.profileImg}
                      className="avatar"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <input
                      type="text"
                      class="form-control corner-rounded"
                      placeholder="Add a Comment"
                      onChange={e => {
                        this.setState({
                          addedComment: e.target.value
                        });
                      }}
                    />
                  </Grid>
                  <Grid item>
                    {typeof this.state.addedComment === "string" &&
                    this.state.addedComment.trim().length === 0 ? (
                      <Button
                        disabled
                        variant="contained"
                        className="btn-margin"
                      >
                        {" "}
                        Add Comment
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        className="btn-margin"
                        onClick={() => {
                          this.handleAddComment(answer._id);
                        }}
                      >
                        {" "}
                        Add Comment
                      </Button>
                    )}
                  </Grid>
                  {this.state.showComments
                    ? this.state.commentList.length
                      ? this.state.commentList
                          .sort(
                            (comment1, comment2) =>
                              new Date(comment2.postedTime) -
                              new Date(comment1.postedTime)
                          )
                          .slice(0, this.state.visible)
                          .map(comment => {
                            return (
                              <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="flex-start"
                                // className="m-margin-up-down"
                              >
                                <Grid item>
                                  <Avatar
                                    alt={this.props.user.fname}
                                    src={this.props.user.profileImg}
                                    className="avatar"
                                  />
                                </Grid>
                                <Grid item>
                                  <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    className="m-margin-up-down"
                                  >
                                    <Grid item className="black-clr">
                                      {" "}
                                      {this.props.user.fname +
                                        " " +
                                        this.props.user.lname}
                                    </Grid>
                                    <Grid item className="fnt-13">
                                      {comment.postedTime !== undefined
                                        ? moment(
                                            new Date(comment.postedTime),
                                            "MMMM Do YYYY, h:mm:ss a"
                                          ).fromNow()
                                        : "Just now"}
                                    </Grid>
                                    {comment.comment}
                                  </Grid>
                                </Grid>
                              </Grid>
                            );
                          })
                      : ""
                    : ""}
                  {this.state.showComments &&
                    this.state.commentList !== undefined &&
                    this.state.commentList.length &&
                    this.state.visible < this.state.commentList.length && (
                      <button
                        onClick={this.loadMore}
                        type="button"
                        className="load-more"
                      >
                        Load more
                      </button>
                    )}
                </Grid>
              </React.Fragment>
            </Grid>
          </Paper>
        </div>
      );
    } else {
      answer = "No Answer";
      comp = <AnswerCard question={question} user={this.props.user} />;
    }

    return <React.Fragment>{comp}</React.Fragment>;
  }
}

export default withStyles(styles)(QuestionCard);
