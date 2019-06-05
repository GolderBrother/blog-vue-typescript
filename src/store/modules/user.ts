import { Commit } from "vuex";
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

const state: any = initPageState();

const mutations: any = {
  [types.SAVE_USER](state: any, pageState: any) {
    for (const prop in pageState) {
      state.userInfo[prop] = pageState[prop];
    }
  },
  [types.CLEAR_USER](state: any){
    for (const key in state.userInfo) {
      state.userInfo[key] = "";
    }
  }
};

const actions: any = {
  saveUser(context: { commit: Commit }, params: object) {
    context.commit(types.SAVE_USER, params);
  },
  clearUser(context: {commit: Commit}){
    context.commit(types.CLEAR_USER);
  }
};

const user = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default user;
