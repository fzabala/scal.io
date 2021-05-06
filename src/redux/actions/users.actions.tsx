import {
  FETCHING_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UsersActionTypes,
} from '../types';
import {UserInterface} from "../../types/models.d";
import {ActionCreator} from 'redux';
import {Dispatch} from 'react';
import {getUsersService} from "../../services";
import {store} from "../index";

export function fetchUsers(login: string, page: number) {
  const state = store.getState();

  return (dispatch: Dispatch<UsersActionTypes>) => {
    dispatch(fetchingUsers());

    getUsersService(login, typeof page !== 'undefined' ? page : state.users.page, state.users.perPage)
      .then((data) => {
        const users: UserInterface[] = data.data.items.map(({type, avatar_url, login}: UserInterface) => ({type, avatar_url, login}) )
        const total: number = data.data.total_count;
        dispatch(fetchUsersSuccess(users, total, login, page))
      })
      .catch((error) => dispatch(fetchUsersFailure(error.message)));
  };
}

const fetchingUsers: ActionCreator<UsersActionTypes> = () => ({
  type: FETCHING_USERS,
  payload: undefined,
});

const fetchUsersSuccess: ActionCreator<UsersActionTypes> = (
  users: UserInterface[],
  total: number,
  login: string,
  page: number,
) => ({
  type: FETCH_USERS_SUCCESS,
  payload: {users, total, login, page},
});

const fetchUsersFailure: ActionCreator<UsersActionTypes> = (
  error: string,
) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});
