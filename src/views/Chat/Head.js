import React from 'react';
import {
    Text,
    Image,
    Platform,
    TouchableOpacity,
    StyleSheet,
    View
} from 'react-native';
import {
    Header,
    Right,
    Body,
    Button,
    Icon
} from 'native-base';
import themeColor from '../../theme/color';
import PropTypes from 'prop-types';

const Head = ({avatar,displayName,handleBack}) => (
	<Header noShadow style={{borderBottomWidth: 0,backgroundColor: themeColor.primary}} iosBarStyle='dark-content' androidStatusBarColor='white'>
        <View
        	style={styles.left}
        >
        	<Button transparent onPress={()=>handleBack()}>
        		<Icon name="ios-arrow-back" type='Ionicons' style={{color:'white'}}/>
        	</Button>
        	<TouchableOpacity style={styles.left}>
        		<Image 
        		style={styles.avatar}
        		source={{uri:avatar}} 
        		/>          
            	<Text style={styles.name}>{displayName}</Text>
            </TouchableOpacity>
        </View>
        <Body style={Platform.OS === 'android' ? {flex:3,alignItems: 'center'} : null} />
        <Right style={Platform.OS === 'android' ? {flex:1} : null} />
    </Header>
);

Head.propTypes = {
	displayName :  PropTypes.string.isRequired,
	avatar : PropTypes.string.isRequired,
	handleBack : PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	left:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	avatar : {
		width:30,
		height:30,
		borderRadius:10,
		marginHorizontal:10
	},
	name :{
		color:'white',
		fontWeight:'bold',
		textTransform:'capitalize'
	}
})

export default Head;