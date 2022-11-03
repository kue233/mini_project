import { ActionType, ProfileUpdateType } from "../action-types";
import { Dispatch } from "redux";
import { Action, ProfileAction } from "../actions/index";
import { ProfileArrayState } from "../reducers/profileReducer";
import { profile } from "console";
export const depositMoney = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DEPOSIT,
      payload: amount,
    });
  };
};
export const withdrawMoney = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.WITHDRAW,
      payload: amount,
    });
  };
};
export const bankruptMoney = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.BANKRUPT,
    });
  };
};

// profile actions dispatch
export const profileUpdate = (
  _id: string,
  picUrl: string,
  name: string,
  email: string,
  phone: string
) => {
  return (dispatch: Dispatch<ProfileAction>) => {
    dispatch({
      type: ProfileUpdateType.UPDATE,
      payload: {
        _id,
        picUrl,
        name,
        email,
        phone,
      },
    });
  };
};

export const profileReset = (profileArr: ProfileArrayState) => {
  return (dispatch: Dispatch<ProfileAction>) => {
    dispatch({
      type: ProfileUpdateType.RESET,
      payload: profileArr,
    });
  };
};

export const profileUpdatePic = (picUrl: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileUpdateType.UPDATEPIC,
      payload: picUrl,
    });
  };
};
export const profileUpdateName = (name: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileUpdateType.UPDATENAME,
      payload: name,
    });
  };
};
export const profileUpdateEmail = (email: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileUpdateType.UPDATEEMAIL,
      payload: email,
    });
  };
};
export const profileUpdatePhone = (phone: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ProfileUpdateType.UPDATEPHONE,
      payload: phone,
    });
  };
};
