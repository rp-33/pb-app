import moment from 'moment';

let today = moment();

const date = (timeUnix)=>{

	let time = moment.unix(timeUnix).format('MM/DD/YYYY');
	let diff = today.diff(time,'days');
	if(diff === 0)
	{
    	return moment.unix(timeUnix).format('LT');
    }
    else if(diff ===1)
    {
    	return "yesterday";
    }
    else if(diff>1 && diff<7)
    {
    	return moment.unix(timeUnix).format('dddd').substring(0,3);
	}
	else
	{
    	return moment.unix(timeUnix).format('DD/MM/YYYY')
    }
}

export {
	date
}