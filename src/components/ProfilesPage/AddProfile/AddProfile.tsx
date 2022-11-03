import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ProfileArrayState } from "../../../state/reducers/profileReducer";
import ReInputField from "./ReInputField";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../../state";
import axiosInstance from "../../Config/config";
import "./AddProfile.css";

type Props = {
  formData: ProfileArrayState;
  setFormData: Function;
};

const AddProfile = (props: Props) => {
  const [formData, setFormData] = useState({
    picUrl: "testpic",
    name: "",
    email: "",
    phone: "",
  });
  /** image state */
  const [imageStore, setImageStore] = useState<File | null>();
  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => {
    // console.log(imageStore);
  }, [imageStore]);

  /** valid handlers */
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  /** redux */
  const dispatch = useDispatch();
  const { profileUpdate, profileReset } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const profile = useSelector((state: State) => state.profile);

  useEffect(() => {
    console.log(formData);
    // props.setFormData([formData]);

    // verify phone and email input bars
    const phoneRe = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    // console.log(phoneRe.test(formData.phone));
    formData.phone != "" && setPhoneValid(phoneRe.test(formData.phone));
    const emailRe = /[\w]+@[\w]+\.[\w]+/;
    formData.email != "" && setEmailValid(emailRe.test(formData.email));
  }, [formData]);

  /** submit button handler */
  const submitHandler = async () => {
    // image to AWS S3; update url to Mongo DB
    if (
      (phoneValid && emailValid) ||
      (formData["email"] === "" && formData["phone"] === "")
    )
      if (imageStore && imageUrl != "") {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        await axiosInstance.put(imageUrl, imageStore, config);
      } else {
        alert("no image is selected yet!");
        console.log("no image is selected yet!");
        return;
      }
    else {
      alert("phone and email is not valid!");
      console.log("phone and email is not valid!!");
      return;
    }

    // update local profile array (picUrl) first
    const picUrl = formData["picUrl"];
    console.log("test:---" + picUrl);
    const name = formData["name"];
    const email = formData["email"];
    const phone = formData["phone"];
    // mongoose
    await axiosInstance
      .post("/profiles/create", { picUrl, name, email, phone })
      .then((res) => {
        console.log(res.data["prof"]["_id"]);
        return res;
      })
      .then((res: any) => {
        // update redux everytime updating MongoDB
        profileUpdate(res.data["prof"]["_id"], picUrl, name, email, phone);
        alert("create success!");
      })
      .catch((e) => {
        console.log("profile form update ERROR!");
        console.log(e.response.data.error.details[0].message);
        alert(e.response.data.error.details[0].message);
        console.log(e);
        return;
      });

    // refresh profile Array
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

        profileReset(arr);
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  const imageStoreHandler = async (files: FileList | null) => {
    if (files) {
      console.log(files[0]);
      setImageStore(files[0]);
    }
    const { url } = await axiosInstance
      .get<string>("/profiles/s3Url")
      .then((res: any) => {
        console.log(res.data);
        return res.data;
      })
      .catch((e) => console.log(e));
    console.log(url.split("?")[0]);

    // update to local profile array and mongo DB
    formUpdatePicHandler(url.split("?")[0]); // this partial url is to get image
    setImageUrl(url); // this url is to upload image
  };

  const formUpdatePicHandler = (picValue: string) => {
    let tempFormData = { ...formData };
    tempFormData.picUrl = picValue;
    setFormData(tempFormData);
  };
  const formUpdateNameHandler = (nameValue: string) => {
    let tempFormData = { ...formData };
    tempFormData.name = nameValue;
    setFormData(tempFormData);
  };
  const formUpdateEmailHandler = (emailValue: string) => {
    let tempFormData = { ...formData };
    tempFormData.email = emailValue;
    setFormData(tempFormData);
  };
  const formUpdatePhoneHandler = (phoneValue: string) => {
    let tempFormData = { ...formData };
    tempFormData.phone = phoneValue;
    setFormData(tempFormData);
  };

  return (
    <div className="innerAddProfile">
      <table>
        <tbody>
          <tr>
            <th>pic</th>
            <td>
              <input
                className="imgInput"
                onChange={(e) => imageStoreHandler(e.target.files)}
                type="file"
                accept="image/*"
              ></input>
            </td>
            <td></td>
          </tr>
          <tr>
            <th>name</th>
            <td>
              <ReInputField
                id="name"
                type="string"
                name="name"
                value="xxx"
                valid={true}
                onChangeHandler={formUpdateNameHandler}
              ></ReInputField>
            </td>
            <td></td>
          </tr>
          <tr>
            <th>email</th>
            <td>
              <ReInputField
                id="email"
                type="string"
                name="email"
                value="xxx@xxx.xxx"
                valid={emailValid}
                onChangeHandler={formUpdateEmailHandler}
              ></ReInputField>
            </td>
            <td>
              <p className="hoverIcon">
                *
                <span className="hoverContent">
                  a email must has "@" and domain name like "gmail.com"
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <th>phone</th>
            <td>
              <ReInputField
                id="phone"
                type="string"
                name="phone"
                value="xxx-xxx-xxxx"
                valid={phoneValid}
                onChangeHandler={formUpdatePhoneHandler}
              ></ReInputField>
            </td>
            <td>
              <p className="hoverIcon">
                *
                <span className="hoverContent">
                  phone number format:
                  <br /> 123-123-1234
                  <br /> (123) 123-1234
                  <br /> 123 123 1234
                </span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <Button
        onClick={() => submitHandler()}
        variant="contained"
        sx={{ m: 2, width: 90, alignSelf: "flex-end" }}
        className="submitBtn"
      >
        submit
      </Button>
    </div>
  );
};

export default AddProfile;
