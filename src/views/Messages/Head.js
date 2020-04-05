import React from 'react';
import {
    Text,
    Image,
    Platform,
} from 'react-native';
import {
    Header,
    Left,
    Right,
    Body,
    Button,
    Icon
} from 'native-base';
import themeColor from '../../theme/color';
import PropTypes from 'prop-types';

const Head = ({dataLength,handleDelete}) => {
	return(
		<Header noShadow style={{borderBottomWidth: 0,backgroundColor: 'white'}} iosBarStyle='dark-content' androidStatusBarColor='white'>
        	<Left style={Platform.OS === 'android' ? {flex:1} : null} />
        	<Body style={Platform.OS === 'android' ? {flex:2,alignItems: 'center'} : null}>
         		<Image source ={require('../../assets/images/logo.png')} style={{width:30,height:30}} />       	
        	</Body>
        	<Right style={Platform.OS === 'android' ? {flex:1} : null}>
                {dataLength != 0 &&
                    <Button 
                        onPress = {()=>handleDelete()}
                        primary 
                        transparent
                    >
                        <Icon name="trash-o" type='FontAwesome'/>
                    </Button>
                }
        	</Right>
 	   </Header>
	);
}

Head.proptypes = {
    dataLength : PropTypes.number.isRequired,
    handleDelete : PropTypes.func.isRequired
};

export default Head;