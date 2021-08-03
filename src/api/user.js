import axios from 'axios';
import endpointBase from '../configuration/endPoint';
import userDb from '../database/user';

let db = new userDb();

let route = `${endpointBase}`;

export const verifiedEmail = (email)=>{
	return axios({
		method:'get',
		url:`${route}/verifiedEmail/user`,
		params:{
			email
		}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const signup = (petName,displayName,email,sex,age,password,avatar,pet,longitude,latitude)=>{
	let formData = new FormData();
	formData.append('petName',petName);
	formData.append('displayName',displayName);
	formData.append('email',email);
	formData.append('sex',sex);
	formData.append('age',age);
	formData.append('password',password);
	formData.append('pet',pet);
	formData.append('longitude',longitude);
	formData.append('latitude',latitude);
	formData.append('file',{
        uri:avatar,
        name:avatar,
        type:'image/jpeg'
    });

    return axios({
		method:'post',
		url : `${route}/signup/user`,
		data : formData,
		headers:{'content-type':'multipart/form-data'}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

export const login = (email,password)=>{

	return axios({
		method:'post',
		url:`${route}/login/user`,
		data:{
			email,
			password
		}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const searchUsers = (page,sex,pet,location,distance)=>{
	return axios({
		method:'get',
		url:`${route}/searchUsers/${page}`,
		params :{
			sex,
			pet,
			longitude : location[0],
			latitude : location[1],
			location,
			distance
		},
		headers:{'Authorization': "bearer " + db.get().token}
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
    formData.append('avatar',db.get().avatar);

    return axios({
		method:'put',
		url : `${route}/user/edit/avatar`,
		data : formData,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + db.get().token}
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
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + db.get().token}
	
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
		headers:{'Authorization': "bearer " + db.get().token}
	
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
		headers:{'Authorization': "bearer " + db.get().token}
	
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
		headers:{'Authorization': "bearer " + db.get().token}
	
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
		headers:{'Authorization': "bearer " + db.get().token}
	
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
		headers:{'Authorization': "bearer " + db.get().token}
	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const editPetName = (petName)=>{
	return axios({
		method:'put',
		url : `${route}/user/edit/petName`,
		params :{
			petName
		},
		headers:{'Authorization': "bearer " + db.get().token}
	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const logout = ()=>{
	return axios({
		method:'get',
		url : `${route}/logout/user`,
		headers:{'Authorization': "bearer " + db.get().token}
	
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
		headers:{'Authorization': "bearer " + db.get().token}
	
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
		headers:{'Authorization': "bearer " + db.get().token}
	
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
		headers:{'Authorization': "bearer " + db.get().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const editAge = (age)=>{
	return axios({
		method:'put',
		url : `${route}/user/edit/age`,
		params :{
			age
		},
		headers:{'Authorization': "bearer " + db.get().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const editPet = (pet)=>{
	return axios({
		method:'put',
		url : `${route}/user/edit/pet`,
		params :{
			pet
		},
		headers:{'Authorization': "bearer " + db.get().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}


export const editPassword = (password,token)=>{

	token = token ? token : db.get().token;

	return axios({
		method:'put',
		url : `${route}/user/edit/password`,
		params :{
			password
		},
		headers:{'Authorization': "bearer " + token}	
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
		headers:{'Authorization': "bearer " + db.get().token}	
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
		headers:{'Authorization': "bearer " + db.get().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const findMatches = (page)=>{
	return axios({
		method:'get',
		url : `${route}/find/matches/${page}`,
		headers:{'Authorization': "bearer " + db.get().token}	
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
		headers:{'Authorization': "bearer " + db.get().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const newMessageText = (_id,type,text,receiver,time)=>{
	return axios({
		method:'post',
		url : `${route}/message/text`,
		params :{
			_id,
			type,
			text,
			receiver,
			time
		},
		headers:{'Authorization': "bearer " + db.get().token}	
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
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + db.get().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const newMessageLocation = (_id,type,text,location,receiver,time)=>{
	return axios({
		method:'post',
		url : `${route}/message/location`,
		params :{
			_id,
			type,
			location,
			receiver,
			time,
			text
		},
		headers:{'Authorization': "bearer " + db.get().token}	
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
		headers:{'Authorization': "bearer " + db.get().token}	
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
		headers:{'Authorization': "bearer " + db.get().token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const sendCodePassword = (email)=>{
	return axios({
		method:'post',
		url : `${route}/password/sendCode`,
		data :{
			email
		}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const verifyCodePassword = (email,code,token)=>{
	return axios({
		method:'get',
		url : `${route}/password/verifyCode`,
		params :{
			email,
			code
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}

export const newPassword = (password,token)=>{
	return axios({
		method:'put',
		url : `${route}/password/new`,
		params :{
			password
		},
		headers:{'Authorization': "bearer " + token}	
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
}
