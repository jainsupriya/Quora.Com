import React from "react";
import { Link } from "react-router-dom";

import "../../../styles/home.css";

export function AskQuestionCard(props) {
  return (
    <div className="AskQuestionPromptBundle">
      <div class="AddQuestionPrompt">
        <div class="user_asks_header">
          <Link to="/profile/Priyanka-Singhal">
            <img
              class="profile_photo_img"
              src="https://qph.fs.quoracdn.net/main-thumb-7495420-50-g6xfVphXjY8bvg7XgdLs5X7nuOHig1Lt.jpeg"
              alt="Priyanka Singhal"
              height="50"
              width="50"
            />
          </Link>

          <Link class="user" to="/profile/Priyanka-Singhal">
            Priyanka Singhal
          </Link>
        </div>
        <Link class="AskQuestionButton" onClick={props.handleClickOpen} to="">
          What is your question or link?
        </Link>
      </div>
    </div>
  );
}
