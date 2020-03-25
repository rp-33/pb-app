import Realm from 'realm';

//Models
import UserModel from './models/user';

const Database = new Realm({
    schema: [
    	UserModel
    ]
});

export default Database;