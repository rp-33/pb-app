import React from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	Dimensions,
	Image
} from 'react-native';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

let {width} = Dimensions.get('window'),
	SCREEN_WIDTH = (width - 40)/2,
	SCREEN_HEIGHT = SCREEN_WIDTH * 1.2;

const ItemMatch = ({item,handleNavigation})=>{
	return(		
		<TouchableOpacity
			onPress = {()=>handleNavigation(item._id,item.user)}
			activeOpacity = {0.7}
		>
			<LinearGradient 
				style={styles.card} 
				start={{x: 0, y: 0}} 
				end={{x: 0, y: 2.5}} 
				colors={item.super ? ['transparent', '#dec6fc', '#a763fc'] : ['transparent', '#414141', '#2d2d2d']}
			>
				{item.super &&
					<View style={styles.tact}>
						<Icon 
							type='Ionicons' 
							name='ios-ribbon'
							style={styles.icon}
						/>
					</View>
				}
				<Image source={{uri: item.user.avatar}} style={styles.image} />
				<View style={styles.footer}>
					<Text style={styles.name}>{item.user.displayName}</Text>
				</View>
			</LinearGradient>
		</TouchableOpacity>
	)
}

ItemMatch.propTypes = {
	handleNavigation : PropTypes.func.isRequired,
	item : PropTypes.shape({
		_id : PropTypes.string.isRequired,
		user :  PropTypes.shape({
			displayName: PropTypes.string.isRequired,
			avatar : PropTypes.string.isRequired
		})
	}).isRequired
}

const styles = StyleSheet.create({
	card :{
		width : SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		borderRadius:10,
		margin:10,
		borderWidth:1,
		borderColor:'#f1f1f1',
		overflow:'hidden'
	},
	image : {
		width:'100%',
		height : '100%',
		borderRadius:7,
		position:'absolute',
		zIndex:-1
	},
	footer:{
		justifyContent:'center',
		alignItems:'center',
		height:50,
		width:'100%',
		justifyContent:'center',
		position:'absolute',
		bottom:4
	},
	name:{
		color:'white',
		fontWeight:'bold',
		textTransform:'capitalize'
	},
	tact:{
		position:'absolute',
		zIndex:2,
		top:0,
		left:15,
		backgroundColor:'#7d3ffc',
		height:40,
		width:30,
		justifyContent:'center',
		alignItems:'center',
		borderBottomLeftRadius:20,
		borderBottomRightRadius:20
	},
	icon:{
		color:'white',
		fontSize:22
	}
})

export default ItemMatch;