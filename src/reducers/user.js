import userDb from '../database/user';

import {
	setAuth,
	setAvatar,
	setFamily,
	setBiography,
	setHobbie,
	deleteHobbie,
	deletePicture,
	deleteFamily,
	setPetName,
	setLogout,
	setDistance,
	setSex,
	setNotifications,
	setAge,
	setPet
} from '../actions/user';

let db = new userDb();

let initUser = {
	_id: '',
	token : '',
	email : '',
	displayName : '',
	petName : '',
	avatar : null,
	distance : 50,
	isAuthenticated : false,
	families : [],
	pictures : [],
	biography : '',
	hobbies : [],
	sex: 'male',
	notifications : true,
	pet : '',
   	location : [],
    age : null
}

const initialState = db.get() || initUser;


export default (state = initialState, action) => {
    switch (action.type) {
        case setAuth().type:
        	db.save(action.payload)
            return action.payload;
        case setAvatar().type:
        	db.setAvatar(action.payload);
			return {
				...state, 
				avatar: action.payload,
				pictures : db.get().pictures
			};
		case setFamily().type:
			db.setFamily(action.payload);
			return {
				...state, 
				families : db.get().families
			};
		case setBiography().type:
			db.setBiography(action.payload);
			return{
				...state,
				biography : action.payload
			}
		case setPetName().type:
			db.setPetName(action.payload);
			return{
				...state,
				petName : action.payload
			}
		case setHobbie().type:
			db.setHobbie(action.payload);
			return {
				...state, 
				hobbies: db.get().hobbies
			};
		case deleteHobbie().type:
			db.deleteHobbie(action.payload);
			return {
				...state,
				hobbies : db.get().hobbies
			}
		case deletePicture().type:
			db.deletePicture(action.payload);
			return {
				...state,
				pictures : db.get().pictures
			}
		case deleteFamily().type:
			db.deleteFamily(action.payload);
			return {
				...state,
				families : db.get().families
			}
		case setDistance().type:		
			db.setDistance(action.payload);
			return{
				...state,
				distance : action.payload
			}
		case setSex().type:		
			db.setSex(action.payload);
			return{
				...state,
				sex : action.payload
			}
		case setNotifications().type:	
			db.setNotification(action.payload);
			return{
				...state,
				notifications : action.payload
			}
		case setAge().type:	
			db.setAge(action.payload);
			return{
				...state,
				age : action.payload
			}
		case setPet().type:	
			db.setPet(action.payload);
			return{
				...state,
				pet : action.payload
			}
		case setLogout().type:
			db.logout();
			return initUser;
        default:
            return state;
    }
};