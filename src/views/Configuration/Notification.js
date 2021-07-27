import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import {
	Icon
} from 'native-base';
import { Switch } from 'react-native-paper';
import PropTypes from 'prop-types';
import themeColor from '../../theme/color';
import {editNotifications} from '../../api/user';

class Notification extends Component{
	constructor(props){
		super(props);
		this.state = {
			value : props.notifications
		}
	}

	handleChange = async()=>{
		this.setState(prevState=>{
			return{
				value : !prevState.value
			}
		});
		try
		{
			let value = !this.state.value;
			let {status,data} = await editNotifications(value);
			if(status===201)
			{
				this.props.handleNotifications(value,201);
			}
			else
			{
				this.setState(prevState=>{
					return{
						value : !prevState.value
					}
				},()=>{
					this.props.handleNotifications(data.error,400);
            	})
			}
		}
		catch(err)
		{
			this.setState(prevState=>{
				return{
					value : !prevState.value
				}
			},()=>{
				this.props.handleNotifications('Error',500);
            })
		}
	}

	render(){
		return(
			<View style={styles.ctn}>
				<View style={{flexDirection:'row'}}>
					<Icon style={styles.icon} type='FontAwesome5' name='bell' />                
					<Text>Notifications</Text>
				</View>
				 <Switch
        			value={this.state.value}
        			color = {themeColor.primary}
       				onValueChange={this.handleChange}   				
      			/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	ctn:{
		flexDirection:'row',
		justifyContent:'space-between',
		width:'100%'
	},
	icon:{
		marginRight:3,
		fontSize:20,
		color:themeColor.primary
	}
})


Notification.propTypes = {
	notifications : PropTypes.bool.isRequired,
	handleNotifications : PropTypes.func.isRequired
}

export default Notification;