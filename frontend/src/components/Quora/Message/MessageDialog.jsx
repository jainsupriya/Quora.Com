import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "../../../styles/message.css";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";

import {
  getChatHistory,
  getReceiverData,
  sendMessage,
  getFollowingUsers
} from "../../../redux/actions/messageAction";

const styles = theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 700,
    float: "auto"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  messageModal: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    borderTopTopRadius: 4,
    borderTopBottomRadius: 4
  },
  modalHeader: {
    position: "relative",
    borderBottom: "1px solid #e2e2e2",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    padding: 16
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333",
    borderRadius: "4px 4px 0 0"
  },
  modalClose: {
    position: "absolute",
    right: 15,
    top: 15
  },
  msgButton: {
    background: "#3e78ad",
    color: "#fff",
    fontWeight: 500,
    padding: "6px 8px",
    "&:hover": {
      background: "#3e78ad",
      color: "#fff"
    }
  },
  input: {
    marginLeft: 8,
    flex: 1
  }
});

class MessageDialog extends React.Component {
  state = {
    open: false,
    followingUsers: [],
    openChat: false,
    receiverID: '',
    receiverImage: '',
    receiverName: ''
  };

  componentWillReceiveProps(props) {
    console.log("Hello12");

    // const userID = this.props.userDetails._id;
    // console.log(props.followingList);

    this.setState({
      open: props.open,
      openChat: false
    });
  }

  componentWillUnmount() {}

  //   handleClose = () => {
  //     console.log("Hello");
  //       this.setState({
  //         open: false
  //     })
  //   };

  openChatWindow = e => (id, profileImage, name) => {
    // e.preventDefault();
    console.log(id);
    this.setState({
      openChat: true,
      
    });
  };

