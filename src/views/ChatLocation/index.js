import React,{Component} from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import {
	Container,
	Icon,
	Toast
} from 'native-base';
import MapLocation from '../../presentations/MapLocation';
import Head from './Head';
import InputChat from '../../presentations/InputChatFile';
import {permissionsLocation} from '../../services/permissions';
import {geolocation} from '../../services/geolocation';

class ChatLocation extends Component{
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
	}

	componentDidMount(){
      this.getPosition();
    }

	async getPosition(){
        const granted = await permissionsLocation('location');
        if(granted == 'authorized' || granted == 'granted'){
        	let coords = await geolocation();
        	if(coords.latitude && coords.longitude)
        	{
        		this.setState({
        			location :{
        				longitude : coords.longitude,
        				latitude: coords.latitude
        			}
        		})
        	}
          	else
          	{
          		Toast.show({
                	text: 'Error',
                	textStyle: { fontSize: 15  },
                	buttonTextStyle: { color: '#000000', fontSize: 15 },
                	buttonText: "Ok",
                	duration: 3000,
                	type:'danger'
            	}) 
          	}
         
        }
        else if(granted == 'denied')
        {
 			Toast.show({
                text: 'Error',
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Ok",
                duration: 3000,
                type:'danger'
            }) 
        }
    }

	handleBack = ()=> this.props.navigation.goBack();

	handleSend = (text)=>{
		let {navigate} = this.props.navigation;
		navigate('Chat',{location:this.state.location,text:text});
	}

	render(){
		return(
			<Container>
				<Head 
					handleBack = {this.handleBack}
				/>
				{
					this.state.location.latitude &&
					<View style={styles.ctnMap}>
						<MapLocation 
							location = {this.state.location}
						/>
						<InputChat 
							setMessage = {this.handleSend}
						/>
           			</View>
				}
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	ctnMap : {
		backgroundColor : 'white',
		flex:1
	}
})

export default ChatLocation;