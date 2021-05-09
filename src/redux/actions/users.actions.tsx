import {
  FETCHING_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  PER_PAGE,
  UsersActionTypes,
} from '../types';
import {UserInterface} from "../../types/models.d";
import {ActionCreator} from 'redux';
import {getUsersService} from "../../services";

export function fetchUsers(login: string, page: number) {

  return (dispatch: any) => {
    dispatch(fetchingUsers());

    return getUsersService(login, page, PER_PAGE)
      .then((data) => {
        const users: UserInterface[] = data.data.items.map(({type, avatar_url, login}: UserInterface) => ({type, avatar_url, login}) )
        const total: number = data.data.total_count;
        return dispatch(fetchUsersSuccess(users, total, login, page))
      })
      .catch((error) => dispatch(fetchUsersFailure(error.message)));
  };
}

export const fetchingUsers: ActionCreator<UsersActionTypes> = () => ({
  type: FETCHING_USERS,
  payload: undefined,
});

export const fetchUsersSuccess: ActionCreator<UsersActionTypes> = (
  users: UserInterface[],
  total: number,
  login: string,
  page: number,
) => ({
  type: FETCH_USERS_SUCCESS,
  payload: {users, total, login, page},
});

export const fetchUsersFailure: ActionCreator<UsersActionTypes> = (
  error: string,
) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});
