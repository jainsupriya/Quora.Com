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
import SimpleReactValidator from "simple-react-validator";
import { setProfilePersonal } from "../../../redux/actions/profileActions";

const styles = theme => ({
  selector_input: {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    zIndex: 1,
    paddingRight: "23px"
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

//Create a Main Component
class DialogPersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      dob: "",
      aboutMe: "",
      gender: "",
      city: "",
      state: "",
      zipCode: ""
    };
    this.onChange = this.onChange.bind(this);
    this.validator = new SimpleReactValidator({
      validators: {
        zipCode: {
          message: "Zipcode is not valid",
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(
              val,
              /(^\d{5}$)|(^\d{5}-\d{4}$)/
            );
          }
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      mobile:
        nextProps.state.userDetails.mobile !== undefined
          ? nextProps.state.userDetails.mobile
          : "",
      dob:
        nextProps.state.userDetails.dob !== undefined
          ? nextProps.state.userDetails.dob
          : "",
      aboutMe:
        nextProps.state.userDetails.aboutMe !== undefined
          ? nextProps.state.userDetails.aboutMe
          : "",
      gender:
        nextProps.state.userDetails.gender !== undefined
          ? nextProps.state.userDetails.gender
          : "",
      city:
        nextProps.state.userDetails.city !== undefined
          ? nextProps.state.userDetails.city
          : "",
      state:
        nextProps.state.userDetails.state !== undefined
          ? nextProps.state.userDetails.state
          : "",
      zipCode:
        nextProps.state.userDetails.zipCode !== undefined
          ? nextProps.state.userDetails.zipCode
          : ""
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSave = e => {
    e.preventDefault();
    if (this.validator.allValid()) {
      // console.log(this.props.state.userDetails._id);
      const profileData = {
        mobile: this.state.mobile,
        dob: this.state.dob,
        aboutMe: this.state.aboutMe,
        gender: this.state.gender,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipCode
      };
      console.log(profileData);
      console.log(this.props.state.userDetails._id);

      this.props.setProfilePersonal(
        this.props.state.userDetails._id,
        profileData
      );
      this.props.onClose();
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  render() {
    const { classes } = this.props;
    console.log(this.props);
    // const userDetails

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
                    <div class="title">Add Personal Details</div>
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
                      Mobile
                    </label>
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      class="text input_field"
                      type="text"
                      placeholder="123456789"
                      value={this.state.mobile}
                      onChange={this.onChange}
                      name="mobile"
                      required="False"
                      maxlength="50"
                      data-group="js-editable"
                      w2cid="wUZE3W2P32"
                      id="__w2_wUZE3W2P32_position"
                      style={{ width: "100%" }}
                    />
                    {this.validator.message(
                      "mobile",
                      this.state.mobile,
                      "numeric|size:10"
                    )}
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
                      Date of birth
                    </label>
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      class="date input_field"
                      type="date"
                      placeholder="123456789"
                      value={this.state.dob}
                      onChange={this.onChange}
                      name="dob"
                      required="False"
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
                      About me
                    </label>
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      class="text input_field"
                      type="text"
                      placeholder="Write about yourself"
                      value={this.state.aboutMe}
                      onChange={this.onChange}
                      name="aboutMe"
                      required="False"
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
                      Gender
                    </label>
                  </Grid>
                  <Grid item xs={7}>
                    <select
                      class="text input_field"
                      type="text"
                      placeholder="Male/Female"
                      required="False"
                      value={this.state.gender}
                      onChange={this.onChange}
                      name="gender"
                      maxlength="50"
                      data-group="js-editable"
                      w2cid="wUZE3W2P32"
                      id="__w2_wUZE3W2P32_position"
                      style={{ width: "100%" }}
                    >
                      <option value="female">Female</option>
                      <option value="Male">Male</option>
                    </select>
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
                      City
                    </label>
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      class="text input_field"
                      type="text"
                      placeholder="City"
                      required="False"
                      value={this.state.city}
                      onChange={this.onChange}
                      name="city"
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
                      State
                    </label>
                  </Grid>
                  <Grid item xs={7}>
                    <select
                      class="text input_field"
                      type="text"
                      placeholder="State"
                      required="False"
                      value={this.state.state}
                      onChange={this.onChange}
                      name="state"
                      maxlength="50"
                      data-group="js-editable"
                      w2cid="wUZE3W2P32"
                      id="__w2_wUZE3W2P32_position"
                      style={{ width: "100%", height: "50%" }}
                    >
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
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
                      Zip code
                    </label>
                  </Grid>
                  <Grid item xs={7}>
                    <input
                      class="text input_field"
                      type="text"
                      placeholder="xxxx-xxxx or xxxx"
                      value={this.state.zipCode}
                      onChange={this.onChange}
                      name="zipCode"
                      required="False"
                      maxlength="50"
                      data-group="js-editable"
                      w2cid="wUZE3W2P32"
                      id="__w2_wUZE3W2P32_position"
                      style={{ width: "100%" }}
                    />
                    {this.validator.message(
                      "zipCode",
                      this.state.zipCode,
                      "zipCode"
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="secondary">
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

DialogPersonal.propTypes = {
  classes: PropTypes.object.isRequired,
  setProfilePersonal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  state: state.homeState,
  userDetails: state.userDetails
});

export default connect(
  mapStateToProps,
  { setProfilePersonal }
)(withStyles(styles)(withRouter(DialogPersonal)));
