import axios from 'axios';
import endpointBase from '../configuration/endPoint';
import userDb from '../database/business';

let db = new userDb();

let route = `${endpointBase}`;

export const verifiedEmail = (email)=>{
	return axios({
		method:'get',
		url:`${route}/verifiedEmail/business`,
		params:{
			email
		}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const signupBusiness = (displayName,email,type,password,longitude,latitude)=>{

    return axios({
		method:'post',
		url : `${route}/signup/business`,
		data : {
			displayName,
			email,
			type,
			password,
			longitude,
			latitude
		}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

export const loginBusiness = (email,password)=>{

	return axios({
		method:'post',
		url:`${route}/login/business`,
		data:{
			email,
			password
		}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const logout = ()=>{
	return axios({
		method:'get',
		url : `${route}/logout/business`,
		headers:{'Authorization': "bearer " + db.get().token}
	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}