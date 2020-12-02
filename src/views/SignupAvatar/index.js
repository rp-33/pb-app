import React,{Component} from 'react';
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Text
} from 'react-native';
import {
	Container,
	Button,
	Icon,
	Toast
} from 'native-base';
import ModalBottom from './ModalBottom';
import HeadBack from '../../presentations/HeadBack';
import themeColor from '../../theme/color';

class SignupAvatar extends Component{
	constructor(props){
		super(props);
		this.state = {
			avatar : '',
			modal : false
		};
		this.displayName  = this.props.navigation.getParam('displayName')
	}

	_handleBack = () => this.props.navigation.goBack();

	setAvatar = (avatar) => this.setState({ avatar });

	handleModal = ()=>{
		this.setState(previosState=>{
			return{
				modal : !previosState.modal
			}
		})
	}

	_handleSignup = async ()=>{
		let user = this.props.navigation.state.params;
		user['avatar'] = this.state.avatar;
		this.props.navigation.push('SignupLocation',user);
	}

	render(){
		return(
			<Container>
				<HeadBack 
					handleBack = {this._handleBack}
				/>
				<View style={styles.ctn}>
					<View style={styles.ctnImage}>
						<Text style={styles.displayName}>Welcome {this.displayName}</Text>
						<TouchableOpacity 
							style={styles.sectionImg}
							onPress = {this.handleModal}
						>
						<View style={styles.ctnIcon}>
							<Icon 
								name="ios-add" 
								type='Ionicons' 
								style={{color:themeColor.primary}}						
							/>
						</View>
						{this.state.avatar 
						?
							<Image
         						style = {styles.img}
          						source={{uri : this.state.avatar}}
        					/>
        				:
        					<Image
         						style = {styles.img}
          						source={require('../../assets/images/logo.png')}
        					/>
        				}

        				</TouchableOpacity>
					</View>					
					<Button 
						style = {styles.btn}
						onPress={this._handleSignup} 
          				full 
          				rounded
          				disabled = {!this.state.avatar}
          			>
          				<Text>Save</Text>
          			</Button>
          		</View>
          		 <ModalBottom 
                    modal = {this.state.modal}
                    setAvatar = {this.setAvatar}
                    handleModal = {this.handleModal}
                />
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	ctn:{
		flex:1,
		marginBottom:30,
		paddingHorizontal:10,
	},
	displayName : {
		color:themeColor.primary
	},
	ctnImage:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	sectionImg:{
		width: 90,
		height:90,
		borderRadius:45,
		padding:10,
		marginTop:10,
	},
	img : {
		width: 70,
		height:70,
		borderRadius:35
	},
	ctnIcon:{
		justifyContent:'center',
		alignItems:'center',
		width:25,
		height:25,
		borderRadius:12.5,
		bottom:12,
		right:5,
		position:'absolute',
		shadowColor: "#c7c7c7",
		shadowOffset: {
			width: 2,
			height: 1,
		},
		shadowOpacity: 0.25,
		shadowRadius: 0.84,
		elevation: 1.5,
		backgroundColor:'white'
	}
})


export default SignupAvatar;