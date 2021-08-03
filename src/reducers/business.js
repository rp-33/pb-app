import businessDb from '../database/business';

import {
	setAuthBusiness,
	setLogout
} from '../actions/business';

let db = new businessDb();

let initBusiness = {
	_id: '',
	token : '',
	email : '',
	displayName : '',
	avatar : null,
	isAuthenticated : false,
	notifications : true,
   	location : []
}

const initialState = db.get() || initBusiness;

export default (state = initialState, action) => {
    switch (action.type) {
        case setAuthBusiness().type:
        	db.save(action.payload)
            return action.payload;
		case setLogout().type:
			db.logout();
			return initBusiness;
        default:
            return state;
    }
};