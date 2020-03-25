import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../navigator/routes';

const initialAction = { type: NavigationActions.INIT }
const initialState = RootNavigator.router.getStateForAction(initialAction)

const nav = (state = initialState,action) => {
	return RootNavigator.router.getStateForAction(action, state) || state;
}

export default nav;