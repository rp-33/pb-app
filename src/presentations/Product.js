import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableNativeFeedback
} from 'react-native';
import color from '../theme/color';
import PropTypes from 'prop-types';
import Rating from './Rating';

const Product = ({product,handleNavigationDetails})=>{

	return(
		<TouchableNativeFeedback
			onPress = {()=>handleNavigationDetails(product._id,product.name)}
		>
			<View style={styles.ctn}>
				<Image 
					style = {styles.image}
					source ={require('../assets/images/backgroundPets.png')}
				/>
				<View style={styles.ctnInf}>
					<Text style={styles.name}>item.name</Text>
					<View style={styles.price}>
						<Text style={styles.textPrice}>price</Text>
					</View>
					<Text style={styles.distance}>item.distance</Text>
				</View>
				<Rating 
					value = {4}
					style = {styles.rating}
				/>
			</View>
		</TouchableNativeFeedback>
	)
}

const styles = StyleSheet.create({
	ctn:{
		flexDirection:'row',
		position:'relative',
		marginBottom:20,
		borderBottomWidth:1,
		borderBottomColor:'#f1f1f1',
		paddingBottom:10,
		marginHorizontal:10
	},
	image : {
		width:80,
		height:80,
		borderRadius:20
	},
	ctnInf:{
		height:'100%',
		marginTop:13,
		marginLeft:20
	},
	name : {
		fontWeight:'bold',
		fontSize:16
	},
	price:{
		flexDirection:'row',
		alignItems:'center'
	},
	textPrice:{
		marginTop:5,
	},
	distance:{
		color:'#c7c7c7'
	},
	rating : {
		position:'absolute',
		top:0,
		right:10
	}
})

export default Product;