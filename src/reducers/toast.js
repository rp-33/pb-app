import {setToast} from '../actions/toast';

const initialState = {
	visible : false,
	title : '',
	type : ''
}

export default (state = initialState, action) => {
    switch (action.type) {
      case setToast().type:
        return action.payload;
      default:
        return state;
    }
};