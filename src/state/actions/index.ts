import { ActionType, ProfileUpdateType } from "../action-types/index";
import { ProfileArrayState, ProfileState } from "../reducers/profileReducer";

interface DepositAction {
  type: ActionType.DEPOSIT;
  payload: number;
}
interface WithdrawAction {
  type: ActionType.WITHDRAW;
  payload: number;
}
interface BankruptAction {
  type: ActionType.BANKRUPT;
}

// profile
interface ProfileUpdateAction {
  type: ProfileUpdateType.UPDATE;
  payload: {
    _id: string;
    picUrl: string;
    name: string;
    email: string;
    phone: string;
  };
}
interface ProfileResetAction {
  type: ProfileUpdateType.RESET;
  payload: ProfileArrayState;
}
interface ProfileUpdatePicAction {
  type: ProfileUpdateType.UPDATEPIC;
  payload: string;
}
interface ProfileUpdateNameAction {
  type: ProfileUpdateType.UPDATENAME;
  payload: string;
}
interface ProfileUpdateEmailAction {
  type: ProfileUpdateType.UPDATEEMAIL;
  payload: string;
}
interface ProfileUpdatePhoneAction {
  type: ProfileUpdateType.UPDATEPHONE;
  payload: string;
}

export type Action = DepositAction | WithdrawAction | BankruptAction;
export type ProfileAction =
  | ProfileUpdateAction
  | ProfileResetAction
  | ProfileUpdatePicAction
  | ProfileUpdateNameAction
  | ProfileUpdateEmailAction
  | ProfileUpdatePhoneAction;
