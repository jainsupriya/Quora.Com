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
class DialogProfileCredential extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { classes } = this.props;

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
                          stroke-width="1.5"
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

DialogProfileCredential.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(withRouter(DialogProfileCredential)));
