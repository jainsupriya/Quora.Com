import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "../../../styles/message.css";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@material-ui/icons/Send";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
// import ScrollToBottom from "react-scroll-to-bottom";
import { connect } from "react-redux";
import NavHeader from "../header/navHeader";
import AppBar from "@material-ui/core/AppBar";
import {
  getChatHistory,
  getReceiverData,
  sendMessage
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
  }
});

class Message extends React.Component {
  componentDidMount() {
    this.props.getChatHistory(
      this.props.match.params.u1,
      this.props.match.params.u2
    );
    this.props.getReceiverData(this.props.match.params.u2);

    this.interval = setInterval(
      () =>
        this.props.getChatHistory(
          this.props.match.params.u1,
          this.props.match.params.u2
        ),
      10000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  localsendMessage = () => {
    this.props.sendMessage(
      this.props.userState.userId,
      this.props.match.params.u2,
      document.getElementById("messageContent").value
    );
    // this.props.sendMessage(this.props.match.params.u1,this.props.match.params.u2,document.getElementById("messageContent").value)
    document.getElementById("messageContent").value = "";
  };
  render() {
    if (this.props.userState.userToken === "") {
      this.props.history.push("/login");
    }

    const { classes } = this.props;
    const u1 = this.props.match.params.u1;
    const u2 = this.props.match.params.u2;
    return (
      <div className="m-brdr-white">
        <AppBar className="m-bg-color" position="sticky">
          <NavHeader />
        </AppBar>
        {/* {console.log(this.props.state.messagehistory)} */}
        {/* <ScrollToBottom
	                    mode="bottom"
	                > */}
        <div className="m-chat-receiver">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className="m-bigAvatar"
            />
            <Typography variant="h5" component="h3">
              {this.props.state.receiverData.name}
            </Typography>
          </Grid>
        </div>

        {/* <div className="m-chat-bg clearfix"> */}
        <div className="m-chat-bg col-lg-12">
          {this.props.state.messagehistory.map((item, key) => {
            return (
              <div
                key={key}
                className={
                  this.props.userState.userId == item.sender
                    ? // u1 == item.sender
                      "m-chat-right"
                    : "m-chat-left"
                }
              >
                <Typography variant="h5" component="h3">
                  {/* {this.props.userState.userId} */}
                  {/* {item.sender} */}
                  {item.content}
                </Typography>
                <Typography component="p">{item.timeStamp}</Typography>
              </div>
            );
          })}
        </div>

        <div className="m-chat-write">
          <Paper
            className={classNames(classes.root, "m-center-content")}
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
              onClick={() => this.localsendMessage()}
            >
              <SendIcon />
            </IconButton>
          </Paper>
        </div>
        {/* </ScrollToBottom> */}
      </div>
    );
  }
}
Message.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state: state.chatState,
  userState: state.userState
});

export default connect(
  mapStateToProps,
  { getChatHistory, getReceiverData, sendMessage }
)(withStyles(styles)(Message));
