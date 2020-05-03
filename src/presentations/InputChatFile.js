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
import themeColor from '../theme/color';

class InputChat extends Component{
	constructor(props){
		super(props);
		this.state = {
			text : ''
		}
	}

	handleChangeText = value=>this.setState({text : value});

	handleSendMessage = ()=>{
		this.props.setMessage(this.state.text);
	}

	render(){
		return(
			<View style={styles.ctn}>
				<View style={styles.ctnInput}>
					<TextInput
						placeholder = "Write a message..."
						placeholderTextColor = "white"
						value = {this.state.text}
						onChangeText = {this.handleChangeText}
					/>
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
	setMessage : PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	ctn : {
		width:'100%',
		height:60,
		paddingHorizontal : 10,
		justifyContent:'center',
		alignItems:'center',
		flexDirection:'row',
		position:'absolute',
		bottom:0,
		backgroundColor:'rgba(0,0,0,.5)'
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
		paddingLeft:5,
		paddingRight:5,
	}
})

export default InputChat;