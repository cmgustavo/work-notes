import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import getStore from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

const {store, persistor} = getStore();

const ReduxProvider = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxProvider);
