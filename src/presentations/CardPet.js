import React from 'react';
import {
	TouchableOpacity,
	View,
	Image,
	StyleSheet,
	Text,
	Dimensions
} from 'react-native';
import {Icon} from 'native-base';
import PropTypes from 'prop-types';
import themeColor from '../theme/color';
import {imagePet} from '../utils/imagePet';

let {width} = Dimensions.get('window'),
	SCREEN_WIDTH = (width - 60)/3,
	SCREEN_HEIGHT = SCREEN_WIDTH;

const CardPet = ({pet,petSelect,handleSelect})=>{

	return(
		<TouchableOpacity
			onPress = {()=>handleSelect(pet)}
		>
			{
				petSelect === pet &&
				<Icon 
					name="check" 
					type='FontAwesome'
					style={styles.icon}
				/>

			}
			<View style={styles.card}>
				<Image source ={ imagePet(pet)} style={styles.image} />
				<View style={styles.footer}>
					<Text style={styles.name}>{pet}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

CardPet.propTypes = {
	pet : PropTypes.string.isRequired,
	petSelect : PropTypes.string.isRequired,
	handleSelect : PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	card :{
		width : SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		borderRadius:10,
		margin:10,
		borderWidth:1,
		borderColor:'#c7c7c7',
		overflow:'hidden',
		backgroundColor:'white',
		justifyContent:'center',
		alignItems:'center',
		position:'relative'
	},
	image : {
		width:'50%',
		height : '50%',
		borderRadius:7,
		position:'absolute',
		zIndex:-1
	},
	footer:{
		justifyContent:'center',
		alignItems:'center',
		height:25,
		width:'100%',
		justifyContent:'center',
		position:'absolute',
		bottom:0
	},
	name:{
		fontWeight:'bold',
		textTransform:'capitalize'
	},
	icon:{
		color:themeColor.primary,
		fontSize:25,
		position:'absolute',
		top:3,
		right:7,
		zIndex:1000
	}
})

export default CardPet;