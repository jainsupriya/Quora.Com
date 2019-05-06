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
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { setProfileEducation } from "../../../redux/actions/profileActions";
const styles = theme => ({});

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

//Create a Main Component
class DialogEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: false,
      school: "",
      Concentration: "",
      secondaryConcentration: "",
      degreeType: "",
      graduationYear: "",
      description: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    if (nextProps.education !== undefined) {
      this.setState({
        current:
          nextProps.education.current !== undefined
            ? nextProps.education.current
            : "",
        school:
          nextProps.education.school !== undefined
            ? nextProps.education.school
            : "",
        Concentration:
          nextProps.education.Concentration !== undefined
            ? nextProps.education.Concentration
            : "",
        secondaryConcentration:
          nextProps.education.secondaryConcentration !== undefined
            ? nextProps.education.secondaryConcentration
            : "",
        degreeType:
          nextProps.education.degreeType !== undefined
            ? nextProps.education.degreeType
            : "",
        graduationYear:
          nextProps.education.graduationYear !== undefined
            ? nextProps.education.graduationYear
            : "",
        description:
          nextProps.education.description !== undefined
            ? nextProps.education.description
            : ""
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleSave = e => {
    e.preventDefault();
    // console.log(this.props.state.userDetails._id);
    const profileData = {
      education: {
        current: this.state.current,
        school: this.state.school,
        Concentration: this.state.Concentration,
        secondaryConcentration: this.state.secondaryConcentration,
        degreeType: this.state.degreeType,
        graduationYear: this.state.graduationYear,
        description: this.state.description
      }
    };

    this.props.setProfileEducation(
      this.props.state.userDetails._id,
      profileData
    );
  };

  render() {
    const { classes } = this.props;

    const education = this.props.education;

    return (
      <div>
        <Dialog
          fullWidth
          onClose={this.props.onClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.props.onClose}
          >
            Edit Credentials
            <div
              class="modal_subtitle"
              id="modal_subtitle"
              style={{ color: "grey", "font-size": "15px" }}
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
                      <g stroke="none" fill="none" fill-rule="evenodd">
                        <g
                          class="icon_svg-stroke"
                          transform="translate(6.000000, 3.000000)"
                          stroke="#666666"
                          strokeWidth="1.5"
                        >
                          <path d="M13,18 C13,14.6862915 10.0898509,12 6.5,12 C2.91014913,12 0,14.6862915 0,18" />
                          <circle cx="6.5" cy="5" r="4.5" />
                        </g>
                      </g>
                    </svg>
                  </span>
                </Grid>
                <Grid item xs={11}>
                  <Grid item className="black-clr">
                    <div class="title">Add Profile credential</div>
                  </Grid>
                  {/* <Grid item className="fnt-13">
                                            {"Answered 7H ago"}
                                        </Grid> */}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  //className="m-margin-up-down"
                >
                  <Grid item xs={1} />
                  <Grid item xs={4}>
                    <label
                      class="input_label"
                      for="__w2_wUZE3W2P32_position"
                      id="__w2_wUZE3W2P32_label"
                      // style={{ fontWeight: "bold" }}
                    >
                      School
                    </label>
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      class="text input_field"
                      type="text"
                      placeholder="Harvard"
                      value={this.state.school}
                      onChange={this.onChange}
                      name="school"
                      required="False"
                      maxlength="50"
                      data-group="js-editable"
                      w2cid="wUZE3W2P32"
                      id="__w2_wUZE3W2P32_position"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  //className="m-margin-up-down"
                >
                  <Grid item xs={1} />
                  <Grid item xs={4}>
                    <label
                      class="input_label"
                      for="__w2_wUZE3W2P32_position"
                      id="__w2_wUZE3W2P32_label"
                      // style={{ fontWeight: "bold" }}
                    >
                      Concentration
                    </label>
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      class="text input_field"
                      type="text"
                      placeholder="Major"
                      value={this.state.Concentration}
                      onChange={this.onChange}
                      name="Concentration"
                      required="False"
                      maxlength="50"
                      data-group="js-editable"
                      w2cid="wUZE3W2P32"
                      id="__w2_wUZE3W2P32_position"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  //className="m-margin-up-down"
                >
                  <Grid item xs={1} />
                  <Grid item xs={4}>
                    <label
                      class="input_label"
                      for="__w2_wUZE3W2P32_position"
                      id="__w2_wUZE3W2P32_label"
                      // style={{ fontWeight: "bold" }}
                    >
                      Concentration II
                    </label>
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      class="text input_field"
                      type="text"
                      placeholder="Minor"
                      required="False"
                      value={this.state.secondaryConcentration}
                      onChange={this.onChange}
                      name="secondaryConcentration"
                      maxlength="50"
                      data-group="js-editable"
                      w2cid="wUZE3W2P32"
                      id="__w2_wUZE3W2P32_position"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  //className="m-margin-up-down"
                >
                  <Grid item xs={1} />
                  <Grid item xs={4}>
                    <label
                      class="input_label"
                      for="__w2_wUZE3W2P32_position"
                      id="__w2_wUZE3W2P32_label"
                      // style={{ fontWeight: "bold" }}
                    >
                      Degree type
                    </label>
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      class="date input_field"
                      type="text"
                      placeholder="MS"
                      required="False"
                      value={this.state.degreeType}
                      onChange={this.onChange}
                      name="degreeType"
                      maxlength="50"
                      data-group="js-editable"
                      w2cid="wUZE3W2P32"
                      id="__w2_wUZE3W2P32_position"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    //className="m-margin-up-down"
                  >
                    <Grid item xs={1} />
                    <Grid item xs={4}>
                      <label
                        class="input_label"
                        for="__w2_wUZE3W2P32_position"
                        id="__w2_wUZE3W2P32_label"
                        // style={{ fontWeight: "bold" }}
                      >
                        Graduation year
                      </label>
                    </Grid>
                    <Grid item xs={7}>
                      <input
                        class="date input_field"
                        type="date"
                        placeholder="123456789"
                        required="False"
                        value={this.state.graduationYear}
                        onChange={this.onChange}
                        name="graduationYear"
                        maxlength="50"
                        data-group="js-editable"
                        w2cid="wUZE3W2P32"
                        id="__w2_wUZE3W2P32_position"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    //className="m-margin-up-down"
                  >
                    <Grid item xs={1} />
                    <Grid item xs={4}>
                      <label
                        class="input_label"
                        for="__w2_wUZE3W2P32_position"
                        id="__w2_wUZE3W2P32_label"
                        // style={{ fontWeight: "bold" }}
                      >
                        Current
                      </label>
                    </Grid>
                    <Grid item xs={7}>
                      <input
                        class="checkbox input_field"
                        type="checkbox"
                        placeholder="123456789"
                        required="False"
                        maxlength="50"
                        data-group="js-editable"
                        value={this.state.current}
                        checked={this.state.current}
                        onChange={this.handleChange("current")}
                        name="current"
                        w2cid="wUZE3W2P32"
                        id="__w2_wUZE3W2P32_position"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogEducation.propTypes = {
  classes: PropTypes.object.isRequired,
  userDetails: PropTypes.object,
  setProfileEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  state: state.homeState,
  userDetails: state.userDetails
});

export default connect(
  mapStateToProps,
  { setProfileEducation }
)(withStyles(styles)(withRouter(DialogEducation)));
