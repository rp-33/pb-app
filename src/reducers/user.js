import {
	findUserDb,
	saveUserDb,
	logoutDb,
	updateDisplayNameDb,
	updateAvatarDb,
	updateNotificationsDb,
	updateDistanceDb,
	addFamilyDb,
	updateBiographyDb,
	addHobbieDb,
	deleteHobbieDb,
	deletePictureDb,
	deleteFamilyDb,
	updateSexDb
} from '../services/realm';

import {
	setAuth,
	setAvatar,
	setFamily,
	setBiography,
	setHobbie,
	deleteHobbie,
	deletePicture,
	deleteFamily,
	setDisplayName,
	setLogout,
	setDistance,
	setSex,
	setNotifications
} from '../actions/user';

let initUser = {
	_id: '',
	token : '',
	email : '',
	displayName : '',
	avatar : null,
	distance : null,
	isAuthenticated : false,
	families : [],
	pictures : [],
	biography : '',
	hobbies : [],
	notifications : true
}


const initialState = findUserDb() || initUser;

export default (state = initialState, action) => {
    switch (action.type) {
        case setAuth().type:
        	saveUserDb(action.payload);
            return action.payload;
        case setAvatar().type:
			updateAvatarDb(action.payload);
			return {
				...state, 
				avatar: action.payload,
				pictures : findUserDb().pictures
			};
		case setFamily().type:
			addFamilyDb(action.payload);
			return {
				...state, 
				families : findUserDb().families
			};
		case setBiography().type:
			updateBiographyDb(action.payload);
			return{
				...state,
				biography : action.payload
			}
		case setDisplayName().type:
			updateDisplayNameDb(action.payload);
			return{
				...state,
				displayName : action.payload
			}
		case setHobbie().type:
			addHobbieDb(action.payload);
			return {
				...state, 
				hobbies: findUserDb().hobbies
			};
		case deleteHobbie().type:
			deleteHobbieDb(action.payload);
			return {
				...state,
				hobbies : findUserDb().hobbies
			}
		case deletePicture().type:
			deletePictureDb(action.payload);
			return {
				...state,
				pictures : findUserDb().pictures
			}
		case deleteFamily().type:
			deleteFamilyDb(action.payload);
			return {
				...state,
				families : findUserDb().families
			}
		case setDistance().type:		
			updateDistanceDb(action.payload);
			return{
				...state,
				distance : action.payload
			}
		case setSex().type:		
			updateSexDb(action.payload);
			return{
				...state,
				sex : action.payload
			}
		case setNotifications().type:	
			updateNotificationsDb(action.payload);
			return{
				...state,
				notifications : action.payload
			}
		case setLogout().type:
			logoutDb();
			return initUser;
        default:
            return state;
    }
};