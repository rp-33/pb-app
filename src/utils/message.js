import moment from 'moment';

export const newMessage = (sender,receiver,type,text,image,location)=>{
	return{
		time : moment().unix(),
		status : 'not-send',
		type : type,
		text : text,
		image : image,
		sender : sender,
		receiver : receiver,
		location : location
	};
}//objeto del mensaje

export const changeStatusMessage = (data,status,time)=>{
	
	let newData = data.map((item,indice)=>{
		if(item.time ==time)
		{
			item.status = status;
		}
		return item
	})

	return newData;
}//me actualiza los estatus de los mensajes

export const replaceMessage = (data,newMessage,_id)=>{
	let newData = data.map((item,indice)=>{
		if(item._id == _id)
		{
			item.message[0].text = newMessage.text;
			item.message[0].time = newMessage.time;
		}
		return item;
	})

	return newData;
}//me actualiza el ultimo mensaje;

export const includes = (data,_id)=>{
	let verified = false
	data.forEach((item,index)=>{
        if(item._id==_id) verified = true;
        		
    });
    return verified;
}//verifica que ya un mensaje este abierto
