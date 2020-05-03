import axios from 'axios';
import endpointBase from '../configuration/endPoint';
import {findUserDb} from '../services/realm';

let route = `${endpointBase}/user`;

export const verifiedEmail = (email)=>{
	return axios({
		method:'get',
		url:`${route}/verifiedEmail`,
		params:{
			email
		}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const signup = (displayName,email,sex,password,uri)=>{
	let formData = new FormData();
	formData.append('displayName',displayName);
	formData.append('email',email);
	formData.append('sex',sex);
	formData.append('password',password);
	formData.append('file',{
        uri:uri,
        name:uri,
        type:'image/jpeg'
    });

    return axios({
		method:'post',
		url : `${route}/signup`,
		data : formData,
		headers:{'content-type':'multipart/form-data'}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

export const login = (email,password)=>{
	return axios({
		method:'post',
		url:`${route}/login`,
		data:{
			email,
			password
		}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const searchUsers = (sex)=>{
	return axios({
		method:'get',
		url:`${route}/searchUsers`,
		params :{
			sex : sex
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const editAvatar = (uri)=>{
	let formData = new FormData();
	formData.append('file',{
        uri:uri,
        name:uri,
        type:'image/jpeg'
    });
    formData.append('avatar',findUserDb().avatar);

    return axios({
		method:'put',
		url : `${route}/user/edit/avatar`,
		data : formData,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

export const saveFamily = (uri)=>{
	let formData = new FormData();
	formData.append('file',{
        uri:uri,
        name:uri,
        type:'image/jpeg'
    });

    return axios({
		method:'put',
		url : `${route}/user/saveFamily`,
		data : formData,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}


export const editBiography = (biography)=>{
	return axios({
		method:'put',
		url : `${route}/user/edit/biography`,
		params :{
			biography
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const saveHobbie = (hobbie)=>{
	return axios({
		method:'put',
		url : `${route}/user/saveHobbie`,
		params :{
			hobbie
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const deletehobbie = (hobbie)=>{
	return axios({
		method:'put',
		url : `${route}/user/deleteHobbie`,
		params :{
			hobbie
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const deletepicture = (picture)=>{
	return axios({
		method:'put',
		url : `${route}/user/deletePicture`,
		params :{
			picture
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const deletefamily = (family)=>{
	return axios({
		method:'put',
		url : `${route}/user/deleteFamily`,
		params :{
			family
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const editDisplayName = (displayName)=>{
	return axios({
		method:'put',
		url : `${route}/user/edit/displayName`,
		params :{
			displayName
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const logout = ()=>{
	return axios({
		method:'get',
		url : `${route}/logout`,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const editDistance = (distance)=>{
	return axios({
		method:'put',
		url : `${route}/user/edit/distance`,
		params :{
			distance
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const editSex = (sex)=>{
	return axios({
		method:'put',
		url : `${route}/user/edit/sex`,
		params :{
			sex
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const editNotifications = (notifications)=>{
	return axios({
		method:'put',
		url : `${route}/user/edit/notifications`,
		params :{
			notifications
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const editPassword = (password)=>{
	return axios({
		method:'put',
		url : `${route}/user/edit/password`,
		params :{
			password
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}


export const like = (user,status)=>{
	return axios({
		method:'put',
		url : `${route}/like`,
		params :{
			user,
			like : status
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const disLike = (user)=>{
	return axios({
		method:'put',
		url : `${route}/disLike`,
		params :{
			user
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const findMatches = (page)=>{
	return axios({
		method:'get',
		url : `${route}/find/matches`,
		params :{
			page
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const findUser = (_id)=>{
	return axios({
		method:'get',
		url : `${route}/find/user`,
		params :{
			_id
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const newMessageText = (_id,type,text,receiver,time)=>{
	return axios({
		method:'put',
		url : `${route}/message/text`,
		params :{
			_id,
			type,
			text,
			receiver,
			time
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const newMessageImage = (_id,type,text,image,receiver,time)=>{
	let formData = new FormData();
	formData.append('_id',_id);
	formData.append('type',type);
	formData.append('text',text);
	formData.append('receiver',receiver);
	formData.append('time',time);
	formData.append('file',{
        uri:image,
        name:image,
        type:'image/jpeg'
    });

	return axios({
		method:'post',
		url : `${route}/message/image`,
		data : formData,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const newMessageLocation = (_id,type,text,location,receiver,time)=>{
	return axios({
		method:'put',
		url : `${route}/message/location`,
		params :{
			_id,
			type,
			location,
			receiver,
			time,
			text
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const findChat = (_id,page)=>{
	return axios({
		method:'get',
		url : `${route}/find/chat`,
		params :{
			_id,
			page
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const findMessages = (page)=>{
	return axios({
		method:'get',
		url : `${route}/find/messages`,
		params :{
			page
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}
