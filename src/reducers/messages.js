import {
	addToMessage,
	removeToMessage,
	updateToMessage
} from '../actions/messages';

import {
	replaceMessage,
	includes
} from '../utils/message';

let initialState = [];

let verified;

export default (state = initialState, action) => {
    switch (action.type) {
    	case addToMessage().type:
        	return action.page === 0 ? action.payload : [...state,...action.payload];
        case updateToMessage().type:
        	verified = includes(state,action._id);
        	if(verified)
        	{
        		return replaceMessage(state,action.message,action._id);	
        	}
        	else
        	{
                let newMessage = [{
                    "_id" : action._id,
                    "message" :[action.message],
                    "user" : action.user
                }];

                return [...newMessage,...state]

        	}
        	return state;
        case removeToMessage().type:    
        	return state.filter(item => !action.payload.includes(item._id));
      default:
        return state;
    }
};