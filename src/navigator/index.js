import React from 'react';
import { connect } from 'react-redux';
import { createReduxContainer,createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import {RootNavigator} from './routes';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navState
);
const AppWithNavigationState = createReduxContainer(RootNavigator);
const mapStateToProps = state => ({
  state: state.navState,
});
const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, navigationMiddleware };