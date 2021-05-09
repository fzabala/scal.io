import React from 'react';
import {Provider} from 'react-redux';
import createMockStore, {MockStoreCreator, MockStoreEnhanced} from 'redux-mock-store';
import {mount} from './setup/test-setup';
import App from '../src/App';
import {FETCH_USERS_SUCCESS, FETCHING_USERS, PER_PAGE, UsersActionTypes, UsersState} from "../src/redux/types";
import axios from 'axios';

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

const mockDispatchfn = jest.fn();
import thunk, {ThunkDispatch} from 'redux-thunk';
import {RootState} from './../src/redux/reducers'
import {AnyAction, Middleware, CombinedState} from 'redux';
import {Paginator} from "../src/components/Paginator/Paginator";
import {ReactWrapper} from "enzyme";
import {Search} from "../src/components/Search/Search";
import {Results} from "../src/components/Results/Results";
import {Card} from "@material-ui/core";
import {fetchUsers} from "../src/redux/actions";
import {UserInterface} from "../src/types/models.d";

const middlewares: Array<Middleware> = [thunk];
type DispatchExts = ThunkDispatch<RootState, undefined, AnyAction>;
const mockStoreCreator: MockStoreCreator<RootState, DispatchExts> = createMockStore<RootState, DispatchExts>(middlewares);

const initialState: UsersState = {
  users: [],
  isFetching: false,
  page: 1,
  total: 0,
  login: '',
  perPage: PER_PAGE,
};
const state: CombinedState<{ users: UsersState; }> = {
  users: initialState,
}
const mockStore: MockStoreEnhanced<RootState, DispatchExts> = mockStoreCreator(state);

describe('App', function () {
  let wrapper: ReactWrapper;
  const props: any = {
    handleSubmit: jest.fn(),
  };

  beforeEach(() => {
    mockStore.clearActions();
    wrapper = mount(
      <Provider store={mockStore}>
        <App {...props} dispatch={mockDispatchfn}/>
      </Provider>,
    );
  });

  test('initial state', () => {
    expect(wrapper.find(Search).length).toBe(1);
    expect(wrapper.find(Results).length).toBe(1);
    expect(wrapper.find(Results).find(Card).length).toBe(0);
    expect(wrapper.find(Paginator).length).toBe(0);
  });

  test('dispatch fetchUsers', async() => {
    const data = {
      "total_count": 1,
      "incomplete_results": false,
      "items": [
        {
          "login": "WolverineFan",
          "id": 676544,
          "node_id": "MDQ6VXNlcjY3NjU0NA==",
          "avatar_url": "https://avatars.githubusercontent.com/u/676544?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/WolverineFan",
          "html_url": "https://github.com/WolverineFan",
          "followers_url": "https://api.github.com/users/WolverineFan/followers",
          "following_url": "https://api.github.com/users/WolverineFan/following{/other_user}",
          "gists_url": "https://api.github.com/users/WolverineFan/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/WolverineFan/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/WolverineFan/subscriptions",
          "organizations_url": "https://api.github.com/users/WolverineFan/orgs",
          "repos_url": "https://api.github.com/users/WolverineFan/repos",
          "events_url": "https://api.github.com/users/WolverineFan/events{/privacy}",
          "received_events_url": "https://api.github.com/users/WolverineFan/received_events",
          "type": "User",
          "site_admin": false,
          "score": 1.0
        }
      ]
    };
    axiosMock.get.mockResolvedValue(() => Promise.resolve({data}));
    axiosMock.get.mockRejectedValue(() => Promise.reject('We have a problem'));

    const expectedActions: UsersActionTypes[] = [{
      type: FETCHING_USERS,
      payload: undefined,
    }, {
      type: FETCH_USERS_SUCCESS,
      payload: {
        users: data.items as UserInterface[],
        login: 'wolverine',
        total: data.total_count,
      },
    }];
    axiosMock.get.mockResolvedValue({data});

    mockStore.dispatch(fetchUsers('wolverine', 1))
      .then(() => {
        console.log(mockStore.getActions());
        expect(mockStore.getActions()).toEqual(expectedActions);
      })
  });
});
