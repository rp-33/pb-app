import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions
} from 'react-native';
import LottieView from 'lottie-react-native';

let {width,height} = Dimensions.get('window');

const NoMoreData  = ({})=> {
	return(	
		<View style={styles.ctn}>
			<View style={styles.animation}>
				<LottieView 
				style={{width:200}} 
				source={require('../../assets/animations/dog.json')} 
				autoPlay={true}
				/>
       			<Text style={{color:'black',fontSize:15,fontWeight:'bold'}}>Search Pets</Text>
   			</View>
   		</View>
   	)
}

const styles = StyleSheet.create({
	ctn:{
		width,
		height,
		justifyContent:'center',
		alignItems:'center',
		marginTop:100
	},
	animation:{
		marginBottom:height * 0.25,
		justifyContent:'center',
		alignItems:'center'
	}
})

export default NoMoreData;
