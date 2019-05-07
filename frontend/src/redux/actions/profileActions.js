import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_USER_DETAILS,
  GET_USER_DETAILS,
  GET_FOLLOWER,
  GET_FOLLOWING,
  GET_FOLLOWED_QUESTION,
  GET_USER_ANSWER,
  GET_ASKED_QUESTION,
  GET_USER_DETAILS_NAVBAR
} from "./types";

import { getUserDetailsOnly } from "./homeAction";

// set profile name
export const setProfileName = (id, profileData) => dispatch => {
  //const id= ${id}
  console.log(id);
  console.log(profileData);
  axios
    .put(`/user/${id}`, profileData)
    .then(res => {
     // getUserDetailsOnly(id);
      dispatch({
        type: GET_USER_DETAILS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// set profile name
export const setProfileCredential = (userId, profiledata) => dispatch => {
  axios
    .put(`/user/${userId}`, profiledata)
    .then(res => {
     // getUserDetailsOnly(userId);
      dispatch({
        type: GET_USER_DETAILS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// set profile education
export const setProfileEducation = (userId, profiledata) => dispatch => {
  axios
    .put(`/user/${userId}`, profiledata)
    .then(res => {
      dispatch({
        type: GET_USER_DETAILS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// set profile education
export const setProfileEmployment = (userId, profiledata) => dispatch => {
  axios
    .put(`/user/${userId}`, profiledata)
    .then(res => {
      dispatch({
        type: GET_USER_DETAILS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// set profile personal
export const setProfilePersonal = (userId, profiledata) => dispatch => {
  axios
    .put(`/user/${userId}`, profiledata)
    .then(res => {
      dispatch({
        type: GET_USER_DETAILS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// set profile name
export const getProfileByUserId = userId => dispatch => {
  axios
    .get(`/user/${userId}`)
    .then(res => {
      //console.log(res)
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// set profile name
export const getFollowedQuestion = userId => dispatch => {
  axios
    .get(`/activity/byUserId/${userId}/onlyFollowQuestions`)
    .then(res => {
      //console.log(res)
      dispatch({
        type: GET_FOLLOWED_QUESTION,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// set profile name
export const getAskedQuestion = userId => dispatch => {
  axios
    .get(`/activity/byUserId/${userId}/onlyQuestions`)
    .then(res => {
      //console.log(res)
      dispatch({
        type: GET_ASKED_QUESTION,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// set profile name
export const getUserAnswer = userId => dispatch => {
  axios
    .get(`/activity/byUserId/${userId}/onlyAnswers`)
    .then(res => {
      //console.log(res)
      dispatch({
        type: GET_USER_ANSWER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// GET FOLLOWERS
export const getFollowers = userId => dispatch => {
  axios
    .get(`/userWith/FollowersUserList/${userId}`)
    .then(res => {
      dispatch({
        type: GET_FOLLOWER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// GET FOLLOWERS
export const getFollowing = userId => dispatch => {
  axios
    .get(`/userWith/FollowingUserList/${userId}`)
    .then(res => {
      dispatch({
        type: GET_FOLLOWING,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// set profile name
export const setFollower = (userId, followerId) => dispatch => {
  axios
    .put(`/user/followUser/${userId}/${followerId}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// set profile name
export const removeFollower = (userId, followerId) => dispatch => {
  axios
    .put(`/user/unFollowUser/${userId}/${followerId}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const updateImage = (fd, history) => dispatch => {
  axios.put("/file/updateProfileImg", fd).then(res => {
    // console.log(res.data._id)
    getUserDetailsOnly(res.data._id);
    // axios
    // .get(`/user/${res.data._id}`)
    // .then(res1 => {
    //   console.log("ruchika here");

    //   var data = res1.data;
    //   console.log(data);
    //   dispatch({
    //     type: GET_USER_DETAILS_NAVBAR,
    //     payload: data
    //   });
    // })
    // .catch(err =>
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err !== undefined && err.data !== undefined ? err.data : {}
    //   })
    // );
    dispatch({
      type: SET_USER_DETAILS,
      payload: res.data
    });
    //history.push("/profile");
  });
};

// get profile
export const getCurrentProfile = id => dispatch => {
  console.log(id);
  axios
    .get(`/user/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER_DETAILS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// export const updateUserImage = e => dispatch => {
//   let userState = store.getState().userState;
//   if (e.target.files.length === 1) {
//     console.log(e.target.files);
//     let img = e.target.files[0];
//     var ext = img.name.substr(img.name.lastIndexOf("."));
//     let filename = "profileImageOf" + userState.userId + ext;
//     let fd = new FormData();
//     fd.append("file", e.target.files[0]);
//     fd.append("filename", filename);
//     fd.append("userId", userState.userId ? userState.userId : "");
//     axios.post("/file/uploadProfileImage", fd).then(res => {
//       // console.log(res.data)
//       let temp = [].concat(res.data);
//       if (temp[0]["msg"] === "Success") {
//         dispatch({
//           type: SET_USER_IMG,
//           payload: Date.now()
//         });
//       }
//     });
//   }
// console.log("called")
// let userState = store.getState().userState;
// console.log(userState.userId)
// axios
//     .get("user/"+userState.userId)
//     .then(res => {
//         if (res.data.msg === "Success") {
//             console.log(res.data)
//             dispatch({
//                 type: SET_USER_DATA,
//                 payload: res.data.data
//             });
//         }
//     })
//     .catch(err => {
//         console.log(err);
//     });
//};
