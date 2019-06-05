import * as types from "../types";

const initPageState = () => {
  return {
    userInfo: {
      _id: "",
      name: "",
      avatar: ""
    }
  };
};
const user = {
  state: initPageState(),
  mutations: {
    [types.SAVE_USER](state: any, pageState: any) {
      for (const prop in pageState) {
        state[prop] = pageState[prop];
      }
    }
  },
  actions: {}
};

export default user;
