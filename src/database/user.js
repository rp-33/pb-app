import Database from '../realm/';

class userDb{
	constructor(){
		this.user = Database.objects('User')[0];
	}

	save(user){
		Database.write(() => {
			Database.create('User', user);	
		});
		this.user = Database.objects('User')[0];
	};

	get(){
		let user = Database.objects('User')[0]
		if(!user) return false;
		return user
	}

	logout(){
		Database.write(() => {
			Database.delete(Database.objects('User'));
		})
	}

	setDisplayName (displayName){
		Database.write(() => {
			this.user.displayName = displayName;
		})
	}

	setBiography (biography){
		Database.write(() => {
			this.user.biography = biography;
		})
	}

	setSex (sex){
		Database.write(() => {
			this.user.sex = sex;
		})
	}

	setAge (age){
		Database.write(() => {
			this.user.age = age;
		})
	}

	setPet (pet){
		Database.write(() => {
			this.user.pet = pet;
		})
	}

	setAvatar (uri){
		Database.write(() => {
			this.user.pictures.push(this.user.avatar);
			this.user.avatar = uri;
		})
	}

	setFamily (uri){
		Database.write(() => {
			this.user.families.push(uri);
		})
	}

	setHobbie (hobbie){
		Database.write(() => {
			this.user.hobbies.push(hobbie);
		})
	}

	setNotification (active){
		Database.write(() => {
			this.user.notifications = active;
		})
	}

	setDistance (distance){
		Database.write(() => {
			this.user.distance = distance;
		})
	}

	deleteHobbie (hobbie){
		Database.write(() => {
			this.user.hobbies.splice(this.user.hobbies.indexOf(hobbie),1)
		})
	}

	deletePicture (uri){
		Database.write(() => {
			this.user.pictures.splice(this.user.pictures.indexOf(uri),1)
		})
	}

	deleteFamily (uri){
		Database.write(() => {
			this.user.families.splice(this.user.families.indexOf(uri),1)
		})
	}

}

export default userDb;