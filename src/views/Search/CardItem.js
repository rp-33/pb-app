import React,{useState,useEffect} from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	Image,
	Text,
	TouchableOpacity
} from 'react-native';
import themeColor from '../../theme/color';
import BarPictures from './BarPictures';

let {width,height} = Dimensions.get('window'),
	SCREEN_WIDTH  = (width - 20) /2;



const CardItem = ({avatar,displayName,pictures})=>{
	const images = [avatar,...pictures];
	const [position,setPosition] = useState(0);

	useEffect(()=>{
		setPosition(0)
	},[avatar])

	const handlePicture = (event)=>{
		if(event.nativeEvent.locationX>SCREEN_WIDTH + 20)
		{
			let lengthPictures = images.length - 1;
			setPosition(position===lengthPictures ? position : position + 1);
			
		}
		else if(event.nativeEvent.locationX<SCREEN_WIDTH - 20)
		{
			setPosition(position === 0 ? position : position - 1)
		}
		
	}


	return(
		<View style={styles.container}>
			<View style={styles.badge}>
				<Text style={styles.badgeText}>{displayName} 25 km near you</Text>
			</View>
			<TouchableOpacity 
				activeOpacity = {1}
				onPress = {(images.length !=1) ? handlePicture : null}
				style={styles.ctnAvatar}
			>
				<BarPictures 
					pictures = {images}
					position = {position}
				/>
				<Image 
					source = {{uri : images[position]}}
					style = {styles.avatar}
				/>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		alignItems: "center",
		marginBottom:10,
		width: width - 40,
		height : height - 200,
		borderWidth:1,
		borderColor:'#c7c7c7',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.25,
		shadowRadius: 0.84,
		elevation: 2,
		position:'relative',
		marginBottom:30,
		overflow:'hidden'
	},
	ctnAvatar: {
		width: '100%',
		height : height - 200
	},
	avatar:{
		width: '100%',
		height : '100%',
		borderRadius: 8,
	},
	badge:{
		paddingLeft:20,
		paddingRight:20,
		paddingTop:6,
		paddingBottom:6,
		borderRadius:25,
		backgroundColor: themeColor.primary,
		justifyContent:'center',
		alignItems:'center',
		position:'absolute',
		top:15,
		left:10,
		zIndex:2
	
	},
	badgeText:{
		color:'white',
		fontWeight:'bold'
	}
});

export default CardItem;