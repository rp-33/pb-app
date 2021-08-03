import Database from '../realm/';

class BusinessDb{
	constructor(){
		this.business = Database.objects('Business')[0];
	}

	save(business){
		Database.write(() => {
			Database.create('Business', business);	
		});
		this.business = Database.objects('Business')[0];
	};

	get(){
		let business = Database.objects('Business')[0];
		if(!business) return false;
		return {
			_id : business._id,
			token:business.token,
			email:business.email,
			displayName:business.displayName,
			avatar:business.avatar,
			notifications:business.notifications,
			isAuthenticated:business.isAuthenticated,
        	location:business.location,
		}
	}

	logout(){
		Database.write(() => {
			Database.delete(Database.objects('Business'));
		})
	}

}

export default BusinessDb;