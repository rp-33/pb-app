import React,{Component} from 'react';
import {
	View,
	StyleSheet,
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
import {connect} from 'react-redux';
import { Formik } from 'formik';
import HeadBack from '../../presentations/HeadBack';
import FieldInput from '../../presentations/FieldInput';
import { FargotPasswordSchema } from '../../constants';
import { setLoading } from '../../actions/loading';
import {
	verifyCodePassword,
	sendCodePassword
} from '../../api/user';
import themeColor from '../../theme/color';
import {setToast} from '../../actions/toast';

class StepCode extends Component{
	constructor(props){
		super(props);		
	}
	
	handleBack = ()=>this.props.navigation.navigate('Login');

	_handleSubmit = async(values,actions)=>{
		let {setLoading,navigation,setToast} = this.props;
		setLoading(true);
		try
		{
			let {email,token} = navigation.state.params;
			let {code} = values;
			let {status,data} = await verifyCodePassword(email,code,token);

			if(status===200)
			{
				navigation.push('StepPassword',{token : token});
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
			setLoading(false)
		}
		
	}

	handleReset = async()=>{
		let {setLoading,navigation,setToast} = this.props;
		setLoading(true);
		try
		{
			let {email} = navigation.state.params;
			let {status,data} = await sendCodePassword(email);
			if(status===201)
			{
				setToast({title:'Send code',visible:true,type:'error'});  
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
			setLoading(false)
		}
	}

	render(){
		return(
			<Container>
				<HeadBack 
					handleBack = {this.handleBack}
				/>
				<View style={styles.ctnForm}>
					<H1 style={styles.title}>Recover password</H1>
					<Text></Text>
					<Formik
    					initialValues={{ 
    						email: ''
    					}}
    					validationSchema = {FargotPasswordSchema.code}
    					onSubmit={this._handleSubmit}
  					>
    				{formikProps => (
    					<Form style={styles.form}>
   						<FieldInput
   							formikProps = {formikProps}
							placeholder="Code"
							type = "code"						
						/>
						<Button 
							style = {styles.btn}
							onPress={formikProps.handleSubmit} 
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
  							onPress = {this.handleReset}
  						>
            				<Text style={styles.textRecover}>Reset code</Text>
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
	setToast : value => dispatch(setToast(value))
});

export default connect(null, mapDispatchToProps)(StepCode);
