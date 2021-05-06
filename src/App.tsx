import React, {Dispatch} from 'react';
import './App.scss';
import {Search} from "./components/Search/Search";
import {useDispatch, useSelector} from "react-redux"
import {Results} from "./components/Results/Results";
import {RootState} from "./redux/reducers";
import {UsersActionTypes} from "./redux/types";
import {fetchUsers} from "./redux/actions/users.actions";
import {Paginator} from "./components/Paginator/Paginator";
import {Alert} from "@material-ui/lab";

function App() {
  const {users, total, page, login, perPage, error, isFetching} = useSelector(
    (state: RootState) => state.users,
  );
  const usersDispatch: Dispatch<(dispatch: Dispatch<UsersActionTypes>) => void> = useDispatch();

  const onNextPageHandler = () => usersDispatch(fetchUsers(login, page + 1))

  const onPrevPageHandler = () => usersDispatch(fetchUsers(login, page - 1))

  const onSearchHandler = (value: string) => usersDispatch(fetchUsers(value, 1))

  return (
    <div className="App">
      <Search
        disabled={isFetching}
        onSearch={onSearchHandler}/>
      {total === 0 && login !== '' && <Alert severity='warning'>No results...</Alert>}
      {total > 0 && <Paginator
        error={error}
        perPage={perPage}
        disabled={isFetching}
        onNextPage={onNextPageHandler}
        onPrevPage={onPrevPageHandler}
        total={total}
        page={page}/>}
      <Results
        users={users}/>
    </div>
  );
}

export default App;
