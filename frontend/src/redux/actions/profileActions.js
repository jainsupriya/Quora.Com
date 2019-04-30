import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

// Get current profile
export const setProfileCredential = (id, profileData) => dispatch => {
  axios
    .put(`/user/${id}`, profileData)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
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

// set profile name
export const setProfileName = (id, profileData) => dispatch => {
  console.log(id);
  console.log(profileData);
  axios
    .put(`/user/${id}`, profileData)
    .then(res =>
      dispatch({
        type: SET_CURRENT_USER,
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

export const updateImage = fd => dispatch => {
  axios.post("/file/uploadProfileImage", fd).then(res => {
    console.log(res.data);
  });
};

// get profile
export const getCurrentProfile = id => dispatch => {
  console.log(id);
  axios
    .get(`/user/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
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
