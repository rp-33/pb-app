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

const Head = ({ handleBack,handleNavigation }) => (
	<Header noShadow style={{borderBottomWidth: 0,backgroundColor: 'white'}} iosBarStyle='dark-content' androidStatusBarColor='white'>
        <Left style={Platform.OS === 'android' ? {flex:1} : null}>
            <Button primary transparent onPress={()=>handleBack()}>
                <Icon name="ios-arrow-back" type='Ionicons'/>
            </Button>           
        </Left>
        <Body style={Platform.OS === 'android' ? {flex:2,alignItems: 'center'} : null}>
             <Image source ={require('../../assets/images/logo.png')} style={{width:30,height:30}} />
        </Body>
        <Right style={Platform.OS === 'android' ? {flex:1} : null}>
            <Button primary onPress={handleNavigation} transparent>
                <Icon name="ios-chatbubbles" type="Ionicons" />             
            </Button>
        </Right>
    </Header>
);


Head.proptypes = {
    handleBack : PropTypes.func.isRequired,
    handleNavigation : PropTypes.func.isRequired
};

export default Head;