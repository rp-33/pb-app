const rad = (x) => (x*Math.PI/180);
const R = 6378.137; //Radio de la tierra en km

export const distance = (myLocation,yourLocation) => {

   	const lon1 = myLocation[0];
   	const lat1 = myLocation[1];
   	const lon2 = yourLocation[0];
   	const lat2 = yourLocation[1];

    const dLat = rad( lat2 - lat1 );
    const dLong = rad( lon2 - lon1 );
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    if(d <=0.99999999) return d.toFixed(3) * 1000 + ' m ';
    return d.toFixed(3).split('.').join(',') + ' Km '; 
};