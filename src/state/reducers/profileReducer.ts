import axios from "axios";
import { ProfileUpdateType } from "../action-types";
import { ProfileAction } from "../actions";
import mongoose from "mongoose";

const initProfileState = {
  picUrl: "initPic",
  name: "initName",
  email: "initEmail",
  phone: "initPhone",
};
let initProfileArrState: ProfileArrayState = [
  // {
  //   _id: "init id 1",
  //   picUrl: "initPic",
  //   name: "initName",
  //   email: "initEmail",
  //   phone: "initPhone",
  // },
  // {
  //   _id: "init id 2",
  //   picUrl: "initPic2",
  //   name: "initName2",
  //   email: "initEmail2",
  //   phone: "initPhone2",
  // },
  // {
  //   _id: "init id 3",
  //   picUrl: "initPic3",
  //   name: "initName3",
  //   email: "initEmail3",
  //   phone: "initPhone3",
  // },
];

const initState = axios
  .create({ baseURL: "http://localhost:9090" })
  .get("/profiles/get")
  .then((res) => res.data.profiles)
  .then((res) => {
    // console.log(res);
    initProfileArrState = res;
  })
  .catch((e) => console.log(e));

export type ProfileState = {
  _id: string;
  picUrl: string;
  name: string;
  email: string;
  phone: string;
};

export type ProfileArrayState = Array<ProfileState>;

const reducer = (
  profileState: ProfileArrayState = initProfileArrState,
  action: ProfileAction
) => {
  let tempState = { ...profileState };
  switch (action.type) {
    case ProfileUpdateType.UPDATE:
      // console.log(action.payload);
      console.log(profileState);
      const newObj = {
        ...action.payload,
      };
      return [...profileState, newObj];
    case ProfileUpdateType.RESET:
      // reset profile to data from database
      console.log("profile array has been reset");
      return [...action.payload];

    default:
      return profileState;
  }
};

export default reducer;
