import moment from 'moment';

export class newMessage {
	constructor(sender,receiver,type){
		this.type = type;
		this.status = 'not-send';
		this.text = null;
		this.time = moment().format();
		this.sender = sender;
		this.receiver = receiver;
		this.image = null;
		this.location = null;
	}

	setText(text){
		this.text = text;
		return this;
	}

	setImage(image){
		this.image = image;
		return this;
	}

	setLocation(location){
		this.location = location;
		return this;
	}

	build(){
		return this;
	}

}//patron de diseño builder para construir mis mensajes

export const changeStatusMessage = (data,status,time)=>{

	let newData = data.map((item,indice)=>(item.time ==time ? {...item,status:status} : item))

	return newData;
}//me actualiza los estatus de los mensajes

export const replaceMessage = (data,newMessage,_id)=>{
	let newData = data.map((item,indice)=>{
		if(item._id == _id)
		{
			item.message.unshift(newMessage);
		}
		return item;
	})

	return newData;
}//me actualiza mis mensajes;

export const includes = (data,_id)=>{
	let verified = false
	data.forEach((item,index)=>{
        if(item._id==_id) verified = true;    		
    });
    return verified;
}//verifica que ya un mensaje este abierto


export const findChatId = (messages,id)=>{
	for(let i=0;i<messages.length;i++)
		{
			if(messages[i]._id === id) return messages[i].message;
		}

		return [];
}//busca los chat por id de menesajes