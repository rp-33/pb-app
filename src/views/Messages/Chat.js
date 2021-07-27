import React from 'react';
import {
	View,
	StyleSheet,
	TouchableNativeFeedback,
	Text,
	Image
} from 'react-native';
import {Icon} from 'native-base';
import themeColor from '../../theme/color';
import PropTypes from 'prop-types';
import {date} from '../../utils/date';

const Chat = ({item,handleSelect,handleAddDelete,arrayDelete})=>{

	const message = (type,text)=>{
		switch (type) {
			case 'image':
				return 'Image';
			case 'location':
				return 'Location';
			default:
				return text;
		}
	}


	return(
	<TouchableNativeFeedback
		onLongPress = {()=>handleAddDelete(item._id)} 
		onPress={()=>handleSelect(item)}
	>
		<View style={styles.list}>
			<View style={styles.left}>
				<Image 
					source = {{uri :item.user.avatar}}
					style = {styles.avatar}
				/>
				{arrayDelete.includes(item._id) &&
					<View style={styles.ctnIconDelete}>
					 	<Icon name="check" 
					 		type='FontAwesome'
					 		style={{color:'white',fontSize:10}}
						/>
					</View>
				}
			</View>
			<View style={styles.body}>
				<Text style={styles.displayname}>{item.user.petName}</Text>
				<Text 
					numberOfLines = {2}
					style={styles.msm}
				>	
					{message(item.message[0].type,item.message[0].text)}
				</Text>
			</View>
			<View style={styles.right}>
				<Text style={styles.time}>{date(item.message[0].time)}</Text>
				<View style={styles.badge}>
					<Text style={styles.timeText}>9</Text>
				</View>
			</View>
		</View>
	</TouchableNativeFeedback>
	)
}

Chat.propTypes = {
	_id :PropTypes.string.isRequired,
	message : PropTypes.shape({
		id: PropTypes.string.isRequired, 
		receiver: PropTypes.string.isRequired,
		sender: PropTypes.string.isRequired ,
		status: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired, 
		time: PropTypes.number.isRequired,
		type: PropTypes.string.isRequired
	}),
	user : PropTypes.shape({
		_id:PropTypes.string.isRequired,
		avatar:PropTypes.string.isRequired,
		petName : PropTypes.string.isRequired
	}),
	handleAddDelete : PropTypes.func.isRequired,
	handleSelect : PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	list : {
		height:80,
		flex:1,
		paddingRight:20,
		flexDirection:'row',
		borderBottomWidth:1,
		borderBottomColor:'#f1f1f1',
		alignItems:'center'
	},
	left : {
		width: 80,
		position:'relative',
		marginLeft:10
	},
	avatar : {
		width:60,
		height:60,
		borderRadius:30
	},
	body:{
		flex:1,
		marginTop:2
	},
	displayname:{
		textTransform:'capitalize',
		fontWeight:'bold'
	},
	msm:{
		color:'gray'
	},
	right:{
		alignItems:'flex-end',
		paddingLeft:10,
		marginTop:2
	},
	time : {
		color:themeColor.secondary,
		marginBottom:4
	},
	badge:{
		backgroundColor:themeColor.primary,
		width:30,
		height:30,
		justifyContent:'center',
		alignItems: 'center',
		borderRadius:15
	},
	timeText:{
		fontSize:11,
		color:'white',
	},
	ctnIconDelete : {
		width:20,
		height:20,
		borderRadius : 10,
		position : 'absolute',
		left:43,
		bottom:0,
		backgroundColor:themeColor.primary,
		borderWidth:2,
		borderColor:'white',
		justifyContent:'center',
		alignItems:'center'
	}
})

export default Chat;