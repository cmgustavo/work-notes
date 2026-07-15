/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Provider} from 'react-redux';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import App from '../src/App';
import getStore from '../src/store';

it('renders correctly', () => {
  const {store} = getStore();
  renderer.act(() => {
    renderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });
});
