import React,{Component} from 'react';
import {
	View,
	StyleSheet
} from 'react-native';
import {Container} from 'native-base';
import RolType from './RolType';
import HeadBack from '../../presentations/HeadBack';

class Rol extends Component{

	handleSelect = rol=>{
		let {action} = this.props.navigation.state.params;

		if(action==='signup')
		{
			this.props.navigation.push(rol === 'business' ? 'SignupBusiness' : 'Signup');
		}
		else
		{
			this.props.navigation.push('Login',{rol:rol});
		}
	}

	_handleBack = ()=>this.props.navigation.navigate('Home');
	
	render(){
		return(
			<Container>
				<HeadBack
					title = 'Select rol'
					handleBack = {this._handleBack}
				/>
				<View style={styles.ctn}>
					<RolType 
					rol = 'user'
					text = 'User'
					handleSelect = {this.handleSelect}
					/>
					<RolType 
					rol = 'business'
					text = 'Business'
					handleSelect = {this.handleSelect}
					/>
				</View>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	ctn:{
		paddingHorizontal: 10,
		justifyContent:'center'
	}
})

export default Rol;