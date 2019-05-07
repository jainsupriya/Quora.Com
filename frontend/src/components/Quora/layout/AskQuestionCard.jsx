import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import "../../../styles/home.css";
import Grid from "@material-ui/core/Grid";

export function AskQuestionCard(props) {
  const { user } = props;
  return (
    <div className="AskQuestionPromptBundle">
      <div class="AddQuestionPrompt">
        <div class="user_asks_header">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={1}>
              <Link to="/myprofile">
                <Avatar
                  alt={user !== undefined ? user.fname : ""}
                  src={user !== undefined ? user.profileImg : ""}
                  style={{ width: 50, height: 50 }}
                  className="avatar"
                />
              </Link>
            </Grid>

            <Grid
              item
              xs={11}
              direction="column-reverse"
              alignContent="flex-end"
            >
              <div style={{ marginTop: "12px" }}>
                <Link class="user" to="/myprofile">
                  <h1>{user !== undefined ? user.fname : " "} { user !== undefined ? user.lname:" "}</h1>
                </Link>
              </div>
            </Grid>
          </Grid>
        </div>

        <Link class="AskQuestionButton" onClick={props.handleClickOpen} to="">
          What is your question or link?
        </Link>
      </div>
    </div>
  );
}
