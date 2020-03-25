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
import {connect} from 'react-redux';
import ModalBottom from './ModalBottom';
import HeadBack from '../../presentations/HeadBack';
import themeColor from '../../theme/color';
import {signup} from '../../api/user';
import { setAuth } from '../../actions/user';
import { setLoading } from '../../actions/loading';

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
		let { setAuth, setLoading,navigation} = this.props;
        setLoading(true);
		try
		{
			let email = this.props.navigation.getParam('email');
			let sex = this.props.navigation.getParam('sex');
			let password = this.props.navigation.getParam('password');
			let {status,data} = await signup(this.displayName,email,sex,password,this.state.avatar);
			if(status === 201)
			{
				setAuth(data);
				navigation.reset([navigation.navigate({routeName:'Dashboard'})],0);
			}
			else
			{
				Toast.show({
                    text: data.error,
                    textStyle: { fontSize: 15 },
                    buttonTextStyle: { color: '#000000', fontSize: 15 },
                    buttonText: "OK",
                    duration: 3000
                })      
			}

		}
		catch(err)
		{
			Toast.show({
                text: 'Error',
                textStyle: { fontSize: 15 },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "OK",
                duration: 3000,
                type: "danger"
            })      
		}
		finally
		{
			setLoading(false);
		}
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

const mapDispatchToProps = dispatch => ({
	setLoading: value => dispatch(setLoading(value)),
	setAuth: value => dispatch(setAuth(value))
});

export default connect(null, mapDispatchToProps)(SignupAvatar);
