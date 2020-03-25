import React from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import {
	H3,
	Icon,
	Text
} from 'native-base';
import PropTypes from 'prop-types';

const TextBiography = ({biography,handleModal})=>{
	return(
		<TouchableOpacity 
			style={styles.ctnText}
			onPress = {handleModal}
		>
			<View style={styles.edit}>
				<H3>Biography</H3>
				 <Icon 
				 	name="md-create" 
				 	type='Ionicons'
				 	style={styles.icon}
				 />
			</View>
			<View>
				{biography
					?
					<Text>
						{biography}
					</Text>
					:
					<Text style={{color:'#c7c7c7'}}>
						Tell us more about you
					</Text>
				}
			</View>
		</TouchableOpacity>
	)
}


const styles = StyleSheet.create({
	ctnText : {
		marginLeft:10,
		marginVertical : 10
	},
	edit : {
		flexDirection:'row'
	},
	icon : {
		marginLeft:10,
		fontSize: 20,
		marginTop:3
	}
})

TextBiography.proptypes = {
    biography : PropTypes.bool.isRequired,
    handleModal : PropTypes.func.isRequired
};

export default TextBiography;