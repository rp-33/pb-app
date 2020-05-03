import moment from 'moment';

export class newMessage {
	constructor(sender,receiver,type){
		this.type = type;
		this.status = 'not-send';
		this.text = null;
		this.time = moment().unix();
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

}//patron de diseño builder

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
			item.message[0].type = newMessage.type;
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