  closeChatWindow = () => {
    this.setState({
      openChat: false,
      receiverID: '',
      receiverImage: '',
      receiverName: ''
    });
  };
  render() {
    const { classes } = this.props;
    // const u1 = this.props.match.params.u1;
    // const u2 = this.props.match.params.u2;
    // console.log(this.props.state)
    console.log(this.props.followingList);
    const followingList = this.props.followingList;
    console.log(this.state.receiverID)
    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          fullWidth={true}
          maxWidth={"md"}
        >
          <div
            className={classes.messageModal}
            style={{ display: this.state.openChat ? "none" : "block" }}
          >
            <div className={classes.modalHeader}>
              <div className={classes.modalTitle}>Messages</div>
              <div
                className={classes.modalClose}
                onClick={this.props.handleCloseMessages}
                style={{ cursor: "pointer" }}
              >
                <CloseIcon />
              </div>
            </div>

            <div>
              <ul
                style={{ listStyle: "none", paddingLeft: 0, marginBottom: 0 }}
              >
                {/* {console.log(this.state.followingUsers)} */}
                {Object.keys(followingList).map(index => {
                  return (
                    <li style={{ borderBottom: "1px solid #e2e2e2" }}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                      >
                        <Grid item xs={1} style={{ padding: "1%" }}>
                          <Avatar
                            alt="Remy Sharp"
                            src={followingList[index].profileImg}
                            className="avatar"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={8}
                          style={{
                            padding: "2%",
                            fontWeight: 500,
                            fontSize: 18
                          }}
                        >
                          <Typography variant="h6" component="h6">
                            {" "}
                            {followingList[index].fname +
                              " " +
                              followingList[index].lname}
                          </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ padding: "3%" }}>
                          <Button
                            className={classes.msgButton}
                            onClick={() =>
                              this.openChatWindow(
                                followingList[index]._id,
                                followingList[index].profileImg,
                                followingList[index].fname +
                                  " " +
                                  followingList[index].lname
                              )
                            }
                          >
                            Message
                          </Button>
                        </Grid>
                      </Grid>
                    </li>
                  );
                })}

                {/* <li style={{ borderBottom: "1px solid #e2e2e2" }}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Grid item xs={1} style={{ padding: "1%" }}>
                      <Avatar alt="Remy Sharp" src="1.jpg" className="avatar" />
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      style={{ padding: "2%", fontWeight: 500, fontSize: 18 }}
                    >
                      <Typography variant="h6" component="h6">
                        {" "}
                        Mayank Padshala{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} style={{ padding: "3%" }}>
                      <Button
                        className={classes.msgButton}
                        onClick={this.openChatWindow}
                      >
                        Message
                      </Button>
                    </Grid>
                  </Grid>
                </li> */}
              </ul>
            </div>
          </div>

          <div
            className={classes.messageModal}
            style={{ display: this.state.openChat ? "block" : "none" }}
          >
            {/* <div className={classes.modalHeader} style={{ padding: 0 }}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                <Grid item xs={1} style={{ padding: "1% 0 0 0" }}>
                  <Avatar alt="Remy Sharp" src="1.jpg" className="avatar" />
                </Grid>
                <Grid
                  item
                  xs={9}
                  style={{ padding: "2% 0 0 0", fontWeight: 500, fontSize: 18 }}
                >
                  <Typography variant="h6" component="h6">
                    Mayank Padshala
                  </Typography>
                </Grid>
                <Grid item xs={2} style={{ padding: "2% 0 0 0" }}>
                  <Button
                    className={classes.msgButton}
                    onClick={this.closeChatWindow}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </div> */}

            <div className="m-chat-receiver">
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Avatar alt="Remy Sharp" src="1.jpg" className="m-bigAvatar" />
                <Typography variant="h5" component="h3">
                  Namrata Kasar
                </Typography>
                <div
                  className={classes.modalClose}
                  onClick={this.closeChatWindow}
                  style={{ cursor: "pointer" }}
                >
                  <CloseIcon />
                </div>
              </Grid>
            </div>

            <div className="m-chat-bg col-lg-12">
              {/* {this.props.state.messagehistory.map((item, key) => {
                        return ( */}
              <div
                // key={key}
                className={
                  "m-chat-left"
                  // this.props.userState.userId == item.sender
                  // u1 == item.sender
                  // ? "m-chat-right"
                  // : "m-chat-left"
                }
              >
                <Typography variant="h5" component="h3">
                  {/* {item.content} */}
                  Hello
                </Typography>
                <Typography component="p">{/* {item.timeStamp} */}</Typography>
              </div>
              <div
                // key={key}
                className={
                  "m-chat-right"
                  // this.props.userState.userId == item.sender
                  // u1 == item.sender
                  // ? "m-chat-right"
                  // : "m-chat-left"
                }
              >
                <Typography variant="h5" component="h3">
                  {/* {item.content} */}
                  Hello
                </Typography>
                <Typography component="p">{/* {item.timeStamp} */}</Typography>
              </div>
              <div
                // key={key}
                className={
                  "m-chat-left"
                  // this.props.userState.userId == item.sender
                  // u1 == item.sender
                  // ? "m-chat-right"
                  // : "m-chat-left"
                }
              >
                <Typography variant="h5" component="h3">
                  {/* {item.content} */}
                  Hello
                </Typography>
                <Typography component="p">{/* {item.timeStamp} */}</Typography>
              </div>
              <div
                // key={key}
                className={
                  "m-chat-right"
                  // this.props.userState.userId == item.sender
                  // u1 == item.sender
                  // ? "m-chat-right"
                  // : "m-chat-left"
                }
              >
                <Typography variant="h5" component="h3">
                  {/* {item.content} */}
                  Hello
                </Typography>
                <Typography component="p">{/* {item.timeStamp} */}</Typography>
              </div>
              <div
                // key={key}
                className={
                  "m-chat-left"
                  // this.props.userState.userId == item.sender
                  // u1 == item.sender
                  // ? "m-chat-right"
                  // : "m-chat-left"
                }
              >
                <Typography variant="h5" component="h3">
                  {/* {item.content} */}
                  Hello
                </Typography>
                <Typography component="p">{/* {item.timeStamp} */}</Typography>
              </div>
              <div
                // key={key}
                className={
                  "m-chat-right"
                  // this.props.userState.userId == item.sender
                  // u1 == item.sender
                  // ? "m-chat-right"
                  // : "m-chat-left"
                }
              >
                <Typography variant="h5" component="h3">
                  {/* {item.content} */}
                  Hello
                </Typography>
                <Typography component="p">{/* {item.timeStamp} */}</Typography>
              </div>
              <div
                // key={key}
                className={
                  "m-chat-left"
                  // this.props.userState.userId == item.sender
                  // u1 == item.sender
                  // ? "m-chat-right"
                  // : "m-chat-left"
                }
              >
                <Typography variant="h5" component="h3">
                  {/* {item.content} */}
                  Hello
                </Typography>
                <Typography component="p">{/* {item.timeStamp} */}</Typography>
              </div>
              <div
                // key={key}
                className={
                  "m-chat-right"
                  // this.props.userState.userId == item.sender
                  // u1 == item.sender
                  // ? "m-chat-right"
                  // : "m-chat-left"
                }
              >
                <Typography variant="h5" component="h3">
                  {/* {item.content} */}
                  Hello
                </Typography>
                <Typography component="p">{/* {item.timeStamp} */}</Typography>
              </div>
              <div
                // key={key}
                className={
                  "m-chat-left"
                  // this.props.userState.userId == item.sender
                  // u1 == item.sender
                  // ? "m-chat-right"
                  // : "m-chat-left"
                }
              >
                <Typography variant="h5" component="h3">
                  {/* {item.content} */}
                  Hello
                </Typography>
                <Typography component="p">{/* {item.timeStamp} */}</Typography>
              </div>
              <div
                // key={key}
                className={
                  "m-chat-right"
                  // this.props.userState.userId == item.sender
                  // u1 == item.sender
                  // ? "m-chat-right"
                  // : "m-chat-left"
                }
              >
                <Typography variant="h5" component="h3">
                  {/* {item.content} */}
                  Hello
                </Typography>
                <Typography component="p">{/* {item.timeStamp} */}</Typography>
              </div>
              {/* );
                    })} */}
            </div>

            <div className="m-chat-write">
              <Paper
                // className={classNames(classes.root, "m-center-content")}
                elevation={1}
              >
                <InputBase
                  className={classes.input}
                  placeholder="Write Your message"
                  id="messageContent"
                  // onChange={(event)=>console.log(event)}
                />

                <IconButton
                  color="primary"
                  className={classes.iconButton}
                  aria-label="Directions"
                  autoFocus={true}
                  style={{ left: 720 }}
                  onClick={() => this.localsendMessage()}
                >
                  <SendIcon />
                </IconButton>
              </Paper>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
MessageDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state: state.chatState,
  userState: state.userState,
  followingList: state.message.followingList,
  userDetails: state.homeState.userDetails
});

export default connect(
  mapStateToProps,
  { getChatHistory, getReceiverData, sendMessage, getFollowingUsers }
)(withStyles(styles)(MessageDialog));
