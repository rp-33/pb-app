import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
	Dimensions
} from 'react-native';
import {Icon} from 'native-base';
import {date} from '../../utils/date';
import themeColor from '../../theme/color';

let {width} = Dimensions.get('window');
let SCREEN = width - 100;

const ChatBubble = ({message,myUser})=>{

	const icon = (status)=>{
		switch (status) {
			case 'not-send':
				return 'clock-outline';
			case 'sent':
				return 'check'
			case 'received':
				return 'check'
			case 'seen':
				return 'check'
			default:
				return 'alert-circle-outline'
		}//['not-send','sent','received','seen','error']
	}

	const iconColor = (status)=>{
		switch (status) {
			case 'error':
				return 'red';
			case 'seen':
				return 'green';
			default:
				return themeColor.secondary;
		}//['not-send','sent','received','seen','error']
	}

	return(
		<View 
			style={[
				styles.ctn,
				{justifyContent : (myUser == message.sender) ? 'flex-end' : 'flex-start'}
			]}
		>
			<View
				style={[
					styles.ctnText,
					myUser == message.sender ? styles.ctnTextMyUser : styles.ctnTextOther
				]}
			>
				{message.type == 'image' &&
					<View style={styles.ctnFile}>
						<Image 
							style={styles.file}
							source = {{uri:message.image}}
						/>
					</View>
				}
				{message.text && <Text>{message.text}</Text>}
				<View style={[styles.time,{justifyContent : (myUser == message.sender) ? 'flex-end' : 'flex-start'}]}>
					<Text style={styles.textTime}>{date(message.time)}</Text>
					<Icon 
                        name={icon(message.status)}
                       	type='MaterialCommunityIcons'
                        style={{fontSize:12,color:iconColor(message.status),marginLeft:5}}
               	    />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	ctn:{
		marginVertical:7,
		marginHorizontal:10,
		flexDirection:'row',
	},
	ctnText:{
		width:'auto',
		paddingVertical:7,
		paddingHorizontal:10,
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 1.25,
		shadowRadius: 3.84,
		elevation: 1,
	},
	ctnTextMyUser:{
		borderBottomRightRadius:1,
		borderBottomLeftRadius:20,
		borderTopRightRadius:20,
		borderTopLeftRadius:20,
		backgroundColor:'white',
	},
	ctnTextOther:{
		borderBottomRightRadius:20,
		borderBottomLeftRadius:1,
		borderTopRightRadius:20,
		borderTopLeftRadius:20,
		backgroundColor:'#f1f1f1',
	},
	time:{
		flexDirection:'row',
		alignItems:'flex-end',
		marginTop:5
	},
	textTime:{
		color:themeColor.secondary
	},
	ctnFile : {
		width:SCREEN,
		height:SCREEN,
		overflow:'hidden'
	},
	file : {
		width:'100%',
		height:'100%',
		borderRadius:7,
	}
})

export default ChatBubble;