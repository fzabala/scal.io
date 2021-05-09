import {UserInterface} from "../../types/models.d";

export const FETCHING_USERS = 'FETCHING_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const PER_PAGE = 9;

interface FetchUsersAction {
  type: typeof FETCHING_USERS;
  payload: undefined;
}

interface FetchUsersSuccessAction {
  type: typeof FETCH_USERS_SUCCESS;
  payload: {users: UserInterface[], total: number, login: string};
}

interface FetchUsersFailureAction {
  type: typeof FETCH_USERS_FAILURE;
  payload: string;
}

export type UsersActionTypes =
  | FetchUsersAction
  | FetchUsersSuccessAction
  | FetchUsersFailureAction;

export interface UsersState {
  users: UserInterface[];
  isFetching: boolean;
  error?: string;
  page: number;
  total: number;
  login: string;
  perPage: number;
}
