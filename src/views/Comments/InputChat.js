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

	handleSendMessage = ()=>{
		this.props.handleSend(this.state.text);
		this.setState({
			text : ''
		});
	}

	render(){
		return(
			<View style={styles.ctn}>
				<View style={styles.ctnInput}>
					<TextInput
						placeholder = "Escribe un mensaje..."
						placeholderTextColor = "black"
						value = {this.state.text}
						onChangeText = {this.handleChangeText}
						multiline
					/>
            	</View>
            	<TouchableOpacity 
            		activeOpacity = {0.5}
            		onPress = {(this.state.text !=='' && this.state.text.length!=null) ? this.handleSendMessage : null}
            		style={styles.btn}
            	>
            		<Icon name="ios-paper-plane" type='Ionicons' style={{color:themeColor.primary,fontSize:25}}/>
           		</TouchableOpacity>
			</View>
		)
	}
}

InputChat.propTypes = {
	handleSend : PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	ctn : {
		width:'100%',
		paddingHorizontal : 10,
		paddingVertical:5,
		justifyContent:'center',
		alignItems:'center',
		flexDirection:'row',
	},
	btn:{
		width:50,
		height:50,
		backgroundColor: 'white',
		marginLeft:10,
		borderRadius:25,
		justifyContent:'center',
		alignItems:'center',
		borderWidth:2,
		borderColor:themeColor.primary,
		alignSelf:'flex-end'
	},
	ctnInput:{
		position:'relative',
		minHeight:50,
		maxHeight: 150,
		flex:1,
		backgroundColor:'white',
		borderRadius:25,
		borderWidth:1,
		borderColor:themeColor.secondary,
		paddingLeft:10,
		paddingRight:10
	}
})

export default InputChat;