import * as React from 'react';
import { Provider } from 'react-redux';
import { mount } from './setup/test-setup';
import App from '../src/App';
import {store} from './../src/redux';

test('renders correctly', () => {
  let wrapper: any;
  wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(wrapper).toBeDefined();
});
