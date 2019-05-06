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
import axios from "axios";
// import {
//   setFollower,
//   removeFollower
// } from "../../../redux/actions/profileActions";

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
    "&::before": {
      content: "",
      display: "block",
      width: 0,
      height: 0,
      borderColor: "rgba(204,204,204,0)",
      borderLeft: "7.5px solid transparent",
      borderRight: "7.5px solid transparen",
      borderBottom: "7px solid #ccc",
      left: 14,
      marginTop: -7
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
  }
});

//Create a Main Component
class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollow: false,
      followerCount: 0
    };
  }

  componentDidMount() {
    var isfollow = false;
    let followerCountInc = 0;

    if (this.props.user !== undefined && this.props.follower !== undefined) {
      console.log(this.props.user);
      console.log(this.props.follower);
      if (this.props.user.followersUserList !== undefined) {
        console.log(this.props.user.followersUserList.length);
        if (
          this.props.user.followersUserList.includes(this.props.follower._id)
        ) {
          isfollow = true;
        }
        followerCountInc = this.props.user.followersUserList.length;
      }
    }
    this.setState({
      isfollow: isfollow,
      followerCount: followerCountInc
    });
  }

  // componentWillReceiveProps() {
  //   var isfollow = false;
  //   let followerCountInc = 0;

  //   if (this.props.user !== undefined && this.props.follower !== undefined) {
  //     console.log(this.props.user);
  //   console.log(this.props.follower);
  //     if (this.props.user.followersUserList !== undefined) {
  //       console.log(this.props.user.followersUserList.length)
  //       if (
  //         this.props.user.followersUserList.includes(this.props.follower._id)
  //       ) {
  //         isfollow = true;
  //       }
  //       followerCountInc = this.props.user.followersUserList.length;
  //     }
  //   }
  //   this.setState({
  //     isfollow: isfollow,
  //     followerCount: followerCountInc
  //   });
  // }

  handlefollower = () => {
    if (!this.state.isFollow) {
      // this.props.setFollower(this.props.user._id,this.props.follower._id)
      axios
        .put(
          `/user/followUser/${this.props.user._id}/${this.props.follower._id}`
        )
        .then(res => {
          console.log(res.data);
          this.setState({
            followerCount: this.state.followerCount + 1,
            isFollow: !this.state.isFollow
          });
        })
        .catch(err => console.log(err.data));
    } else if (this.state.isFollow && this.state.followerCount != 0) {
      // this.props.removeFollower(this.props.user._id,this.props.follower._id)
      axios
        .put(
          `/user/unFollowUser/${this.props.user._id}/${this.props.follower._id}`
        )
        .then(res => {
          console.log(res.data);
          this.setState({
            followerCount: this.state.followerCount - 1,
            isFollow: !this.state.isFollow
          });
        })
        .catch(err => console.log(err.data));
    }
  };

  render() {
    const { classes } = this.props;
    console.log(this.props);
    // const user = this.props;
    // const follower = this.props;

    return (
      <div>
        <Grid
          container
          margin="30px"
          direction="row"
          spacing={0}
          justify="flex-start"
          alignItems="flex-start"
          //className="answer-actions"
        >
          <Grid item xs={3}>
            <div onClick={() => this.GiveAnswer()}>
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
              <Link to="#">
              <span>Notify Me</span>
              </Link>
            </div>
          </Grid>
          <Grid item xs={3}>
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
            <Link to="#" onClick={this.handlefollower}>
              <span>{this.state.isFollow ? "Unfollow" : "Follow"}</span>
              <span class="bullet"> · </span>
              <span class="ui_button_count_inner" id="__w2_wikv5yOF93_count">
                {this.state.followerCount}
              </span>
            </Link>
            <span class="bullet"> · </span>
            <span class="ui_button_count_inner" id="__w2_wikv5yOF93_count" />
          </Grid>
          <Grid item xs={5} />

          <Grid item xs={1}>
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
      </div>
    );
  }
}

ActionBar.propTypes = {
  classes: PropTypes.object.isRequired
  // setFollower: PropTypes.func,
  // removeFollower: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    /*setFollower,removeFollower*/
  }
)(withStyles(styles)(withRouter(ActionBar)));
