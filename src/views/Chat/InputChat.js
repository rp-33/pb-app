import React,{Component} from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput
} from 'react-native';
import {
	Icon
} from 'native-base';
import PropTypes from 'prop-types';
import themeColor from '../../theme/color';

class InputChat extends Component{
	constructor(props){
		super(props);
		this.state = {
			text : ''
		}
	}

	handleChangeText = value=>this.setState({text : value});

	handleModalBottom = ()=>this.props.handleModal();

	handleSendMessage = ()=>{
		this.props.setMessage(this.state.text);
		this.setState({
			text : ''
		});
	}

	render(){
		return(
			<View style={styles.ctn}>
				<View style={styles.ctnInput}>
					<TextInput
						placeholder = "Write a message..."
						placeholderTextColor = "black"
						value = {this.state.text}
						onChangeText = {this.handleChangeText}
					/>
					<TouchableOpacity 
						onPress = {this.handleModalBottom}
            			style={styles.archive}
            		>
            			<Icon 
            				name="ios-attach" 
            				type='Ionicons' 
            				style={{color:themeColor.secondary,fontSize:22}}
            			/>
           			</TouchableOpacity>
            	</View>
            	<TouchableOpacity 
            		activeOpacity = {0.5}
            		onPress = {(this.state.text !=='' && this.state.text.length!=null) ? this.handleSendMessage : null}
            		style={styles.btn}
            	>
            		<Icon name="ios-paper-plane" type='Ionicons' style={{color:'white'}}/>
           		</TouchableOpacity>
			</View>
		)
	}
}

InputChat.propTypes = {
	handleModal : PropTypes.func.isRequired,
	setMessage : PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	ctn : {
		width:'100%',
		height:60,
		paddingHorizontal : 10,
		justifyContent:'center',
		alignItems:'center',
		flexDirection:'row'
	},
	btn:{
		width:50,
		height:50,
		backgroundColor: themeColor.primary,
		marginLeft:10,
		borderRadius:25,
		justifyContent:'center',
		alignItems:'center'
	},
	ctnInput:{
		position:'relative',
		height:50,
		flex:1,
		backgroundColor:'white',
		borderRadius:25,
		borderWidth:1,
		borderColor:'#f1f1f1',
		paddingLeft:10,
		paddingRight:40
	},
	archive:{
		position:'absolute',
		top:14,
		right:15
	}
})

export default InputChat;