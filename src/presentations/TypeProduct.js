import React from 'react';
import {
	FlatList,
	TouchableOpacity,
	Image,
	StyleSheet
} from 'react-native';
import {typeProduct} from '../json/typeProduct';
import {imageTypeProduct} from '../utils/imageTypeProduct';
import themeColor from '../theme/color';
import PropTypes from 'prop-types';

const TypeProduct = ({type,handleSelect})=>{

	return(
		<FlatList 
			style = {styles.flatlist}
        	horizontal={true}
        	showsHorizontalScrollIndicator = {false}
        	keyExtractor={(item, index) => index.toString()}
        	data = {typeProduct()}
        	contentContainerStyle ={{
        	alignItems : 'center',
        	paddingVertical: 5,
        	paddingHorizontal: 5,
        	height:65,
        	}}
        	renderItem = {({item,index})=>(
        		<TouchableOpacity 
                	key = {item}
        			onPress = {()=>handleSelect(item)}
        			style={[styles.ctnImage,{backgroundColor: item == type ? themeColor.primary : 'white'}]}
        		>
        	    	<Image 
        	            source ={imageTypeProduct(item)}
        	            style={styles.image}
        	        /> 
        		</TouchableOpacity>
        	)}
    	/>
    )
}

TypeProduct.propTypes = {
    type : PropTypes.string.isRequired,
    handleSelect :PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	flatlist : {
		marginVertical : 10,
		paddingBottom : 20
	},
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

export default TypeProduct;
