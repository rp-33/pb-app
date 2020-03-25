import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

const permissions = async()=>{
	const response = await request(Platform.select({
    									android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    									ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  									}))

   	return response
}

export {permissions};