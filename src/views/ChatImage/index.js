import React,{Component} from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image
} from 'react-native';
import {
	Container,
	Icon,
	Toast
} from 'native-base';
import Head from './Head';
import InputChat from '../../presentations/InputChatFile';

class ChatImage extends Component{
	constructor(props){
		super(props);
		this.state = {
			location :{
				latitude : null,
				longitude : null
			},
			errorLocation : false,
			findLocation : false
		}
		this.image = this.props.navigation.getParam('image');
	}

	
	handleBack = ()=> this.props.navigation.goBack();

	handleSend = (text)=>{
		let {navigate} = this.props.navigation;
		navigate('Chat',{image:this.image,text:text});
	}

	render(){
		return(
			<Container>
				<Head 
					handleBack = {this.handleBack}
				/>
				<View style={styles.ctnMap}>
					<Image 
						source = {{uri : this.image}}
						style = {styles.image}
					/>
					<InputChat 
						setMessage = {this.handleSend}
					/>
           		</View>
				
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	ctnMap : {
		backgroundColor : 'white',
		flex:1
	},
	image : {
		flex:1
	}
})

export default ChatImage;