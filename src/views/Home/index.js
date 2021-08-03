import React,{Component} from 'react';
import {
	StyleSheet,
	ImageBackground,
	View
} from 'react-native';
import {
	Button,
	Text,
	H1
} from 'native-base';

class Home extends Component{

	_handleSignup = ()=>{
		this.props.navigation.push('Signup',{action:'signug'});
	}

	_handleLogin = ()=>{
		this.props.navigation.push('Login',{action:'login'});
	}

	render(){
		return(
			<ImageBackground 
				source={require('../../assets/images/backgroundPets.png')} 
				style={styles.ctn}
			>
				<View style={styles.ctnButton}>
					<H1 style={styles.title}>Pets Benefits</H1>	
					<Button 
						light 
						full 
						rounded 
						style={styles.btnSignup}
						onPress = {this._handleSignup}
					>
            			<Text style={styles.text}>Sign up</Text>
          			</Button>
          			<Button 
          				full 
          				rounded
          				onPress = {this._handleLogin}
          			>
            			<Text style={styles.text}>Log in</Text>
          			</Button>
          		</View>
			</ImageBackground>
		)
	}
}

const styles = StyleSheet.create({
	ctn : {
		width:'100%',
		height:'100%',
		justifyContent:'flex-end',
		alignItems:'center'
	},
	ctnButton:{
		width:210,
		marginBottom:40,
		alignItems:'center'
	},
	btnSignup:{
		marginVertical:20
	},
	text:{
		fontWeight:'bold'
	},
	title:{
		fontFamily:'parisienne'
	}

})

export default Home;