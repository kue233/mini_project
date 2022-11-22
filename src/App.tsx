import React, { useState, useEffect } from "react";
import AddProfile from "./components/ProfilesPage/AddProfile/AddProfile";
import ProfileCard from "./components/ProfilesPage/ProfileList/ProfileCard";
import axiosInstance from "./components/Config/config";

// redux
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "./state";

import "./App.css";
import {
  ProfileArrayState,
  ProfileState,
} from "./state/reducers/profileReducer";

function App() {
  const testObj = {
    _id: "init id ",
    picUrl: "test pic",
    name: "test name",
    email: "test mail",
    phone: "test phone",
  };

  const dispatch = useDispatch();

  const { profileReset } = bindActionCreators(actionCreators, dispatch);
  const amount = useSelector((state: State) => state.bank);
  const profile = useSelector((state: State) => state.profile);
  const [formData, setFormData] = useState<ProfileArrayState>([testObj]);

  // initial
  useEffect(() => {
    // load data from DB to redux
    axiosInstance
      .get("/profiles/get")
      .then((res) => res.data.profiles)
      .then((res) => {
        let arr: ProfileArrayState = [];
        res.forEach((elem: any) => {
          const { _id, picUrl, name, email, phone } = elem;
          arr.push({ _id, picUrl, name, email, phone });
        });

        profileReset(arr);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <div className="profilePage item">
        <div className="addProfile">
          <h1>Add Profiles</h1>
          <AddProfile
            formData={formData}
            setFormData={setFormData}
          ></AddProfile>
        </div>
        <div className="profileList item">
          <h1>Profile List</h1>
          {profile &&
            profile.map((profile: ProfileState, i: number) => {
              return <ProfileCard key={i} {...profile}></ProfileCard>;
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
