import Database from '../realm/';

export const saveUserDb = (user)=>{
	Database.write(() => {
		Database.create('User', user);	
	})
}

export const findUserDb = ()=>{
	if(Database.objects('User').length ===0) return false;
	return Database.objects('User')[0];
}


export const logoutDb = ()=>{
	Database.write(() => {
		Database.delete(Database.objects('User'));
	})
}

export const updateDisplayNameDb = (displayName)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.displayName = displayName;
	})
}

export const updateBiographyDb = (biography)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.biography = biography;
	})
}

export const updateSexDb = (sex)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.sex = sex;
	})
}

export const updateAvatarDb= (uri)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.pictures.push(user.avatar);
		user.avatar = uri;
	})
}

export const addFamilyDb = (uri)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.families.push(uri);
	})
}

export const addHobbieDb = (hobbie)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.hobbies.push(hobbie);
	})
}

export const updateNotificationsDb = (active)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.notifications = active;
	})
}

export const updateDistanceDb = (distance)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.distance = distance;
	})
}


export const deleteHobbieDb = (hobbie)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.hobbies.splice(user.hobbies.indexOf(hobbie),1)
	})
}

export const deletePictureDb = (picture)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.pictures.splice(user.pictures.indexOf(picture),1)
	})
}

export const deleteFamilyDb = (picture)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.families.splice(user.families.indexOf(picture),1)
	})
}