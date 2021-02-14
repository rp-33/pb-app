import Realm from 'realm';

//Models
import UserModel from './models/user';

const Database = new Realm({
    schema: [
    	UserModel
    ],
    deleteRealmIfMigrationNeeded: true
});

export default Database;