import { UserActionTypes } from "./types";
import Cookies from "js-cookie";

const authCookies = Cookies.get("AUTH") || JSON.stringify({});
const INITIAL_STATE = {
  loginLoading: false,
  signUpLoading: false,
  searchUsersLoading: false,
  fetchUserLoading: false,
  updateUserLoading: false,
  fetchUserSuccess: false,
  updateUserSuccess: false,
  users: null,
  user: null,
  token: null,
  searchUsersError: null,
  signUpError: null,
  loginError: null,
  fetchUserError: null,
  updateUserError: null,
  ...JSON.parse(authCookies),
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.LOGIN_START:
      return {
        ...state,
        loginError: null,
        loginLoading: true,
      };
    case UserActionTypes.LOGIN_SUCCESS:
      Cookies.set(
        "AUTH",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        })
      );
      return {
        ...state,
        loginLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case UserActionTypes.LOGIN_ERROR:
      return {
        ...state,
        loginLoading: false,
        loginError: action.payload.error,
      };

    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        signUpError: null,
        signUpLoading: true,
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      Cookies.set(
        "AUTH",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        })
      );
      return {
        ...state,
        signUpLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case UserActionTypes.SIGN_UP_ERROR:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.payload.error,
      };

    case UserActionTypes.USERS_SERACH_START:
      return {
        ...state,
        searchUsersError: null,
        searchUsersLoading: true,
      };
    case UserActionTypes.USERS_SERACH_SUCCESS:
      return {
        ...state,
        searchUsersLoading: false,
        users: action.payload.users,
      };
    case UserActionTypes.USERS_SERACH_ERROR:
      return {
        ...state,
        searchUsersLoading: false,
        searchUsersError: action.payload.error,
      };
    case UserActionTypes.FETCH_USER_START:
      return {
        ...state,
        fetchUserLoading: true,
        fetchUserError: null,
      };

    case UserActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        fetchUserLoading: false,
        user: action.payload.user,
      };

    case UserActionTypes.FETCH_USER_ERROR:
      return {
        ...state,
        fetchUserLoading: false,
        fetchUserError: action.payload.error,
      };
    case UserActionTypes.UPDATE_USER_START:
      return {
        ...state,
        updateUserLoading: true,
        updateUserError: null,
      };

    case UserActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUserLoading: false,
        user: { ...state.user, [action.payload.id]: action.payload.user },
      };

    case UserActionTypes.UPDATE_USER_ERROR:
      return {
        ...state,
        updateUserLoading: false,
        updateUserError: action.payload.error,
      };
    case UserActionTypes.LOG_OUT:
      Cookies.remove("AUTH");
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;
