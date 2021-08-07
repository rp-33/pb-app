import React from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';
import themeColor from '../../theme/color'
import PropTypes from 'prop-types';

const TabType = ({type,handleSelect})=>{

	return(
		<View style={styles.ctn}>
			<TouchableOpacity 
				onPress = {()=>handleSelect('food')}
				style={[styles.item,{borderBottomWidth:type == 'food' ? 3 : 0}]}
			>
				<Text>Food</Text>
			</TouchableOpacity>
			<TouchableOpacity 
				onPress = {()=>handleSelect('accessory')}
				style={[styles.item,{borderBottomWidth:type == 'accessory' ? 3 : 0}]}
			>
				<Text>accessory</Text>
			</TouchableOpacity>
		</View>
	)
}

TabType.propTypes = {
	type : PropTypes.string.isRequired,
	handleSelect : PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	ctn:{
		flexDirection:'row',
		height:40,
		flex:1,
		paddingHorizontal:15
	},
	item:{
		flex:1,
		textAlign:'center',
		justifyContent:'center',
		alignItems:'center',
		borderColor:themeColor.primary
	}
})

export default TabType;