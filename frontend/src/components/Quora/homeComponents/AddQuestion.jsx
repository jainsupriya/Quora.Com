import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import SimpleReactValidator from "simple-react-validator";

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

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      question: ""
    };
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    this.setState({
      topic: "",
      question: ""
    });
  }

  handleAddQuestion() {
    if (this.validator.allValid()) {
      this.props.handleAddQuestion(this.state.question, this.state.topic);
      this.setState({
        topic: "",
        question: ""
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div>
        <Dialog
          fullWidth
          onClose={this.props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.openAddQuestion}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.props.handleClose}
          >
            <span style={{ color: "#bc3531" }}> Add Question</span>
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              Tips on getting good answers quickly
              <br />
              <br />
              <li>Make sure your question hasn't been asked already</li>
              <br />
              <li>Keep your question short and to the point</li>
              <br />
              <li>Double-check grammar and spelling</li>
              <br />
            </Typography>
            <Divider />
            <Grid
              container
              direction="column"
              justify="space-between"
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
                  <Avatar alt="Remy Sharp" src="1.jpg" className="avatar" />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    className="m-margin-up-down"
                  >
                    <Grid item className="black-clr">
                      {"Mayank Padshala Asked"}
                    </Grid>
                    {/* <Grid item className="fnt-13">
                                            {"Answered 7H ago"}
                                        </Grid> */}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={9}>
                <textarea
                  class="selector_input"
                  type="text"
                  rows="1"
                  name="question"
                  title='Start your question with "What", "How", "Why", etc.'
                  data-group="js-editable"
                  placeholder='Start your question with "What", "How", "Why", etc.'
                  w2cid="wHEAXKDm8"
                  id="__w2_wHEAXKDm8_input"
                  onChange={e => this.handleOnChange(e)}
                  required
                />
                <span className="error">
                  {this.validator.message(
                    "question",
                    this.state.question,
                    "required|max:200"
                  )}
                </span>
              </Grid>

              <Grid item xs={9}>
                <textarea
                  class="selector_input"
                  type="text"
                  name="topic"
                  rows="1"
                  title="Enter your topic here."
                  data-group="js-editable"
                  placeholder="Enter your topic here."
                  w2cid="wHEAXKDm8"
                  id="__w2_wHEAXKDm8_input"
                  onChange={e => this.handleOnChange(e)}
                />
                <span className="error">
                  {this.validator.message(
                    "topic",
                    this.state.topic,
                    "required|max:200"
                  )}
                </span>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={() => this.handleAddQuestion()} color="primary">
              Add Question
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddQuestion;
