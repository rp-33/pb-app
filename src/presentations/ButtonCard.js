import React from 'react';
import {
	Image,
	View,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

const ButtonCard = ({image,text,onPress,style})=>{

	const handleImage = (img)=>{
		switch (img) {
			case 'init':
        		return (
        			<Image 
			 			style = {styles.img}
			 			source ={require('../assets/images/init.png')} 
					/>
				)
        	default:
            	return (
        			<Image 
			 			style = {styles.img}
			 			source ={require('../assets/images/logo.png')} 
					/>
				)
        }
	}

	return(
		<TouchableOpacity
			onPress = {()=>onPress()}
			style = {style}
		>
			<View style={styles.ctn}>
				{handleImage(image)}
				<Text>{text}</Text> 
			</View>      	
		</TouchableOpacity>
	)
}

ButtonCard.propTypes = {
	image : PropTypes.string.isRequired,
	text : PropTypes.string.isRequired,
	onPress : PropTypes.func.isRequired,
	style : PropTypes.object
}

const styles = StyleSheet.create({
	ctn:{
		flexDirection:'row',
		alignItems:'center',
		height:55,
		paddingHorizontal:10,
		borderWidth:1,
		borderColor:'#c7c7c7',
		borderRadius:15,
		overflow:'hidden',
	},
	img:{
		width:30,
		height:30,
		marginRight:10
	}
})


export default ButtonCard