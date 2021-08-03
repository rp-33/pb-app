const BusinessModel = {
	name: 'Business',
	primaryKey : '_id',
	properties: {
		_id: 'string',
		token : 'string',
		email : 'string',
		type : 'string',
		displayName : 'string',
		avatar : 'string?',
		notifications : 'bool',
		isAuthenticated : 'bool',
        location : 'float[]'
    }
};

export default BusinessModel;