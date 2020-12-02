import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image
} from 'react-native';
import {
	H3,
	Icon,
	Button
} from 'native-base';
import themeColor from '../theme/color';
import PropTypes from 'prop-types';

const ItemCardPet = ({user,handleComments})=>{
	return(
		<View style={styles.card}>
			<View style={styles.ctnLeft}>
				<Image 
					style = {styles.avatar}
					source = {{uri:user.avatar}}
				/>
			</View>
			<View style={styles.ctnRight}>
				<H3 style={{textTransform:'capitalize'}}>{user.displayName}</H3>
				<Text style={{color:themeColor.secondary,marginVertical:6}}>{user.age} years old</Text>
				<View style={{flexDirection:'row'}}>
					<Icon style={styles.iconPoint} type='ionicons' name='ios-pin' />									
					<Text style={styles.textDistance}>Distance : </Text>
					<Text>3.5 km</Text>
				</View>
				<Icon 
					style={[styles.iconSex,{color:user.sex == 'male' ? 'blue' : 'pink'}]} 
					type='ionicons' 
					name={user.sex == 'male' ? 'ios-male' : 'ios-female'}
				/>	
				 <Button 
				 	transparent 
				 	style={styles.btnComment}
				 	onPress = {()=>handleComments()}
				 >
                    <Icon 
						type='ionicons' 
						name="ios-chatbubbles"
						style = {{color:themeColor.secondary}}
					/>	
                </Button>
									
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card:{
		marginHorizontal:10,
		height:100,
		marginVertical:10,
		borderRadius:20,
		backgroundColor:'white',
		shadowColor: "#000",
		borderWidth:1,
		borderColor:'#f1f1f1',
		shadowOffset: {
			width: 1,
			height: 1,
		},
		shadowOpacity: 0.25,
		shadowRadius: 7.84,
		elevation: 2.5,
		overflow:'hidden',
		flexDirection:'row'
	},
	ctnLeft:{
		width:100,
		height : '100%',
		borderRadius:15,
		overflow:'hidden'
	},
	avatar : {
		width:'100%',
		height:'100%'
	},
	ctnRight:{
		paddingHorizontal:10,
		paddingVertical:10,
		position:'relative',
		flex:1
	},
	iconPoint : {
		color:themeColor.primary,
		fontSize:16
	},
	textDistance : {
		fontWeight:'bold',
		marginHorizontal:5
	},
	iconSex :{
		position:'absolute',
		top:10,
		right:15,
		fontSize:16
	},
	btnComment : {
		position:'absolute',
		top:30,
		right:-5,
	}
})

export default ItemCardPet;