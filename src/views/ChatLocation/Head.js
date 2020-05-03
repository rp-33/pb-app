import React from 'react';
import {
	Text
} from 'react-native';
import {
	Header,
	Left,
	Button,
	Right,
	Body,
	Icon
} from 'native-base';
import themeColor from '../../theme/color';
import PropTypes from 'prop-types';

const Head = ({handleBack})=>{
	return(
		<Header noShadow style={{borderBottomWidth: 0,backgroundColor: themeColor.primary}} iosBarStyle='dark-content' androidStatusBarColor='white'>
        	<Left style={Platform.OS === 'android' ? {flex:1} : null}>
        		<Button transparent onPress={()=>handleBack()}>
        			<Icon name="ios-arrow-back" color={themeColor.primary} size={25} />
        		</Button>
       		 </Left>
        	<Body style={Platform.OS === 'android' ? {flex:1,alignItems: 'center'} : null}>
         		<Text style={{color:'white',fontWeight:'bold'}}>Location</Text>  	
        	</Body>
        	<Right style={Platform.OS === 'android' ? {flex:1} : null} />
   		</Header>

	)
}

Head.propTypes = {
	handleBack : PropTypes.func.isRequired
}

export default Head;