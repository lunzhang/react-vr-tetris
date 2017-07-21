import React from 'react';
import { AppRegistry } from 'react-vr';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/';
import './unit/const';
import './control';
import { subscribeRecord } from './unit';

subscribeRecord(store);

export default class react_vr_tetris extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
};

AppRegistry.registerComponent('react_vr_tetris', () => react_vr_tetris);
