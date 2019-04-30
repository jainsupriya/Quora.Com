import React, { Component } from "react";
import { createRef } from "react";
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
import Dropzone from "react-dropzone";

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
class DialogPhoto extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onDrop = () => {
    // // POST to a test endpoint for demo purposes
    // const req = request.post("https://httpbin.org/post");
    // files.forEach(file => {
    //   req.attach(file.name, file);
  };

  updateImage = event => {
    const file = event.target.files[0];
    console.log(file);

    const fd = new FormData();
    // fd.append("profileImg", this.state.selectedFile, this.state.selectedFile.name);

    fd.append("profileImg", file, file.name);

    this.props.updateImage(fd);
  };

  render() {
    const { classes } = this.props;
    const dropzoneRef = createRef();

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
            Edit profile Photo
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
                    <Dropzone ref={dropzoneRef}>
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input
                            {...getInputProps()}
                            style={{ width: "100%" }}
                            onChange={this.updateImage}
                            ref={fileInput => (this.fileInput = fileInput)}
                          />
                          <p>
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                        </div>
                      )}
                    </Dropzone>

                    {/* <input
                      type="file"
                      onChange={this.updateImage}
                      ref={fileInput => (this.fileInput = fileInput)}
                    /> */}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.updateImage} color="primary">
              Add Photo
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogPhoto.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(withRouter(DialogPhoto)));
