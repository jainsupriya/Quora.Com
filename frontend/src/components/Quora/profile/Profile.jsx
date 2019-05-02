import React from "react";
import PropTypes from "prop-types";
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
import {} from "../../../redux/actions/homeAction";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import Feed from "../layout/feed";
import Content from "./ProfileContent";
import QuestionCard from "../layout/QuestionCard";
import NavHeader from "../header/navHeader";
import DialogPersonal from "../layout/DialogPersonal";
import DialogPhoto from "../layout/DialogPhoto";
import DialogProfileCredential from "../layout/DialogProfileCredential";

//import actions
import { setProfileName } from "../../../redux/actions/profileActions";

const styles = theme => ({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200
  },
  ui_button: {
    cursor: "pointer",
    direction: "ltr",
    display: "block",
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
    fontSize: "13px",
    fontWeight: "400",
    height: "18px",
    lineHeight: "18.2px",
    overflowWrap: "break-word",
    textAlign: "center",
    textSizeAdjust: "100%",
    userSelect: "none",
    whiteSpace: "nowrap"
  }
});
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddEducation: false,
      openAddEmployement: false,
      openAddLocation: false,
      openAddPersonal: false,
      showEditPhoto: false,
      openUploadPhoto: false,
      showEditName: false,
      openEditName: false,
      openProfileCredential: false,
      fname: "",
      lname: "",
      id: "",
      profileCredential: "",
      profileImage: "",
      isChanged: false
    };

    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  handleClickOpenEducation = () => {
    this.setState({
      openAddEducation: true,
      openAddEmployement: false,
      openAddLocation: false,
      openAddPersonal: false
    });
  };
  handleClickOpenEmployment = () => {
    this.setState({
      openAddEducation: false,
      openAddEmployement: true,
      openAddLocation: false,
      openAddPersonal: false
    });
  };

  updateName = () => {
    const profileData = {
      fname: this.state.fname,
      lname: this.state.lname
    };

    this.props.setProfileName(this.state.id, profileData);
    this.setState({
      openEditName: false
    });
  };

  handleClickOpenProfileCredential = () => {
    this.setState({
      openAddEducation: false,
      openAddEmployement: false,
      openAddLocation: false,
      openAddPersonal: false,
      openProfileCredential: true
    });
  };
  handleClickOpenLocation = () => {
    this.setState({
      openAddEducation: false,
      openAddEmployement: false,
      openAddLocation: true,
      openAddPersonal: false
    });
  };
  handleClickOpenPersonal = () => {
    this.setState({
      openAddEducation: false,
      openAddEmployement: false,
      openAddLocation: false,
      openAddPersonal: true
    });
  };

  displayEdit = () => {
    this.setState({
      showEditPhoto: true
    });
  };

  displayEditExit = () => {
    this.setState({
      showEditPhoto: false
    });
  };

  displayEditName = () => {
    this.setState({
      showEditName: true
    });
  };

  displayEditNameExit = () => {
    this.setState({
      showEditName: false
    });
  };

  handleClickOpenUploadPhoto = () => {
    this.setState({
      openAddEducation: false,
      openAddEmployement: false,
      openAddLocation: false,
      openAddPersonal: false,
      openUploadPhoto: true
    });
  };

  handleClickOpenEditName = () => {
    this.setState({
      openAddEducation: false,
      openAddEmployement: false,
      openAddLocation: false,
      openAddPersonal: false,
      openUploadPhoto: false,
      openEditName: true
    });
  };
  handleClose = () => {
    this.setState({
      openAddEducation: false,
      openAddEmployement: false,
      openAddLocation: false,
      openAddPersonal: false,
      openUploadPhoto: false,
      showEditName: false,
      openEditName: false,
      openProfileCredential: false
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    //  console.log(this.props.state.userDetails);
    if (this.props.state.userDetails !== undefined) {
      this.setState({
        fname: this.props.state.userDetails.fname,
        lname: this.props.state.userDetails.lname,
        id: this.props.state.userDetails._id
      });

      if (this.props.state.userDetails.profileCredential !== undefined) {
        this.setState({
          profileCredential: this.props.state.userDetails.profileCredential
        });
      }

      if (this.props.state.userDetails.profileImg !== undefined) {
        console.log("componentDidMount");
        this.setState({
          profileImage: this.props.state.userDetails.profileImg
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.state.userDetails.profileCredential !== undefined) {
      this.setState({
        profileCredential: nextProps.state.userDetails.profileCredential
      });
    } else {
      this.setState({
        profileCredential: ""
      });
    }

    if (nextProps.state.userDetails.profileImg !== undefined) {
      console.log("componentWillReceiveProps");
      this.setState({
        profileImage: nextProps.state.userDetails.profileImg,
        isChanged: nextProps.state.userDetails.isChanged
      });
    } else {
      this.setState({
        profileImage: ""
      });
    }
  }

  render() {
    let temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const { classes } = this.props;

    const userDetails = this.props.state.userDetails;

    // console.log(userDetails);

    const showEditPhoto = this.state.showEditPhoto ? (
      <div className="edit_profile_photo" id="__w2_w083ZVOZ48_edit">
        <span id="__w2_w083ZVOZ60_open_edit_photo">
          <a
            className="ui_button u-nowrap ui_button--styled ui_button--SimpleLinkStyle ui_button--SimpleLinkStyle--blue ui_button--size_small u-inline-block"
            href="#"
            role="button"
            onClick={() => {
              this.setState({
                openUploadPhoto: true
              });
            }}
          >
            <div className="ui_button_inner" id="__w2_w083ZVOZ62_inner">
              <div className="ui_button_label_count_wrapper">
                <span
                  className="ui_button_label center"
                  id="__w2_w083ZVOZ62_label"
                >
                  Edit Photo
                </span>
              </div>
            </div>
          </a>
        </span>
      </div>
    ) : null;
    const showEditName = this.state.showEditName ? (
      <div className="edit_profile_photo" id="__w2_w083ZVOZ48_edit">
        <span id="__w2_w083ZVOZ60_open_edit_photo">
          <a
            className="ui_button u-nowrap ui_button--styled ui_button--SimpleLinkStyle ui_button--SimpleLinkStyle--blue ui_button--size_small u-inline-block"
            href="#"
            role="button"
            id="__w2_w083ZVOZ62_button"
            onClick={() => {
              this.setState({
                openEditName: true
              });
            }}
          >
            <div className="ui_button_inner" id="__w2_w083ZVOZ62_inner">
              <div className="ui_button_label_count_wrapper">
                <span
                  className="ui_button_label center"
                  id="__w2_w083ZVOZ62_label"
                  style={{ color: "grey" }}
                >
                  Edit
                </span>
              </div>
            </div>
          </a>
        </span>
      </div>
    ) : null;

    const addEditName = this.state.openEditName ? (
      <div class="namedit" id="editor">
        <input
          type="text"
          name="fname"
          value={this.state.fname}
          onChange={this.onChange}
          placeholder="Your First Name"
        />
        <input
          type="text"
          name="lname"
          value={this.state.lname}
          data-group="js-editable"
          placeholder="Your Last Name"
          onChange={this.onChange}
        />
        <div className="update_button">
          <button
            className="btn btn-link"
            href="#"
            onClick={() => {
              this.setState({
                openEditName: false,
                showEditName: false
              });
            }}
          >
            Cancel
          </button>
          <button className="btn btn-info" href="#" onClick={this.updateName}>
            Update
          </button>
        </div>
      </div>
    ) : null;

    const addPersonalDetails = (
      <DialogPersonal
        open={this.state.openAddPersonal}
        onClose={this.handleClose}
      />
    );

    const addProfilePicture = (
      <DialogPhoto
        open={this.state.openUploadPhoto}
        onClose={this.handleClose}
      />
    );

    const addProfileCredentials = (
      <DialogProfileCredential
        open={this.state.openProfileCredential}
        onClose={this.handleClose}
        profileCredential={userDetails.profileCredential}
      />
    );

    const addEmployment = (
      <div>
        <Dialog
          fullWidth
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.openAddEmployement}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Edit Credentials
            <div
              class="modal_subtitle"
              id="modal_subtitle"
              style={{ color: "grey", fontSize: "15px" }}
            >
              Credentials also appear on answers you write.
            </div>
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              direction="column"
              justify="space-between"
              // className="m-margin-up-down"
            >
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                // className="m-margin-up-down"
              >
                <Grid item xs={1}>
                  <div class="u-absolute u-top--0 u-left--0 u-margin-left--md u-margin-top--md">
                    <span
                      class="ui_icon ui_icon_color--gray ui_icon_size--small_medium ui_icon_outline--default"
                      aria-hidden="true"
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
                          class="icon_svg-stroke"
                          stroke="#666"
                          stroke-width="1.5"
                          fill="none"
                          fill-rule="evenodd"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M20.5,11 L20.5,18 C20.5,18.5522847 20.0522847,19 19.5,19 L4.5,19 C3.94771525,19 3.5,18.5522847 3.5,18 L3.5,11 M10.40625,15 L5.625,15 C4.45139491,15 3.5,13.9766509 3.5,12.7142857 L3.5,7 L3.5,7 L20.5,7 L20.5,12.7142857 C20.5,13.9766509 19.5486051,15 18.375,15 L13.59375,15 M9,7 L9,6 C9,4.8954305 9.8954305,4 11,4 L11,4 L13,4 C14.1045695,4 15,4.8954305 15,6 L15,7 M11,13.5 L13,13.5 C13.2761424,13.5 13.5,13.7238576 13.5,14 L13.5,16 C13.5,16.2761424 13.2761424,16.5 13,16.5 L11,16.5 C10.7238576,16.5 10.5,16.2761424 10.5,16 L10.5,14 C10.5,13.7238576 10.7238576,13.5 11,13.5 Z" />
                        </g>
                      </svg>
                    </span>
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <Grid item className="black-clr">
                    <div class="title">Add employment credential</div>
                  </Grid>
                  {/* <Grid item className="fnt-13">
                                            {"Answered 7H ago"}
                                        </Grid> */}
                </Grid>
              </Grid>

              <Grid item xs={9}>
                <Grid item xs={2}>
                  {"    "}
                </Grid>
                <Grid item xs={10}>
                  <textarea
                    class="selector_input text"
                    type="text"
                    rows="1"
                    title="Position"
                    data-group="js-editable"
                    placeholder="Position"
                    w2cid="wHEAXKDm8"
                    id="__w2_wHEAXKDm8_input"
                    style={{ paddingLeft: "12%" }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={9}>
                <Grid item xs={2}>
                  {"    "}
                </Grid>
                <Grid item xs={10}>
                  <textarea
                    class="selector_input text"
                    type="text"
                    rows="1"
                    title="Position"
                    data-group="js-editable"
                    placeholder="Position"
                    w2cid="wHEAXKDm8"
                    id="__w2_wHEAXKDm8_input"
                    style={{ paddingLeft: "12%" }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={9}>
                <Grid item xs={2}>
                  {"    "}
                </Grid>
                <Grid item xs={10}>
                  <textarea
                    class="selector_input text"
                    type="text"
                    rows="1"
                    title="Position"
                    data-group="js-editable"
                    placeholder="Position"
                    w2cid="wHEAXKDm8"
                    id="__w2_wHEAXKDm8_input"
                    style={{ paddingLeft: "12%" }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Add Question
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
    return (
      <div>
        <AppBar className="m-bg-color" position="sticky">
          <NavHeader />
        </AppBar>
        {addEmployment}
        {addPersonalDetails}
        {addProfilePicture}
        {addProfileCredentials}

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={1} />
          <Grid item xs={9}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <Grid item xs={9} className="m-padding-left-right-15">
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="left"
                >
                  <Grid item xs={4}>
                    <div
                      class="u-margin-right--sm"
                      onMouseEnter={this.displayEdit}
                      onMouseLeave={this.displayEditExit}
                    >
                      <div class="profile_photo" id="__w2_w4a2NguV48_photo">
                        <div id="w4a2NguV56">
                          <span class="photo_tooltip IdentityPhoto HoverMenu Photo">
                            <Avatar
                              className={classes.bigAvatar}
                              src={this.state.profileImage}
                              alt="Remy Sharp"
                              height="200"
                              width="200"
                            />
                            {showEditPhoto}
                            <span id="w4a2NguV138" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={8}>
                    <div class="header_content">
                      <div id="w4a2NguV24">
                        <div class="ProfileNameAndSig">
                          <div id="w4a2NguV49">
                            <div
                              class="NGProfileNameEditor"
                              onMouseEnter={this.displayEditName}
                              onMouseLeave={this.displayEditNameExit}
                            >
                              <div id="__w2_w4a2NguV50_initial" class="">
                                <h1>
                                  <span id="w4a2NguV53">
                                    <span id="__w2_w4a2NguV54_link">
                                      <span class="user">
                                        {this.state.fname +
                                          "    " +
                                          this.state.lname}
                                      </span>
                                    </span>
                                  </span>
                                </h1>
                                {showEditName}
                                {addEditName}
                              </div>
                            </div>
                          </div>
                          <div id="w4a2NguV51">
                            <div class="FreeformCredentialEditor">
                              <span id="w4a2NguV63" />
                              <span id="w4a2NguV65">
                                <a
                                  class="CredentialModalLink EditCredentialModalLink"
                                  href="#"
                                  onClick={() => {
                                    this.setState({
                                      openProfileCredential: true
                                    });
                                  }}
                                >
                                  {this.state.profileCredential !== ""
                                    ? this.state.profileCredential
                                    : "Add profile credential"}
                                </a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <Divider />
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                />
                <Content />
              </Grid>

              <Grid item xs={3} className="fix-pos">
                <Paper className="m-paper" elevation={1}>
                  Credentials & Highlights
                  <Divider />
                 
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={1}>
                      <div class="u-margin-right--sm">
                        <span
                          class="ui_icon ui_icon_color--blue_dark ui_icon_size--small_medium ui_icon_outline--default"
                          aria-hidden="true"
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
                              class="icon_svg-stroke"
                              stroke="#666"
                              stroke-width="1.5"
                              fill="none"
                              fill-rule="evenodd"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M20.5,11 L20.5,18 C20.5,18.5522847 20.0522847,19 19.5,19 L4.5,19 C3.94771525,19 3.5,18.5522847 3.5,18 L3.5,11 M10.40625,15 L5.625,15 C4.45139491,15 3.5,13.9766509 3.5,12.7142857 L3.5,7 L3.5,7 L20.5,7 L20.5,12.7142857 C20.5,13.9766509 19.5486051,15 18.375,15 L13.59375,15 M9,7 L9,6 C9,4.8954305 9.8954305,4 11,4 L11,4 L13,4 C14.1045695,4 15,4.8954305 15,6 L15,7 M11,13.5 L13,13.5 C13.2761424,13.5 13.5,13.7238576 13.5,14 L13.5,16 C13.5,16.2761424 13.2761424,16.5 13,16.5 L11,16.5 C10.7238576,16.5 10.5,16.2761424 10.5,16 L10.5,14 C10.5,13.7238576 10.7238576,13.5 11,13.5 Z" />
                            </g>
                          </svg>
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={11}>
                      <div id="wsV1hsO51">
                        <div class="AddCredentialListItem AddWorkCredentialListItem AboutListItem">
                          <span class="u-flex u-padding-bottom--sm">
                            <span class="body_text">
                              <span class="main_text">
                                <span id="wsV1hsO510">
                                  <a
                                    class="EditCredentialModalLink CredentialModalLink"
                                    href="#"
                                    onClick={() => {
                                      this.setState({
                                        openAddEmployement: true
                                      });
                                    }}
                                  >
                                    Add employment credential
                                  </a>
                                </span>
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={1}>
                      <div class="u-margin-right--sm">
                        <span
                          class="ui_icon ui_icon_color--blue_dark ui_icon_size--small_medium ui_icon_outline--default"
                          aria-hidden="true"
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
                              class="icon_svg-stroke"
                              stroke="#666"
                              stroke-width="1.5"
                              fill="none"
                              fill-rule="evenodd"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M2.5,9.5 L12,5 L21.5,9.5 L12,14 L2.5,9.5 Z M20,10.5 L20,16.5 M6.5,12 C6.5,14 6.5,15 6.5,15 C6.5,16.5048582 9.00219538,18 12,18 C14.9978046,18 17.5,16.4986226 17.5,15 C17.5,15 17.5,14 17.5,12 M20,16.5 L18,20 L22,20 L20,16.5 Z" />
                            </g>
                          </svg>
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={11}>
                      <div id="wsV1hsO53">
                        <div class="AddCredentialListItem AboutListItem AddSchoolCredentialListItem">
                          <span class="u-flex u-padding-bottom--sm">
                            <span class="body_text">
                              <span class="main_text">
                                <span id="wsV1hsO513">
                                  <a
                                    class="EditCredentialModalLink CredentialModalLink"
                                    href="#"
                                  >
                                    Add education credential
                                  </a>
                                </span>
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item xs={1}>
                      <div class="u-margin-right--sm">
                        <span
                          class="ui_icon ui_icon_color--blue_dark ui_icon_size--small_medium ui_icon_outline--default"
                          aria-hidden="true"
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
                              class="icon_svg-stroke"
                              stroke="#666"
                              stroke-width="1.5"
                              fill="none"
                              fill-rule="evenodd"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M2.5,9.5 L12,5 L21.5,9.5 L12,14 L2.5,9.5 Z M20,10.5 L20,16.5 M6.5,12 C6.5,14 6.5,15 6.5,15 C6.5,16.5048582 9.00219538,18 12,18 C14.9978046,18 17.5,16.4986226 17.5,15 C17.5,15 17.5,14 17.5,12 M20,16.5 L18,20 L22,20 L20,16.5 Z" />
                            </g>
                          </svg>
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={11}>
                      <div id="wsV1hsO53">
                        <div class="AddCredentialListItem AboutListItem AddSchoolCredentialListItem">
                          <span class="u-flex u-padding-bottom--sm">
                            <span class="body_text">
                              <span class="main_text">
                                <span id="wsV1hsO513">
                                  <a
                                    class="EditCredentialModalLink CredentialModalLink"
                                    href="#"
                                    id="__w2_wsV1hsO514_modal_link"
                                    onClick={() => {
                                      this.setState({
                                        openAddPersonal: true
                                      });
                                    }}
                                  >
                                    Add your personal details
                                  </a>
                                </span>
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={1}>
                      <div class="u-margin-right--sm">
                        <span
                          class="ui_icon ui_icon_color--blue_dark ui_icon_size--small_medium ui_icon_outline--default"
                          aria-hidden="true"
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
                              class="icon_svg-stroke"
                              stroke="#666"
                              stroke-width="1.5"
                              fill="none"
                              fill-rule="evenodd"
                              stroke-linecap="round"
                            >
                              <path d="M12,13 C13.6568542,13 15,11.6568542 15,10 C15,8.34314575 13.6568542,7 12,7 C10.3431458,7 9,8.34314575 9,10 C9,11.6568542 10.3431458,13 12,13 Z M12,20.73 C16.6375,16.5 19,12.9 19,10.2 C19,6.2235498 15.8659932,3 12,3 C8.13400675,3 5,6.2235498 5,10.2 C5,12.9 7.3625,16.41 12,20.73 L12,20.73 Z" />
                            </g>
                          </svg>
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={11}>
                      <div id="wsV1hsO55">
                        <div class="AddCredentialListItem AboutListItem AddLocationCredentialListItem">
                          <span class="u-flex u-padding-bottom--sm">
                            <span class="body_text">
                              <span class="main_text">
                                <span id="wsV1hsO516">
                                  <a
                                    class="EditCredentialModalLink CredentialModalLink"
                                    href="#"
                                    id="_modal_link"
                                  >
                                    Add a location credential
                                  </a>
                                </span>
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  setProfileName: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  state: state.homeState,
  userDetails: state.userDetails
});

export default connect(
  mapStateToProps,
  { setProfileName }
)(withStyles(styles)(Profile));
