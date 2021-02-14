import React from 'react';
import {View} from 'react-native';
import {Icon} from 'native-base';
import PropTypes from 'prop-types';

const Rating = ({value,style})=>{

	const raking = (range)=>{
		let stars = [];
    	for(var i = 0; i < 5; i++) {
    		if(i<range){
    			if(i===0) {
                    stars.push(<Icon key={i} name="ios-star" type='Ionicons' style={{color:'#ffd600',marginLeft:3,fontSize:17}}/>);
                } else {
                    stars.push(<Icon key={i} name="ios-star" type='Ionicons' style={{color:'#ffd600',marginRight:3,fontSize:17}} />);
                }
    		}else{
    			if(i===0) {
                    stars.push(<Icon key={i} name="ios-star" type='Ionicons' style={{color:'#c7c7c7',marginLeft:3,fontSize:17}} />);
                } else {
                    stars.push(<Icon key={i} name="ios-star" type='Ionicons' style={{color:'#c7c7c7',marginRight:3,fontSize:17}} />);
                }
    		}
    	}

    	return stars;   
	}

	return(
		<View style={[{flexDirection:'row'},style]}>
			{raking(value)}
		</View>
	)
}


export default Rating;