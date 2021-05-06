import {
  UsersState,
  UsersActionTypes,
  FETCHING_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from "../types";

const PER_PAGE = 9;
const initialState: UsersState = {
  users: [],
  isFetching: false,
  page: 1,
  total: 0,
  login: '',
  perPage: PER_PAGE,
};

export const usersReducer = (
  state: UsersState = initialState,
  action: UsersActionTypes,
): UsersState => {
  switch (action.type) {
    case FETCHING_USERS:
      return {
        ...state,
        isFetching: true,
        error: undefined,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
