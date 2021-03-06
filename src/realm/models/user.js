const UserModel = {
	name: 'User',
	primaryKey : '_id',
	properties: {
		_id: 'string',
		token : 'string',
		email : 'string',
		displayName : 'string',
		petName : 'string',
		avatar : 'string',
		distance :'int',
		sex : 'string',
		notifications : 'bool',
		isAuthenticated : 'bool',
		pictures: 'string?[]',
        biography : 'string?',
        hobbies : 'string?[]',
        families : 'string?[]',
        location : 'float[]',
        age : 'int',
        pet: 'string'
    }
};

export default UserModel;