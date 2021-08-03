import React from 'react';
import{
	View,
	TouchableOpacity,
	Text,
	Image,
	StyleSheet
} from 'react-native';
import themeColor from '../../theme/color'
import PropTypes from 'prop-types';

const Roltype = ({text,rol,handleSelect})=>{

	const handleImage = (type)=>{
		switch (type) {
        	case 'user':
        		return (
        			<Image 
			 			style = {styles.image}
			 			source ={require('../../assets/images/user.png')} 
					/>
				)
			case 'business':
        		return (
        			<Image 
			 			style = {styles.image}
			 			source ={require('../../assets/images/business.png')} 
					/>
				)
        	default:
            	return (
        			<Image 
			 			style = {styles.image}
			 			source ={require('../../assets/images/logo.png')} 
					/>
				)
        }
	}

	return(
		<TouchableOpacity 
			style={styles.card}
			onPress = {()=>handleSelect(rol)}
		>
			{handleImage(rol)}
            <View style={styles.ctnText}>
            	<Text style={styles.text}>{text}</Text>
            </View>
		</TouchableOpacity>

	)
}

Roltype.propTypes = {
	rol :PropTypes.string.isRequired,
	handleSelect : PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	card:{
		width:'100%',
		height:120,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.5,
		shadowRadius: 20,
		elevation: 1.61,
		borderRadius:20,
		marginBottom:40,
		overflow:'hidden',
		position:'relative'
	},
	image:{
		width:'100%',
		height:120
	},
	ctnText:{
		position:'absolute',
		bottom:10,
		left:10,
		zIndex:2
	},
	text:{
		fontWeight:'bold',
		color:'black'
	}
})
export default Roltype;