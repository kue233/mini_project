// this file exists because reducer type and action types are all manually input, maybe cause typo
export enum ActionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  BANKRUPT = "bankrupt",
}

export enum ProfileUpdateType {
  UPDATE = "updateProfile",
  RESET = "resetProfile",
  UPDATEPIC = "updatePic",
  UPDATENAME = "updateName",
  UPDATEEMAIL = "updateEmail",
  UPDATEPHONE = "updatePhone",
}
