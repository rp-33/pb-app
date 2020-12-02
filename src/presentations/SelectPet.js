import React from 'react';
import {
	ScrollView,
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
		<ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator = {false}
        contentContainerStyle ={{
        	alignItems : 'center',
        	paddingVertical: 5,
        	paddingHorizontal: 5,
        	height:65,
        }}
    	>
    		{pets().map((pet,i)=>
        		<TouchableOpacity 
                    key = {pet}
        			onPress = {()=>handleSelectPet(pet)}
        			style={[styles.ctnImage,{backgroundColor: pet == petSelect ? themeColor.primary : 'white'}]}
        		>
        	    	<Image 
        	            source ={ imagePet(pet)}
        	            style={styles.image}
        	        /> 
        		</TouchableOpacity>
        		
        	)}
    	</ScrollView>
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
