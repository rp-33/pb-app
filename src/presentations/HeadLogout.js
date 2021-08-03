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
import themeColor from '../theme/color';
import PropTypes from 'prop-types';

const Head = ({ handleBack, title,handleLogout }) => (
	<Header noShadow style={{borderBottomWidth: 0,backgroundColor: 'white'}} iosBarStyle='dark-content' androidStatusBarColor='white'>
        <Left style={Platform.OS === 'android' ? {flex:1} : null}>
        	{handleBack &&
            <Button primary transparent onPress={()=>handleBack()}>
                <Icon name="ios-arrow-back" type='Ionicons'/>
            </Button>
           	}           
        </Left>
        <Body style={Platform.OS === 'android' ? {flex:2,alignItems: 'center'} : null}>
            {!title 
            ?
         	    <Image source ={require('../assets/images/logo.png')} style={{width:30,height:30}} />       	
            :
                <Text
                    style = {{fontWeight:'bold',color:themeColor.primary}}
                >
                    {title}
                </Text>
            }
        </Body>
        <Right style={Platform.OS === 'android' ? {flex:1} : null}>
            <Button primary onPress={handleLogout} transparent>
                <Text style={{color:themeColor.primary}}>Logout</Text>
                <Icon size={20} name={Platform.OS === 'android' ? 'md-exit' : 'ios-exit'}/>             
            </Button>
        </Right>
    </Header>
);


Head.proptypes = {
    handleBack : PropTypes.func,
    title : PropTypes.string,
    handleLogout : PropTypes.func.isRequired
};

export default Head;