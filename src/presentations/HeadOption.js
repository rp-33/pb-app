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

const HeadOption = ({title}) => (
	<Header noShadow style={{borderBottomWidth: 0,backgroundColor: 'white'}} iosBarStyle='dark-content' androidStatusBarColor='white'>
        <Left style={Platform.OS === 'android' ? {flex:1} : null}>
        	<Button primary transparent>
                <Icon type='ionicons' name="ios-notifications-outline" />	
            </Button>
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
        	<Button primary transparent>
                <Icon type='ionicons' name="ios-add-circle-outline" />	
            </Button>
        </Right>
    </Header>
);


HeadOption.proptypes = {
	title : PropTypes.string
};

export default HeadOption;