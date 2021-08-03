import Realm from 'realm';

//Models
import UserModel from './models/user';
import BusinessModel from './models/business';

const Database = new Realm({
    schema: [
    	UserModel,
        BusinessModel
    ],
    deleteRealmIfMigrationNeeded: true
});

export default Database;