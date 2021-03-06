import React,{Component} from 'react';
import { connect } from 'react-redux';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	PixelRatio
} from 'react-native';
import {
	Container,
	Form,
	Button,
	Text,
	H1
} from 'native-base';
import { Formik } from 'formik';
import HeadBack from '../../presentations/HeadBack';
import FieldInput from '../../presentations/FieldInput';
import { SignInSchema } from '../../constants';
import themeColor from '../../theme/color';
import {login} from '../../api/user';
import {loginBusiness} from '../../api/business';
import {setAuth} from '../../actions/user';
import {setLoading} from '../../actions/loading';
import {setToast} from '../../actions/toast';
import { setAuthBusiness } from '../../actions/business';

class Login extends Component{
	constructor(props){
		super(props)
		this.rol = props.navigation.state.params.rol;
	}

	_handleBack = ()=>this.props.navigation.goBack();

	_handleLoginUser = async(values,actions)=>{
		let { setAuth, setLoading,setToast,navigation} = this.props;
        setLoading(true);
		try
		{	
		
			let {email,password} = values;
			let {status,data} = await login(email,password);
			if(status === 200)
			{
				setAuth(data);
				navigation.navigate('Dashboard');
			}
			else
			{
				setToast({title:data.error,visible:true});
			}

		}
		catch(err)
		{
			setToast({title:'Error',visible:true,type:'error'}); 
		}
		finally
		{
			setLoading(false);
		}
	}

	_handleLoginBusiness = async(values,actions)=>{
		let { setAuthBusiness, setLoading,setToast,navigation} = this.props;
        setLoading(true);
		try
		{	
		
			let {email,password} = values;
			let {status,data} = await loginBusiness(email,password);
			if(status === 200)
			{
				setAuthBusiness(data);
				navigation.navigate('DashboardBusiness');
			}
			else
			{
				setToast({title:data.error,visible:true});
			}

		}
		catch(err)
		{
			setToast({title:'Error',visible:true,type:'error'}); 
		}
		finally
		{
			setLoading(false);
		}
	}

	recoverPassword = ()=>this.props.navigation.push('RecoverPassword')

	render(){
		return(
			<Container>
				<HeadBack
					handleBack = {this._handleBack}
				/>
				<View style={styles.ctnForm}>
					<H1 style={styles.title}>Log in</H1>
					<Formik
    					initialValues={{ 
    						email: '',
    						password : ''
    					}}
    					validationSchema = {SignInSchema}
    					onSubmit={this.rol === 'business' ? this._handleLoginBusiness : this._handleLoginUser}
  					>
    				{formikProps => (
    					<Form style={styles.form}>
   						<FieldInput
   							formikProps = {formikProps}
							placeholder="Email"
							type = "email"						
						/>
						<FieldInput
   							formikProps = {formikProps}
							placeholder="Password"
							type = "password"									
							secureTextEntry						
						/>
						<Button 
							style = {styles.btn}
							onPress={formikProps.handleSubmit} 
							disabled={formikProps.isSubmitting}
          					full 
          					rounded
          				>
          					<Text>send</Text>
          				</Button>
          				</Form>
    				)}
  					</Formik>
  					<View style={styles.ctnRecover}>
  						<TouchableOpacity
  							onPress = {this.recoverPassword}
  						>
            				<Text style={styles.textRecover}>Recover Password</Text>
         	 			</TouchableOpacity>
         	 		</View>
  				</View>

			</Container>
		)
	}
}

const styles = StyleSheet.create({
	ctnForm:{
		flex:1,
		paddingHorizontal:10,
		alignItems:'center',
		justifyContent:'center'
	},
	form:{
		width:'100%',
		marginBottom:50	
	},
	title:{
		fontFamily:'parisienne',
		marginBottom:10
	},
	btn:{
		marginTop:10
	},
	ctnRecover:{
		width:'100%',
		borderTopWidth:1/PixelRatio.getPixelSizeForLayoutSize(1),
		borderTopColor:themeColor.secondary,
		paddingTop:15,
		alignItems:'center'
	},
	textRecover:{
		fontWeight:'bold',
		color:themeColor.primary
	}

})


const mapDispatchToProps = dispatch => ({
	setLoading: value => dispatch(setLoading(value)),
    setAuth: value => dispatch(setAuth(value)),
    setAuthBusiness: value => dispatch(setAuthBusiness(value)),
    setToast : value => dispatch(setToast(value))
});

export default connect(null, mapDispatchToProps)(Login);

