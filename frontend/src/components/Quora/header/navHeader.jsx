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
import AppBar from "@material-ui/core/AppBar";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover";
import AddQuestion from "../homeComponents/AddQuestion";
import "../../../styles/home.css";
import { addQuestion } from "../../../redux/actions/homeAction";
import { logoutUser } from "../../../redux/actions/authActions";
import { getFollowingUsers } from "../../../redux/actions/messageAction";
import axios from "axios";
import MessageDialog from "../Message/MessageDialog";
import { getUserDetails } from "../../../redux/actions/homeAction";
import Dialog from "@material-ui/core/Dialog";

const styles = theme => ({
  notificationDialog: {
    borderRadius: 3,
    background: "#f7f7f7",
    border: "1px solid #ccc",
    boxShadow: "0 1px 3px rgba(200,200,200,0.7)",
    padding: 0,
    minWidth: 518,
    maxHeight: 300,
    fontSize: 14,
    // overflowY: 'scroll'
    "&:before": {
      content: "",
      position: "absolute",
      top: -20,
      right: 5,
      borderColor: "rgba(204,204,204,0)",
      borderLeft: "7.5px solid transparent",
      borderRight: "7.5px solid transparen",
      borderBottom: "7px solid #ccc",
      borderTop: "7.5px solid transparen",
      zIndex: 10
    }
  },
  notificationContent: {
    borderTop: "1px solid #e2e2e2",
    background: "#fff",
    overflowY: "scroll",
    maxHeight: "80vh",
    textAlign: "left"
  },
  emptyContent: {
    paddingTop: 32,
    paddingBottom: 32,
    textAlign: "center"
  },
  icon: {
    backgroundImage:
      "url(//qsf2.c7.quoracdn.net/-3-images.write_empty_state.svg-26-9b81e25167b45e72.svg)",
    width: 50,
    height: 50,
    backgroundSize: "50px 50px",
    backgroundRepeat: "no-repeat",
    paddingLeft: 9
  },
  typography: {
    margin: theme.spacing.unit * 2
  },
  profileMenu: {
    borderTop: "1px solid #e2e2e2",
    padding: "8px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    color: "#2b6dad !important"
  },
  profileDialogWidth: {
    borderRadius: 3,
    background: "#f7f7f7",
    border: "1px solid #ccc",
    boxShadow: "0 1px 3px rgba(200,200,200,0.7)",
    padding: 0,
    minWidth: 190,
    maxHeight: 300,
    fontSize: 14
  },
  listStyle: {
    "&:hover": {
      background: "#eaf4ff"
    }
  },
  showCursor: {
    cursor: "pointer"
  }
});

