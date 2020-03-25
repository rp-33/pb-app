import moment from 'moment';

const newMessage = (sender,receiver,type,text,image,location)=>{
	return{
		time : moment().unix(),
		status : 'not-send',
		type : type,
		text : text,
		image : image,
		sender : {
			_id : sender
		},
		receiver : {
			_id:receiver
		},
		location : location
	};
}

const changeStatusMessage = (data,status,time)=>{
	let newData = data.map((item,indice)=>{
		if(item.time ==time)
		{
			item.status = status;
		}
		return item
	})

	return newData;
}

export {
	newMessage,
	changeStatusMessage
}
