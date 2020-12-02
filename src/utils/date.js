import moment from 'moment';

let today = moment();

const date = (date)=>{

	let time = moment(date).format('MM/DD/YYYY');
	let diff = today.diff(time,'days');
	if(diff === 0)
	{
    	return moment(date).format('LT');
    }
    else if(diff ===1)
    {
    	return "yesterday";
    }
    else if(diff>1 && diff<7)
    {
    	return moment(date).format('dddd').substring(0,3);
	}
	else
	{
    	return moment(date).format('DD/MM/YYYY')
    }
}

export {
	date
}