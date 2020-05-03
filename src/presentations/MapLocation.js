import React from 'react';
import MapView,{Marker} from 'react-native-maps';
import PropTypes from 'prop-types';

const MapLocation = ({location})=>{
	return(
		<MapView
           	style={{flex:1}}
           	region={{
           		latitude : location.latitude,
            	longitude : location.longitude,
            	longitudeDelta:10,
     			latitudeDelta:10
           	}} 
			scrollEnabled={true}
                zoomEnabled={true}
        >
           	<Marker
      			coordinate={location}
      		/>
        </MapView>
	)
}

MapLocation.propTypes = {
	location: PropTypes.shape({
		longitude : PropTypes.number,
		latitude : PropTypes.number
	})
}

export default MapLocation;