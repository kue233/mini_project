import { Button } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import {
  ProfileState,
  ProfileArrayState,
} from "../../../state/reducers/profileReducer";
import "./ProfileCard.css";
import axiosInstance from "../../Config/config";
import { useSelector } from "react-redux";
import { actionCreators, State } from "../../../state";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

export default function ProfileCard({
  _id,
  picUrl,
  name,
  email,
  phone,
}: ProfileState) {
  const [valid, setValid] = useState(true);
  const profile = useSelector((state: State) => state.profile);
  const target = profile.filter((prof) => prof["_id"] === _id);
  const [card, setCard] = useState<ProfileState>(target[0]);
  const profileArr = useSelector((state: State) => state.profile);
  const dispatch = useDispatch();
  const { profileReset } = bindActionCreators(actionCreators, dispatch);
  /** image */
  const [updateImg, setUpdateImg] = useState<File | null>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [oldImgUrl, setOldImgUrl] = useState<string>(picUrl);

  useEffect(() => {
    return () => setValid(true);
  }, []);

  const UpdateHandler = async () => {
    const { picUrl, name, email, phone } = card;

    // compare updating image url if the same as the old one
    // delete old img
    console.log(`updating, the deleting one is: ${picUrl.split("/")[3]}`);
    await axiosInstance
      .delete(`/profiles/s3delete/${oldImgUrl.split("/")[3]}`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));

    // image to AWS S3
    if (updateImg) {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axiosInstance.put(imgUrl, updateImg, config);
    }

    await axiosInstance
      .patch(`/profiles/update/${_id}`, {
        picUrl,
        name,
        email,
        phone,
      })
      .then((res) => {
        console.log(res);
        alert("update success!");
      })
      .catch((e) => {
        console.log(e);
        setCard(target[0]);
        alert(e.response.data.error.details[0]["message"]);
      });

    // refresh profile array
    await axiosInstance
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

    // close edit window
    setValid(!valid);
  };

  const DeleteHandler = async () => {
    setValid(true);
    await axiosInstance
      .delete(`/profiles/delete/${_id}`)
      .then((res) => console.log(res))
      .then((res) => alert("deletion completed"))
      .catch((e) => {
        console.log("delete Error!");
        console.log(e);
      });
    await axiosInstance
      .get("/profiles/get")
      .then((res) => res.data.profiles)
      .then((res) => {
        // console.log(res);
        // setProfileArr(res);
        let arr: ProfileArrayState = [];
        res.forEach((elem: any) => {
          const { _id, picUrl, name, email, phone } = elem;
          arr.push({ _id, picUrl, name, email, phone });
        });
        // save it for updating image and deletion

        profileReset(arr);
      })
      .catch((e) => console.log(e));

    // delete url from s3
    console.log(`picUrl.split("/")[3]: ${picUrl.split("/")[3]}`);
    await axiosInstance
      .delete(`/profiles/s3delete/${picUrl.split("/")[3]}`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  /** updated image */
  const imageStoreHandler = async (files: FileList | null) => {
    if (files) {
      setUpdateImg(files[0]);
    }
    const { url } = await axiosInstance
      .get<string>("profiles/s3Url")
      .then((res: any) => {
        return res.data;
      })
      .catch((e) => console.log(e));

    // reset pic url in card
    let newCard = { ...card };
    newCard["picUrl"] = url.split("?")[0];
    setCard(newCard);
    // this url is to upload image
    setImgUrl(url);
  };

  return valid === true ? (
    <div id="cardBG">
      <table>
        <tbody>
          <tr>
            <th>pic</th>
            <td>
              <img className="cardImg" src={picUrl}></img>
            </td>
          </tr>
          <tr>
            <th>name</th>
            <td>{name}</td>
          </tr>
          <tr>
            <th>email</th>
            <td>{email}</td>
          </tr>
          <tr>
            <th>phone</th>
            <td>{phone}</td>
          </tr>
        </tbody>
      </table>
      <Button
        onClick={() => setValid(!valid)}
        variant="contained"
        sx={{ m: 2, width: 90, alignSelf: "flex-end" }}
        className="submitBtn"
      >
        Edit
      </Button>
    </div>
  ) : (
    <div id="cardBG">
      <table>
        <tbody>
          <tr>
            <th>pic</th>
            <td>
              <input
                onChange={(e) => {
                  const newPicUrl = e.target.value;
                  let newCard = { ...card };
                  newCard["picUrl"] = newPicUrl;
                  setCard(newCard);
                }}
                type="text"
                defaultValue={picUrl}
                readOnly
              ></input>
              <input
                className="imgInput"
                onChange={(e) => imageStoreHandler(e.target.files)}
                type="file"
                accept="image/*"
              ></input>
            </td>
          </tr>
          <tr>
            <th>name</th>
            <td>
              <input
                onChange={(e) => {
                  const newPicUrl = e.target.value;
                  let newCard = { ...card };
                  newCard["name"] = newPicUrl;
                  setCard(newCard);
                }}
                type="text"
                defaultValue={name}
              ></input>
            </td>
          </tr>
          <tr>
            <th>email</th>
            <td>
              <input
                onChange={(e) => {
                  const newPicUrl = e.target.value;
                  let newCard = { ...card };
                  newCard["email"] = newPicUrl;
                  setCard(newCard);
                }}
                type="text"
                defaultValue={email}
              ></input>
            </td>
          </tr>
          <tr>
            <th>phone</th>
            <td>
              <input
                onChange={(e) => {
                  const newPicUrl = e.target.value;
                  let newCard = { ...card };
                  newCard["phone"] = newPicUrl;
                  setCard(newCard);
                }}
                type="text"
                defaultValue={phone}
              ></input>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <Button
          onClick={() => setValid(!valid)}
          variant="contained"
          sx={{ m: 2, width: 90, alignSelf: "flex-end" }}
          className="submitBtn"
        >
          Cancel
        </Button>
        <Button
          onClick={UpdateHandler}
          variant="contained"
          sx={{ m: 2, width: 90, alignSelf: "flex-end" }}
          className="submitBtn"
        >
          Finish
        </Button>
        <Button
          onClick={DeleteHandler}
          variant="contained"
          sx={{ m: 2, width: 90, alignSelf: "flex-end" }}
          className="submitBtn"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
