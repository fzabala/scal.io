import {combineReducers} from 'redux';
import {usersReducer} from './users.reducer';

export const rootReducer = combineReducers({
  users: usersReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
