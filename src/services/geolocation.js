import Geolocation from 'react-native-geolocation-service';

const geolocation = ()=>{

    return new Promise( ( resolve , reject ) =>{

        try{
            Geolocation.getCurrentPosition(
                position => {                  
                    resolve(position.coords)
                },
                error => {
                    reject(error);
                },
                { enableHighAccuracy: false, timeout: 10000,showLocationDialog:true }
            )

        }catch(err) {
            reject(err);
        }  

    })

   
}

export {geolocation};