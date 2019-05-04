import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import "../../../styles/home.css";

export function AskQuestionCard(props) {
  const { user } = props;
  return (
    <div className="AskQuestionPromptBundle">
      <div class="AddQuestionPrompt">
        <div class="user_asks_header">
          <Link to="/myprofile">
            <Avatar
              alt={user.fname}
              src={user.profileImg}
              style={{ width: 50, height: 50 }}
              className="avatar"
            />
          </Link>

          <Link class="user" to="/profile/Priyanka-Singhal">
            {user.fname + " " + user.lname}
          </Link>
        </div>
        <Link class="AskQuestionButton" onClick={props.handleClickOpen} to="">
          What is your question or link?
        </Link>
      </div>
    </div>
  );
}
