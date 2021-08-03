import React from 'react';
import {
    Text,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Header,
    Left,
    Right,
    Body,
    Button,
    Icon
} from 'native-base';
import { Badge } from 'react-native-paper';
import themeColor from '../../theme/color';
import PropTypes from 'prop-types';

const Head = ({cart,handleNavigation}) => (
	<Header noShadow style={styles.head} iosBarStyle='dark-content' androidStatusBarColor='white'>
        <Left>
        	<Button primary transparent>
                <Icon type='EvilIcons' name="location" />	
            </Button>
        </Left>
        <Body style={Platform.OS === 'android' ? {flex:2,alignItems: 'center'} : null}>
            <TouchableOpacity 
                style={styles.search}
                onPress = {()=>handleNavigation('SearchProduct')}
            >
                <Text>Search...</Text>
            </TouchableOpacity>
        </Body>
        <Right>
        	<Button primary transparent>
                <Icon type='EvilIcons' name="cart" />
                {cart !== 0 && <Badge style={styles.badge}>{cart}</Badge>}
            </Button>      
        </Right>
    </Header>
);


Head.proptypes = {
    cart : PropTypes.number.isRequired,
    handleNavigation : PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    head : {
        borderBottomWidth: 0,
        backgroundColor: 'white'
    },
    search : {
        backgroundColor : 'white',
        width:'100%',
        height:30,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#c1c1c1',
        paddingHorizontal:10,
        justifyContent:'center'
    },
    badge:{
        position:'absolute',
        top:5,
        right:1
    }
})

export default Head;