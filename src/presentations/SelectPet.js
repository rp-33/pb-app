import React from 'react';
import {
	FlatList,
	TouchableOpacity,
	Image,
	StyleSheet
} from 'react-native';
import {pets} from '../json/pets';
import {imagePet} from '../utils/imagePet';
import themeColor from '../theme/color';
import PropTypes from 'prop-types';

const SelectPet = ({petSelect,handleSelectPet})=>{

	return(
		<FlatList 
        	horizontal={true}
        	showsHorizontalScrollIndicator = {false}
        	keyExtractor={(item, index) => index.toString()}
        	data = {pets()}
        	contentContainerStyle ={{
        	alignItems : 'center',
        	paddingVertical: 5,
        	paddingHorizontal: 5,
        	height:65,
        	}}
        	renderItem = {({item,index})=>(
        		<TouchableOpacity 
                	key = {item}
        			onPress = {()=>handleSelectPet(item)}
        			style={[styles.ctnImage,{backgroundColor: item == petSelect ? themeColor.primary : 'white'}]}
        		>
        	    	<Image 
        	            source ={ imagePet(item)}
        	            style={styles.image}
        	        /> 
        		</TouchableOpacity>
        	)}
    	/>
    )
}

SelectPet.propTypes = {
    petSelect : PropTypes.string.isRequired,
    handleSelectPet :PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	ctnImage : {
		width:60,
		height:60,
		justifyContent:'center',
		alignItems:'center',
		borderWidth:1,
		borderColor:themeColor.secondary,
		marginHorizontal:5,
		borderRadius:10
	},
	image :{
		width:30,
		height:30,
	}
})

export default SelectPet;
