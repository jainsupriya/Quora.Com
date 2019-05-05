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
import PropTypes from "prop-types";
import navHeader from "../header/navHeader";
import Editor from "./Editor";
import Popover from "@material-ui/core/Popover";
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  dialogWidth: {
    borderRadius: 3,
    background: "#f7f7f7",
    border: "1px solid #ccc",
    boxShadow: "0 1px 3px rgba(200,200,200,0.7)",
    padding: 0,
    minWidth: 190,
    maxHeight: 300,
    fontSize: 14
  },
  dialogContent: {
    borderTop: "1px solid #e2e2e2",
    background: "#fff",
    overflowY: "scroll",
    maxHeight: "80vh",
    textAlign: "left"
  },
  dialogMenu: {
    borderTop: "1px solid #e2e2e2",
    padding: "8px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    color: "#2b6dad !important"
  },
  listStyle: {
    textDecoration: 'none',
    "&:hover": {
      background: "#eaf4ff"
    }
  },
});

class AnswerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: {},
      openQuill: false,
      editorHtml: "",
      totalAnswer: "",
      followAnswer: true,
      followerCount: 0,
      showMenu: false,
      anchorEl: null
    };
    this.GiveAnswer = this.GiveAnswer.bind(this);
  }
  GiveAnswer = () => {
    this.setState({ openQuill: !this.state.openQuill });
  };
  passAnswer = () => {
    this.setState({ openQuill: !this.state.openQuill });
  };
  followAnswer = () => {
    var followerCount = 0;
    if (!this.state.followAnswer) {
      followerCount = this.state.followerCount + 1;
      axios
        .put(
          `/user/followQuestion/${this.props.user._id}/${
            this.props.question._id
          }`
        )
        .then(res => console.log(res.data))
        .catch(err => console.log(err.data));
    } else {
      followerCount =
        this.state.followerCount > 0 ? this.state.followerCount - 1 : 0;
      axios
        .put(
          `/user/followQuestion/${this.props.user._id}/${
            this.props.question._id
          }`
        )
        .then(res => console.log(res.data))
        .catch(err => console.log(err.data));
    }

    this.setState({
      followAnswer: !this.state.followAnswer,
      followerCount: followerCount
    });
  };
  handleClose = () => {
    this.setState({ openQuill: false });
  };
  handleEditorChange = html => {
    this.setState({
      editorHtml: html
    });
  };

  componentDidMount() {
    var followerCount = 0;
    var followAnswer = false;

    if (
      this.props.question.followersUserList !== undefined &&
      this.props.question.followersUserList.length
    ) {
      followerCount = this.props.question.followersUserList.length;
      if (this.props.question.followersUserList.includes(this.props.user._id)) {
        followAnswer = true;
      }
    }
    this.setState({
      followAnswer: followAnswer,
      followerCount: followerCount
    });
  }

  componentWillReceiveProps(nextProps) {
    var followerCount = 0;
    var followAnswer = false;

    if (
      nextProps.question.followersUserList !== undefined &&
      nextProps.question.followersUserList.length
    ) {
      followerCount = nextProps.question.followersUserList.length;
      if (nextProps.question.followersUserList.includes(nextProps.user._id)) {
        followAnswer = true;
      }
    }
    this.setState({
      followAnswer: followAnswer,
      followerCount: followerCount
    });
  }

  handleMenu = event => {
    console.log("Hello")
    console.log(event.currentTarget.id)
    console.log(document.getElementById(event.currentTarget.id).offsetTop)

    this.setState({
      showMenu: true,
      anchorEl: event.currentTarget,
    });
  }

  handleMenuClose = () => {
    console.log("closed")
    this.setState({
      showMenu: false,
      anchorEl: null
    });
  }
  render() {
    const { classes } = this.props;
    const { question } = this.props;
    console.log(question._id);
    const { answer } = this.props;
    var answerComp;
    const position = {
      left: 1115,
      top: 386
    }
    var totalAnswerCount;
    if (question.answerList.length > 0) {
      totalAnswerCount = question.answerList.length;
      totalAnswerCount = totalAnswerCount + " Answers";
    } else totalAnswerCount = "No Answer yet";

    if (!isEmpty(answer)) {
      var username = "";
      if (answer.isAnonymous) {
        username = "Anonymous user";
      } else {
        username = "Parth Modi";
      }

      answerComp = (
        <React.Fragment>
          <Grid item className="ans-main-content">
            <ReadMoreReact
              text={totalAnswerCount}
              min={80}
              ideal={100}
              max={200}
              readMoreText="...(more)"
              showLessButton={true}
            />
          </Grid>
          <Grid
            container
            direction="row"
            justify="start"
            alignItems="flex-start"
            className="answer-actions"
          />
          <Divider className="m-divider" />
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            // className="m-margin-up-down"
          >
            <Grid item>
              <Avatar alt="Remy Sharp" src="1.jpg" className="avatar" />
            </Grid>
            <Grid item xs={9}>
              <input
                type="text"
                class="form-control corner-rounded"
                placeholder="Add a Comment"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" className="btn-margin">
                Add Comment
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>
      );
    } else {
      answerComp = (
        <React.Fragment>
          <Grid item className="ans-main-content">
            <Link to={"/" + question._id} style={{ color: "#000000" }}>
              <Typography variant="subtitle1" component="p">
                {totalAnswerCount}
              </Typography>
            </Link>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            // className="m-margin-up-down"
          >
            <Grid
              container
              margin="30px"
              direction="row"
              spacing={0}
              justify="flex-start"
              alignItems="flex-start"
              //className="answer-actions"
            >
              <Grid item xs={2}>
                <div
                  onClick={() => this.GiveAnswer()}
                  style={{ cursor: "pointer" }}
                >
                  <span class="ui_button_icon" aria-hidden="true">
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        id="answer"
                        transform="translate(2.500000, 3.500000)"
                        stroke="none"
                        stroke-width="1.5"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="pen"
                          transform="translate(9.000000, 9.000000) rotate(-315.000000) translate(-9.000000, -9.000000) translate(7.000000, -1.000000)"
                        >
                          <path
                            d="M2,8.8817842e-16 L2,8.8817842e-16 L2,8.8817842e-16 C3.1045695,6.85269983e-16 4,0.8954305 4,2 L4,16 L2.00256278,20 L0,16 L0,2 L0,2 C-1.35267774e-16,0.8954305 0.8954305,1.09108686e-15 2,8.8817842e-16 Z"
                            id="pen_body"
                            class="icon_svg-stroke"
                            stroke="#666"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <polygon
                            id="pen_tip"
                            class="icon_svg-fill_as_stroke"
                            fill="#666"
                            transform="translate(2.000000, 18.750000) scale(1, -1) translate(-2.000000, -18.750000) "
                            points="2 17.5 3.25 20 0.75 20"
                          />
                        </g>
                        <path
                          d="M12,16 L17,16 L17,11 M7,1 L2,1 L2,6"
                          id="bg"
                          class="icon_svg-stroke"
                          stroke="#666"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </svg>
                  </span>
                  <span>Answer</span>
                </div>
              </Grid>

              <Grid item xs={2}>
                <div
                  onClick={() => this.passAnswer()}
                  style={{ cursor: "pointer" }}
                >
                  <span class="ui_button_icon" aria-hidden="true">
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                    >
                      <g
                        id="cant_answer"
                        stroke="none"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="pen"
                          transform="translate(11.485281, 12.485281) rotate(-315.000000) translate(-11.485281, -12.485281) translate(9.485281, 2.485281)"
                        >
                          <path
                            d="M0,7.51471863 L2.22044605e-16,1.99994543 C8.67738547e-17,0.895375929 0.8954305,-5.45711382e-05 2,-5.45711382e-05 C3.1045695,-5.45711382e-05 4,0.895375929 4,1.99994543 L4,7.51471863 M4,12.5147186 L4,16 L2.00256278,20 L0,16 L0,12.5147186"
                            id="Rectangle-5"
                            class="icon_svg-stroke"
                            stroke="#666"
                            stroke-width="1.5"
                            stroke-linecap="square"
                            stroke-linejoin="round"
                          />
                          <polygon
                            id="pen_tip"
                            class="icon_svg-fill_as_stroke"
                            fill="#666"
                            transform="translate(2.000000, 18.750000) scale(1, -1) translate(-2.000000, -18.750000) "
                            points="2 17.5 3.25 20 0.75 20"
                          />
                        </g>
                        <path
                          d="M4.63603897,5.63603897 L18.5,19.5"
                          id="Line"
                          class="icon_svg-stroke"
                          stroke="#666"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                    </svg>
                  </span>
                  <span>Pass</span>
                </div>
              </Grid>

              <Grid item xs={2}>
                <div
                  onClick={() => this.followAnswer()}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.followAnswer ? (
                    <React.Fragment>
                      <span class="ui_button_icon" aria-hidden="true">
                        <svg
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            stroke="none"
                            fill="none"
                            fill-rule="evenodd"
                            stroke-linecap="round"
                          >
                            <g
                              id="follow"
                              class="icon_svg-stroke"
                              stroke="#666"
                              stroke-width="1.5"
                            >
                              <path
                                d="M14.5,19 C14.5,13.3369229 11.1630771,10 5.5,10 M19.5,19 C19.5,10.1907689 14.3092311,5 5.5,5"
                                id="lines"
                              />
                              <circle
                                id="circle"
                                cx="7.5"
                                cy="17"
                                r="2"
                                class="icon_svg-fill"
                                fill="none"
                              />
                            </g>
                          </g>
                        </svg>
                      </span>
                      <span style={{ color: "#329bff" }}>
                        <span>Follow</span>
                        <span class="bullet"> · </span>
                        <span
                          class="ui_button_count_inner"
                          id="__w2_wikv5yOF93_count"
                        >
                          {this.state.followerCount}
                        </span>
                      </span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <span class="ui_button_icon" aria-hidden="true">
                        <svg
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            stroke="none"
                            fill="none"
                            fill-rule="evenodd"
                            stroke-linecap="round"
                          >
                            <g
                              id="follow"
                              class="icon_svg-stroke"
                              stroke="#666"
                              stroke-width="1.5"
                            >
                              <path
                                d="M14.5,19 C14.5,13.3369229 11.1630771,10 5.5,10 M19.5,19 C19.5,10.1907689 14.3092311,5 5.5,5"
                                id="lines"
                              />
                              <circle
                                id="circle"
                                cx="7.5"
                                cy="17"
                                r="2"
                                class="icon_svg-fill"
                                fill="none"
                              />
                            </g>
                          </g>
                        </svg>
                      </span>
                      <span>Follow</span>
                      <span class="bullet"> · </span>
                      <span
                        class="ui_button_count_inner"
                        id="__w2_wikv5yOF93_count"
                      >
                        {this.state.followerCount}
                      </span>{" "}
                    </React.Fragment>
                  )}
                </div>
              </Grid>

              <Grid item xs={5} />

              <Grid item xs={1}>
                <span
                  id="menuid"
                  class="ui_button_icon"
                  aria-hidden="true"
                  onClick={this.handleMenu}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xlink="http://www.w3.org/1999/xlink"
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
          </Grid>
          <Popover
          id="simple-popper-1"
          open={Boolean(this.state.showMenu)}
          anchorEl={this.state.anchorEl}
          onClose={this.handleMenuClose}
          anchorReference={position}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          anchorPosition={{
            left: 1115,
            top: 1212
          }}
          // onFocus={this.abc}
        >
          {/* style={{ opacity: this.state.searchValue && this.state.searchValue !== '' ? 0 : 1 }} */}
          <div className={classes.dialogWidth}>
            <div
              className={classes.dialogContent}
              style={{ overflow: "hidden" }}
            >
              <ul
                style={{
                  listStyle: "none",
                  marginBottom: "0rem",
                  paddingLeft: 0
                }}
              >
                <li className={classes.listStyle}>
                  <a
                    className={classes.dialogMenu}
                    style={{ borderTop: "none" }}
                    href="/"
                  >
                    Answer Anonymously
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Popover>
        {console.log(this)}
        {/* {document.getElementById("search").focus()} */}
        </React.Fragment>
      );
    }
    return (
      <div>
        <Paper className="m-padding-10" elevation={2}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            // className="m-margin-up-down"
          >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={11}>
                <span className="reason-txt">
                  Question added · Healthy Eating
                </span>
              </Grid>

              <Grid item xs={1}>
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                >
                  <g
                    id="small_close"
                    class="icon_svg-stroke"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                    stroke="#666666"
                    stroke-width="1.5"
                  >
                    <path
                      d="M12,6 L12,18"
                      transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000) "
                    />
                    <path
                      d="M18,12 L6,12"
                      transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000) "
                    />
                  </g>
                </svg>
              </Grid>
            </Grid>

            <Grid item>
              <span className="question-txt">
                <Link to={"/" + question._id} style={{ color: "#000000" }}>
                  {question.question}
                </Link>
              </span>
            </Grid>
            {answerComp}
          </Grid>

          {this.state.openQuill && (
            <Editor qid={question._id} toggle={this.handleClose} />
          )}
        </Paper>
      </div>
    );
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
)(withStyles(styles)(AnswerCard));
