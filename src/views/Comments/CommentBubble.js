import React from 'react';
import {
	View,
	Image,
	Text,
	StyleSheet
} from 'react-native';
import themeColor from '../../theme/color';

const CommentBubble = ()=>{
	return(
		<View style={styles.ctn}>
			<Image 
				style={styles.avatar}
				source = {{uri:'http://192.168.1.4:8888/uploads/file-159063549417003ef47eb-526f-4b88-b3fd-db18cbf56519.jpg'}}
			/>
			<View style={styles.bubble}>
				<View style={styles.ctnText}>
					<Text style={styles.name}>displayName</Text>
					<Text> ala </Text>
					<Text style={styles.date}>hoy</Text>
				</View>
			</View>

		</View>
	)
}

const styles = StyleSheet.create({
	ctn:{
		width:'100%',
		height:'auto',
		paddingHorizontal:10,
		marginBottom:20,
		flexDirection:'row'
	},
	avatar:{
		width:50,
		height:50,
		borderRadius:25,
		marginRight:10
	},
	bubble:{
		marginRight:70
	},
	ctnText:{
		paddingHorizontal:10,
		paddingVertical:5,
		width:'auto',
		backgroundColor:'#f1f1f1',
		borderBottomRightRadius:20,
		borderBottomLeftRadius:20,
		borderTopRightRadius:20,
		borderTopLeftRadius:1,
	},
	name :{
		fontWeight:'bold',
		textTransform:'capitalize'
	},
	date:{
		color:themeColor.primary,
		marginTop:5,
		textAlign:'right'
	}

})

export default CommentBubble;