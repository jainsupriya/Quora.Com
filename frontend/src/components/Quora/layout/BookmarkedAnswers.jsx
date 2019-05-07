import React from "react";
// import "../styles/home.css";
import "../../../styles/questionCard.css";
import Parser from "html-react-parser";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import axios from "axios";

import { Link } from "react-router-dom";
import AnswerCard from "../AnswerComponent/AnswerCard";
const styles = theme => ({});

class BookmarkedAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerList: []
    };
  }

  componentDidMount() {
    axios
      .get(`/userWith/BookmarkAnswerList/${this.props.userId}`)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            answerList: response.data[0].bookmarkedAnswerList
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    var comp = "";

    if (this.state.answerList !== undefined && this.state.answerList.length) {
      comp = this.state.answerList.map(answer => {
        return (
          <div>
            <Paper elevation={2} className="m-padding-10">
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                // className="m-margin-up-down"
              >
                <Grid item>
                  <span className="reason-txt">
                    Answer · Recommended for you
                  </span>
                </Grid>
                <Grid item>
                  <Link
                    to={"/" + answer.questionId._id}
                    style={{ color: "#000000" }}
                  >
                    <span className="question-txt">
                      <Typography variant="title">
                        {answer.questionId.question}
                      </Typography>
                    </span>
                  </Link>
                </Grid>

                <React.Fragment>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Avatar
                        alt={"Anonymous User"}
                        src={""}
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
                      >
                        <Grid item className="black-clr" />
                        <Grid item className="fnt-13">
                          {"Answered"}{" "}
                          {moment(
                            new Date(answer.postedTime),
                            "MMMM Do YYYY, h:mm:ss a"
                          ).fromNow()}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item className="ans-main-content">
                    {!this.state.readMore && (
                      <Typography
                        variant="subtitle"
                        style={{
                          height: 30,
                          maxWidth: 750,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}
                        onClick={() => this.readMoreText()}
                      >
                        {answer.answer !== undefined
                          ? Parser(answer.answer)
                          : ""}
                      </Typography>
                    )}
                    {this.state.readMore && (
                      <Typography
                        variant="subtitle1"
                        onClick={() => this.readMoreTextClose()}
                      >
                        {answer.answer !== undefined
                          ? Parser(answer.answer)
                          : ""}
                      </Typography>
                    )}
                  </Grid>
                </React.Fragment>
              </Grid>
            </Paper>
          </div>
        );
      });
    } else {
      comp = <React.Fragment>No Bookmarked Answers to show</React.Fragment>;
    }

    return <React.Fragment>{comp}</React.Fragment>;
  }
}

export default withStyles(styles)(BookmarkedAnswers);