//Create a Main Component
class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddQuestion: false,
      navSelectedItem: "home",
      openNotification: false,
      topic: "",
      question: "",
      openProfileMenu: false,
      openSearchDialog: false,
      searchValue: "",
      showMsgs: false,
      dialogContent: "",
      check: "",
      left : window.innerWidth*0.65
    };
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.searchForTopicOrPeople = this.searchForTopicOrPeople.bind(this);
  }

  componentDidMount = () => {
    const userID = this.props.auth.user._id;
    console.log(userID);
    this.props.getFollowingUsers(userID);
    this.props.getUserDetails(userID);
  };

  searchForTopicOrPeople(event) {
    const { name, value } = event.target;
    event.target.focus();

    // document.getElementById("search").focus()

    this.setState({
      searchValue: value
    });
    // document.getElementById("search").focus()

    if (value !== "") {
      this.setState({
        openSearchDialog: event.currentTarget
      });
      axios.get(`/topics/search/` + value).then(response => {
        if (response.status === 200) {
          this.setState({
            products: response.data
          });
        }
      });
    } else {
      this.setState({
        openSearchDialog: null
      });
      // document.getElementById("search").focus()
    }
    // document.getElementById("search").focus()

    document.getElementById("search").focus();
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

  handleNotification = event => {
    this.setState({
      openNotification: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({ openAddQuestion: false });
  };

  
  handleDeactivate = () => {
    axios.delete(`/user/`+ this.props.auth.user.sqlUserId).then(response => {
      if (response.status === 200) {
        this.props.history.push("/login")
      }
    });
  };

  navigationClick = selectedItem => {
    this.setState({
      navSelectedItem: selectedItem
    });
    if (selectedItem === "home") this.props.history.push(`/`);
    else this.props.history.push(`/${selectedItem}`);
  };

  handleNotificationClose = () => {
    this.setState({
      openNotification: null
    });
  };

  handleAvatarClick = event => {
    console.log(event.currentTarget);
    this.setState({
      openProfileMenu: event.currentTarget
    });
  };

  handleProfileMenuClose = () => {
    this.setState({
      openProfileMenu: null
    });
  };

  handleSearchDialogClose = () => {
    this.setState({
      openSearchDialog: false
    });
  };

  showPopover = event => {
    this.setState({
      openSearchDialog: event.currentTarget
    });
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  abc = () => {
    document.getElementById("simple-popper-1").blur();
    document.getElementById("search").focus();
  };

  handleMessageDialog = () => {
    console.log("Hello");
    this.setState({
      showMsgs: true
      // dialogContent : <MessageDialog open={true} />
    });
  };

  handleCloseMessages = () => {
    this.setState({
      showMsgs: false
    });
  };
  render() {
    const { openNotification, openProfileMenu, openSearchDialog } = this.state;
    const open1 = Boolean(openNotification);
    const open2 = Boolean(openProfileMenu);
    const open3 = Boolean(openSearchDialog);

    const { classes, auth } = this.props;

    const notificationList = {
      user: "Mayank Padshala",
      question:
        "To anti diversity people - what is the best evidence for your beliefs and what evidence would change your view?",
      time: "6h"
    };

    const addQuestion = (
      <AddQuestion
        openAddQuestion={this.state.openAddQuestion}
        handleClose={() => this.handleClose()}
        handleAddQuestion={this.handleAddQuestion}
      />
    );

    const notifications = (
      <div>
        <Popover
          id="simple-popper"
          open={open1}
          anchorEl={openNotification}
          onClose={this.handleNotificationClose}
          anchorReference="anchorPosition"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          anchorPosition={{
            left: 700,
            top: 68
          }}
        >
          <div className={classes.notificationDialog}>
            <div style={{ padding: 10 }}>See All Notifications ></div>
            <div className={classes.notificationContent}>
              <div
                className={classes.emptyContent}
                style={{ display: notificationList == "" ? "block" : "none" }}
              >
                No New Notifications
              </div>

              <div
                style={{ display: notificationList != "" ? "block" : "none" }}
              >
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  style={{ borderBottom: "1px solid #e2e2e2" }}
                  // className="m-margin-up-down"
                >
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    // className="m-margin-up-down"
                  >
                    <Grid item>
                      <Avatar
                        alt={
                          this.props.auth.user.fname +
                          this.props.auth.user.lname
                        }
                        src={this.props.auth.user.profileImg}
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
                        style={{ maxWidth: 420 }}
                      >
                        <Grid item className="black-clr, font-14">
                          <span style={{ fontWeight: "bold" }}>
                            {notificationList.user + " "}
                          </span>
                          answered:
                          <span className="questionNav">
                            {" " + notificationList.question}
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  style={{ borderBottom: "1px solid #e2e2e2" }}
                  // className="m-margin-up-down"
                >
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    // className="m-margin-up-down"
                  >
                    <Grid item>
                      <Avatar
                        alt={
                          this.props.auth.user.fname +
                          this.props.auth.user.lname
                        }
                        src={this.props.auth.user.profileImg}
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
                        style={{ maxWidth: 420 }}
                      >
                        <Grid item className="black-clr, font-14">
                          <span style={{ fontWeight: "bold" }}>
                            {notificationList.user + " "}
                          </span>
                          answered:
                          <span className="questionNav">
                            {" " + notificationList.question}
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    );

    const profilePopover = (
      <div>
        <Popover
          id="simple-popper"
          open={open2}
          anchorEl={this.state.openProfileMenu}
          onClose={this.handleProfileMenuClose}
          anchorReference="anchorPosition"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          anchorPosition={{
            left: this.state.left,
            top: 68
          }}
        >
          <div className={classes.profileDialogWidth}>
            <div
              className={classes.notificationContent}
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
                    className={classes.profileMenu}
                    style={{ borderTop: "none" }}
                    href="/myprofile"
                  >
                    Profile
                  </a>
                </li>
                <li className={classes.listStyle}>
                  <div
                    className={classes.profileMenu}
                    onClick={this.handleMessageDialog}
                    style={{ cursor: "pointer" }}
                  >
                    Messages
                  </div>
                </li>
                <li className={classes.listStyle}>
                  <a className={classes.profileMenu} href="/content">
                    Your Content
                  </a>
                </li>
                <li className={classes.listStyle}>
                  <a className={classes.profileMenu} href="/search">
                    Search
                  </a>
                </li>    
                <li className={classes.listStyle}  onClick={this.handleDeactivate}>
                  <a className={classes.profileMenu}>
                    Deactivate User
                  </a>
                </li>    
                <li className={classes.listStyle}>
                  <a className={classes.profileMenu} href="/dashboard">
                    Dashboard
                  </a>
                </li>
                <li className={classes.listStyle}>
                  <a
                    className={classes.profileMenu}
                    onClick={() => {
                      this.handleLogout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Popover>
      </div>
    );

    const searchDialog = (
      <div>
        <Popover
          id="simple-popper-1"
          open={open3}
          // anchorEl={openSearchDialog}
          onClose={this.handleSearchDialogClose}
          anchorReference="anchorPosition"
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
            top: 68
          }}
          onFocus={this.abc}
        >
          {/* style={{ opacity: this.state.searchValue && this.state.searchValue !== '' ? 0 : 1 }} */}
          <div className={classes.profileDialogWidth}>
            <div
              className={classes.notificationContent}
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
                    className={classes.profileMenu}
                    style={{ borderTop: "none" }}
                    href="/myprofile"
                  >
                    Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Popover>
        {/* {document.getElementById("search").focus()} */}
      </div>
    );

    return (
      <div>
        {addQuestion}
        {notifications}
        {profilePopover}
        {console.log(this.state.dialogContent)}

        <MessageDialog
          open={this.state.showMsgs}
          handleCloseMessages={this.handleCloseMessages}
        />

        {/* <dialog style={{this.state.check ==}}>
          {this.state.check}
          </dialog> */}
        {/* <div>
            <Dialog
          onClose={this.handleCloseMessages}
          aria-labelledby="customized-dialog-title"
          open={this.state.showMsgs}
        >
        Hello

        </Dialog>
        </div> */}
        {/* {searchDialog} */}
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
              alignItems="center"
            >
              <div
                className="logo-img"
                onClick={() => {
                  this.navigationClick("home");
                }}
              />
              <div
                className={
                  this.state.navSelectedItem === "home"
                    ? "menu-clr-1"
                    : "menu-clr-2"
                }
                onClick={() => {
                  this.navigationClick("home");
                }}
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    stroke="none"
                    className="icon_svg-fill_as_stroke"
                    fill={
                      this.state.navSelectedItem === "home" ? "#b92b27" : "#666"
                    }
                    fillRule="nonzero"
                  >
                    <path d="M2.4913634,2.04921404 C2.98092279,1.55513216 3.64670648,1.27576655 4.34511285,1.27256944 L21.6432503,1.27256944 C21.9884286,1.27256944 22.2682507,1.55239192 22.2682503,1.89757017 L22.2682226,20.0928469 C22.2714301,20.7904709 21.9965456,21.4606224 21.5043785,21.9550524 C21.0122114,22.4494823 20.3433278,22.7274379 19.6457031,22.7274306 L2.35674959,22.7274306 C2.01157134,22.7274306 1.73174919,22.4476081 1.73174959,22.1024298 L1.73177083,3.90562151 C1.72897519,3.21063504 2.00216491,2.54293169 2.4913634,2.04921404 Z M5.45178819,5.75945313 C5.13477579,5.75945313 4.87778646,6.01644246 4.87778646,6.33345486 C4.87778646,6.65046727 5.13477579,6.9074566 5.45178819,6.9074566 L11.5407986,6.9074566 C11.857811,6.9074566 12.1148003,6.65046727 12.1148003,6.33345486 C12.1148003,6.01644246 11.857811,5.75945313 11.5407986,5.75945313 L5.45178819,5.75945313 Z M5.45178819,9.60756076 C5.13477579,9.60756076 4.87778646,9.86455009 4.87778646,10.1815625 C4.87778646,10.4985749 5.13477579,10.7555642 5.45178819,10.7555642 L11.5407986,10.7555642 C11.857811,10.7555642 12.1148003,10.4985749 12.1148003,10.1815625 C12.1148003,9.86455009 11.857811,9.60756076 11.5407986,9.60756076 L5.45178819,9.60756076 Z M18.7686285,18.4425955 C19.0856409,18.4425955 19.3426302,18.1856062 19.3426302,17.8685938 C19.3426302,17.5515813 19.0856409,17.294592 18.7686285,17.294592 L5.45178819,17.294592 C5.13477579,17.294592 4.87778646,17.5515813 4.87778646,17.8685938 C4.87778646,18.1856062 5.13477579,18.4425955 5.45178819,18.4425955 L18.7686285,18.4425955 Z M18.7686285,14.5990799 C19.0856409,14.5990799 19.3426302,14.3420905 19.3426302,14.0250781 C19.3426302,13.7080657 19.0856409,13.4510764 18.7686285,13.4510764 L5.45178819,13.4510764 C5.13477579,13.4510764 4.87778646,13.7080657 4.87778646,14.0250781 C4.87778646,14.3420905 5.13477579,14.5990799 5.45178819,14.5990799 L18.7686285,14.5990799 Z M19.3472222,10.3927951 L19.3472222,5.90180556 C19.3472668,5.74715364 19.2849044,5.59902688 19.17426,5.49097576 C19.0636157,5.38292463 18.9140518,5.32409217 18.7594444,5.32780382 L14.2684549,5.32780382 C13.9514425,5.32780382 13.6944531,5.58479315 13.6944531,5.90180556 L13.6944531,10.3927951 C13.6944531,10.7098075 13.9514425,10.9667969 14.2684549,10.9667969 L18.7732205,10.9667969 C19.0902329,10.9667969 19.3472222,10.7098075 19.3472222,10.3927951 Z" />
                  </g>
                </svg>
                {" Home"}
              </div>
              <div
                className={
                  this.state.navSelectedItem === "answer"
                    ? "menu-clr-1"
                    : "menu-clr-2"
                }
                onClick={() => {
                  this.navigationClick("answer");
                }}
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    stroke="none"
                    className="icon_svg-fill_as_stroke"
                    fill={
                      this.state.navSelectedItem === "answer"
                        ? "#b92b27"
                        : "#666"
                    }
                    fillRule="nonzero"
                  >
                    <path d="M3.04166667,3.04166667 L3.04166667,13.4375 C3.04166667,13.782678 2.76184464,14.0625 2.41666667,14.0625 C2.0714887,14.0625 1.79166667,13.782678 1.79166667,13.4375 L1.79166667,2.41666667 C1.79166667,2.0714887 2.0714887,1.79166667 2.41666667,1.79166667 L12.4791667,1.79166667 C12.8243446,1.79166667 13.1041667,2.0714887 13.1041667,2.41666667 C13.1041667,2.76184464 12.8243446,3.04166667 12.4791667,3.04166667 L3.04166667,3.04166667 Z M20.9583333,20.9583333 L20.9583333,10.5625 C20.9583333,10.217322 21.2381554,9.9375 21.5833333,9.9375 C21.9285113,9.9375 22.2083333,10.217322 22.2083333,10.5625 L22.2083333,21.5833333 C22.2083333,21.9285113 21.9285113,22.2083333 21.5833333,22.2083333 L11.5208333,22.2083333 C11.1756554,22.2083333 10.8958333,21.9285113 10.8958333,21.5833333 C10.8958333,21.2381554 11.1756554,20.9583333 11.5208333,20.9583333 L20.9583333,20.9583333 Z M2.54490164,18.3005132 L3.02406831,17.0930132 C3.05554897,17.0136819 3.10294438,16.941639 3.16333284,16.8813255 L18.6018083,1.46201661 C19.3049382,0.758886609 20.3297725,0.484283075 21.2902659,0.741646501 C22.2507593,0.999009928 23.0009901,1.74924069 23.2583535,2.7097341 C23.5157169,3.67022752 23.2411134,4.69506179 22.5379147,5.39826041 L7.11833139,20.8130521 C7.05828986,20.873075 6.98664904,20.920236 6.90777963,20.9516581 L5.70507129,21.4308248 C5.47439701,21.5227269 5.21119721,21.4693591 5.03453903,21.2948641 L2.68662236,18.9756974 C2.50819483,18.7994547 2.45239722,18.5336244 2.54490164,18.3005132 Z M1.91826131,19.8157808 L4.17101594,22.0915227 L1.80547779,23.0742389 C1.46227353,23.2168163 1.06846966,23.0541761 0.92589222,22.7109719 C0.857106472,22.5453947 0.857243692,22.3592131 0.926273433,22.1937376 L1.91826131,19.8157808 Z" />
                  </g>
                </svg>
                {" Answer"}
              </div>
              <div
                className={
                  this.state.navSelectedItem === "spaces"
                    ? "menu-clr-1"
                    : "menu-clr-2"
                }
               
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    stroke="none"
                    className="icon_svg-fill_as_stroke"
                    fill={
                      this.state.navSelectedItem === "spaces"
                        ? "#b92b27"
                        : "#666"
                    }
                    fillRule="nonzero"
                  >
                    <path d="M8.34138274,2.68449938 C8.4139274,2.92924151 8.41266315,3.18967341 8.34389684,3.41103916 C8.20752364,3.92243866 7.80459805,4.375 7.24,4.375 C6.86280158,4.375 6.55107974,4.16718544 6.18694715,3.80305285 C6.06820568,3.68431138 5.9465184,3.54910329 5.8223617,3.40011525 C5.76307392,3.32896992 5.70437379,3.25609389 5.64658001,3.18219914 C5.14716084,3.60642159 4.59810475,3.98561558 3.98281494,4.32590442 C3.35564226,4.59033527 2.69437313,4.7613396 2.02010189,4.8345319 C2.16388002,5.48018959 2.54065684,6.06743833 3.10472055,6.46785997 C4.04159534,7.13293547 5.29461019,7.14025388 6.23918974,6.48616728 C6.52297172,6.2896587 6.91232414,6.36040777 7.10883272,6.64418974 C7.3053413,6.92797172 7.23459223,7.31732414 6.95081026,7.51383272 C5.57373091,8.46740951 3.74699132,8.45674018 2.38114454,7.48714294 C1.01529777,6.5175457 0.402693118,4.7965556 0.848688319,3.18201402 C1.29468352,1.56747245 2.70381663,0.404959964 4.37369389,0.273940292 C6.04357115,0.14292062 7.6167678,1.07143754 8.3091113,2.59666431 C8.32221974,2.6255421 8.33294932,2.65489386 8.34138274,2.68449938 Z M20.4878034,8.03429234 C19.333131,8.40186164 18.0471552,8.22912331 17.0141897,7.51383272 C16.7304078,7.31732414 16.6596587,6.92797172 16.8561673,6.64418974 C17.0526759,6.36040777 17.4420283,6.2896587 17.7258103,6.48616728 C18.5410833,7.05071386 19.5861262,7.12254458 20.4593531,6.70400496 C21.1656032,6.24080478 21.3903212,5.30034864 20.9424018,4.53232821 C20.8901611,4.42915286 20.7367041,4.25664608 20.5050083,4.05336599 C20.339354,3.90802791 20.1406243,3.75213451 19.9163524,3.58988863 C19.6483257,3.39598913 19.3590267,3.20373946 19.0694869,3.02269845 C19.0508552,3.01104861 19.0326798,2.99972734 19.0149858,2.98874561 L17.0690367,4.27178899 C16.7638397,4.47301781 16.351842,4.37049687 16.1765445,4.04970246 L15.7376304,3.24648963 C15.6457486,3.1319184 15.5965395,2.98752304 15.6000196,2.839973 C15.5992989,2.74963046 15.6181522,2.65900957 15.6568098,2.57464475 C16.4378802,0.87006388 18.3027447,-0.0581820309 20.1336094,0.34629471 C21.3628559,0.617861274 22.3529111,1.44073725 22.8678985,2.51869753 C22.9690346,2.72942626 23.0525239,2.95109686 23.1163117,3.18201402 C23.2323273,3.60200058 23.2767113,4.02919012 23.2548388,4.44848303 L23.2530095,6.70015924 C23.2610896,6.8011601 23.2818445,6.96203704 23.3164382,7.12014661 C23.7519929,7.17543207 24.1000654,7.71578626 23.7258331,8.15522564 C23.6603223,8.23215129 23.5557983,8.33662214 23.4145393,8.44924232 C23.1757306,8.639635 22.9075672,8.78994369 22.6076614,8.8737925 C21.8466078,9.08657082 21.1026892,8.81577789 20.4878034,8.03429234 Z M8.18196091,5.66997353 C8.217776,4.75509384 8.74125748,3.8787954 9.51022096,3.24501525 C10.2085822,2.63798084 11.1206069,2.27037218 12.1184843,2.27000028 C12.1189895,2.27000011 12.1194947,2.27 12.12,2.27 C12.1205053,2.27 12.1210105,2.27000011 12.1215157,2.27000032 C13.1193931,2.27037218 14.0314178,2.63798084 14.729779,3.24501525 C15.4987425,3.8787954 16.022224,4.75509384 16.0580391,5.66997353 C16.0856852,5.85931673 16.1,6.05298667 16.1,6.25 C16.1,8.4480933 14.3180933,10.23 12.12,10.23 C9.9219067,10.23 8.14,8.4480933 8.14,6.25 C8.14,6.05298667 8.15431476,5.85931673 8.18196091,5.66997353 Z M9.39378481,6.395 C9.46915964,7.83532781 10.6609036,8.98 12.12,8.98 C13.5790964,8.98 14.7708404,7.83532781 14.8462152,6.395 L9.39378481,6.395 Z M21.915,22.375 L21.9150005,13.220809 C21.9132608,11.8767813 21.0091428,10.7014332 19.7105273,10.3550067 C18.4119117,10.0085802 17.0425015,10.5774282 16.3715513,11.7420051 C16.1992356,12.0410956 15.8170854,12.143867 15.5179949,11.9715513 C15.2189044,11.7992356 15.116133,11.4170854 15.2884487,11.1179949 C16.2417854,9.46327616 18.1875467,8.65501405 20.0327176,9.14724294 C21.8778885,9.63947184 23.1625275,11.309495 23.165,13.22 L23.165,23 C23.165,23.345178 22.885178,23.625 22.54,23.625 L17.27,23.625 C16.924822,23.625 16.645,23.345178 16.645,23 C16.645,22.654822 16.924822,22.375 17.27,22.375 L21.915,22.375 Z M14.905,22.375 L14.905,15.135 C14.905,13.4947143 13.5752857,12.165 11.935,12.165 C10.2947143,12.165 8.965,13.4947143 8.965,15.135 L8.965,22.375 L14.905,22.375 Z M7.715,23 L7.715,15.135 C7.715,12.8043584 9.60435836,10.915 11.935,10.915 C14.2656416,10.915 16.155,12.8043584 16.155,15.135 L16.155,23 C16.155,23.345178 15.875178,23.625 15.53,23.625 L8.34,23.625 C7.99482203,23.625 7.715,23.345178 7.715,23 Z M1.955,22.375 L6.6,22.375 C6.94517797,22.375 7.225,22.654822 7.225,23 C7.225,23.345178 6.94517797,23.625 6.6,23.625 L1.33,23.625 C0.984822031,23.625 0.705,23.345178 0.705,23 L0.705000524,13.219191 C0.707472514,11.309495 1.99211151,9.63947184 3.83728239,9.14724294 C5.68245328,8.65501405 7.62821457,9.46327616 8.58155129,11.1179949 C8.75386696,11.4170854 8.65109565,11.7992356 8.35200513,11.9715513 C8.05291461,12.143867 7.67076439,12.0410956 7.49844871,11.7420051 C6.82749846,10.5774282 5.45808827,10.0085802 4.15947274,10.3550067 C2.86085721,10.7014332 1.95673924,11.8767813 1.955,13.22 L1.955,22.375 Z" />
                  </g>
                </svg>
                {" Spaces"}
              </div>
              {/* <div className={this.state.navSelectedItem === "notifications" ? "menu-clr-1" : "menu-clr-2"}  onClick={()=>{this.navigationClick("notifications")}}> */}
              <div
                className={
                  this.state.navSelectedItem === "notifications"
                    ? "menu-clr-1"
                    : "menu-clr-2"
                }
                onClick={this.handleNotification}
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    stroke="none"
                    className="icon_svg-fill_as_stroke"
                    fill={
                      this.state.navSelectedItem === "notifications"
                        ? "#b92b27"
                        : "#666"
                    }
                    fillRule="nonzero"
                  >
                    <path d="M7.52623147,20.785 L2.79,20.785 C2.44482203,20.785 2.165,20.505178 2.165,20.16 L2.165,17.29 C2.165,17.0074029 2.35462776,16.759965 2.62750674,16.6864928 C3.53489668,16.4421796 4.29934428,15.8306216 4.7207945,15.0318719 C4.9275141,14.5760287 5.06975441,13.9060632 5.14652602,13.0874967 C5.22522536,12.2483761 5.22985909,11.3460973 5.1901543,10.5099262 C5.18132015,10.3238819 5.17258627,10.1897885 5.16500014,10.0695864 C5.16692674,7.15836438 6.9889796,4.66737849 9.56682756,3.68343601 C9.26674573,2.76136733 9.51351889,1.71491397 10.2655534,1.02510085 C11.2368263,0.134188561 12.7281737,0.134188561 13.6994466,1.02510085 C14.4567778,1.71977241 14.7017053,2.77612562 14.3917505,3.70290007 C16.9386536,4.70128291 18.7376316,7.18746315 18.7381538,10.1180033 C18.7329004,10.1862007 18.7247029,10.3170436 18.7164115,10.4987995 C18.678225,11.3358848 18.6837149,12.2411691 18.7623359,13.0834986 C18.8380419,13.8945969 18.9766156,14.5599136 19.17701,15.0156444 C19.6139373,15.8286861 20.3650186,16.4276075 21.2556099,16.6723406 C21.5269485,16.746904 21.715,16.9936028 21.715,17.275 L21.715,20.16 C21.715,20.505178 21.435178,20.785 21.09,20.785 L16.4737685,20.785 C15.6735053,22.5149427 13.9340364,23.6434187 12,23.6434187 C10.0659636,23.6434187 8.3264947,22.5149427 7.52623147,20.785 Z M8.95818095,20.785 C9.63220587,21.774741 10.7627679,22.3934187 12,22.3934187 C13.2372321,22.3934187 14.3677941,21.774741 15.041819,20.785 L8.95818095,20.785 Z M7.80361295,19.535 C7.89567224,19.5142961 7.98863461,19.5152554 8.07648752,19.535 L15.9235125,19.535 C16.0113654,19.5152554 16.1043278,19.5142961 16.1963871,19.535 L20.465,19.535 L20.465,17.7251708 C19.4384878,17.3236618 18.5834869,16.56595 18.0626714,15.5825032 L18.0448315,15.545994 C17.7730214,14.9405986 17.6061243,14.1465374 17.5177455,13.1996657 C17.4329279,12.2909471 17.4271114,11.3317998 17.4677101,10.4418358 C17.4766231,10.2464541 17.48563,10.1026919 17.4900001,10.0704219 C17.4882373,7.45898538 15.6944864,5.26158524 13.2709816,4.65215684 C12.8499185,4.55074042 12.4198492,4.49464202 12,4.485 L11.9107287,4.485 C11.4750185,4.50033889 11.0422154,4.56253715 10.6198006,4.67052602 C10.5799586,4.6807115 10.5397482,4.6868304 10.4996905,4.68906255 C8.1413814,5.34564207 6.41637567,7.50171255 6.41300955,10.0201592 C6.41963917,10.1030295 6.42924345,10.2504862 6.43874746,10.450638 C6.48100503,11.3405697 6.47608988,12.2976474 6.39106442,13.2042193 C6.30247091,14.1488351 6.13407121,14.9420139 5.84311826,15.5810072 C5.31946645,16.5763138 4.45411449,17.3415933 3.415,17.7424956 L3.415,19.535 L7.80361295,19.535 Z M10.7730327,3.3462836 C11.1317244,3.28076521 11.5003399,3.24303757 11.8765942,3.23543396 C11.8774166,3.23540611 11.8782389,3.23537841 11.8790613,3.23535084 L11.9,3.235 L12.0100562,3.23508091 C12.4123669,3.24155487 12.8061097,3.28266789 13.1884584,3.35561277 C13.3719335,2.87349632 13.2526354,2.31147152 12.8544926,1.94627004 C12.3612083,1.49379883 11.6037917,1.49379883 11.1105074,1.94627004 C10.71493,2.30911841 10.5946154,2.86626188 10.7730327,3.3462836 Z" />
                  </g>
                </svg>
                {" Notifications"}
              </div>
              <input
                id="search"
                className="header-search"
                placeholder="Search Quora"
                autoFocus={true}
                type="text"
                disabled
                value={this.searchValue}
                onChange={this.searchForTopicOrPeople}
              />
              <div id="smpl">
                <div>
                  <Popover
                    id="simple-popper-1"
                    open={open3}
                    anchorEl={document.getElementById("search")}
                    onClose={this.handleSearchDialogClose}
                    anchorReference="anchorPosition"
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
                      top: 68
                    }}
                    // onFocus={this.abc}
                  >
                    {/* style={{ opacity: this.state.searchValue && this.state.searchValue !== '' ? 0 : 1 }} */}
                    <div className={classes.profileDialogWidth}>
                      <div
                        className={classes.notificationContent}
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
                              className={classes.profileMenu}
                              style={{ borderTop: "none" }}
                              href="/myprofile"
                            >
                              Profile
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Popover>
                  {console.log(this)}
                  {/* {document.getElementById("search").focus()} */}
                </div>
              </div>
              {/* onFocus={this.showPopover} */}
              <div
                className={classes.showCursor}
              >
                <Avatar
                  id="avatar"
                  alt={
                    this.props.auth.user.fname + this.props.auth.user.lname
                  }
                  src={this.props.auth.user.profileImg}
                  className="avatar"
                  onClick={this.handleAvatarClick}
                />
              </div>
              <button
                className="askQuestionBtn"
                onClick={() => {
                  this.setState({ openAddQuestion: true });
                }}
              >
                Add Question or Link
              </button>
            </Grid>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </div>
    );
  }
}

NavHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  followingList: state.message.followingList,
  userDetails: state.homeState.userDetails
});

export default connect(
  mapStateToProps,
  { addQuestion, logoutUser, getFollowingUsers, getUserDetails }
)(withStyles(styles)(withRouter(NavHeader)));
