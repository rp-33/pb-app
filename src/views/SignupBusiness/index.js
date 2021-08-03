import React,{Component} from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import {
	Container,
	Form,
	Button,
	Text,
	H1,
	Content
} from 'native-base';
import {connect} from 'react-redux';
import { Formik } from 'formik';
import HeadBack from '../../presentations/HeadBack';
import FieldInput from '../../presentations/FieldInput';
import TypeProduct from '../../presentations/TypeProduct';
import {SignUpSchemaBusiness} from '../../constants';
import themeColor from '../../theme/color';
import {verifiedEmail} from '../../api/business';
import {setLoading} from '../../actions/loading';
import {setToast} from '../../actions/toast';

class SignupBusiness extends Component{

	_handleBack = ()=>this.props.navigation.goBack();

	_handleSignup = async (values,actions)=>{
		let { setLoading,navigation,setToast} = this.props;
        setLoading(true);
		try
		{	
	
			let {status,data} = await verifiedEmail(values.email);
			if(status === 204)
			{
				navigation.push('SignupLocation',values)
			}
			else
			{
				setToast({title:data.error || 'Path not found',visible:true});     
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

	render(){
		return(
			<Container>
				<HeadBack
					handleBack = {this._handleBack}
				/>
				<Content>
					<View style={styles.ctnTitle}>
						<H1 style={styles.title}>Sign up</H1>
					</View>
					<Formik
    					initialValues={{ 
    						email: '',
    						password : '',
    						displayName : '',
    						repeatPassword : '',
    						type : 'boutique'
    					}}
    					isSubmitting = {true}
    					validationSchema = {SignUpSchemaBusiness}
    					onSubmit={this._handleSignup}
  					>
    				{formikProps => (
    					<Form style={styles.form}>
    					<TypeProduct 
							type = {formikProps.values['type']}
							handleSelect = {(type)=>formikProps.setFieldValue('type', type)}
						/>
    					<FieldInput
   							formikProps = {formikProps}
							placeholder="Business name"
							type='displayName'					
						/>
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
						<FieldInput
   							formikProps = {formikProps}
							placeholder="Repeat password"
							type = "repeatPassword"									
							secureTextEntry						
						/>
						<Button 
							style = {styles.btn}
							onPress={formikProps.handleSubmit} 
          					full 
          					rounded
          					disabled={formikProps.isSubmitting}
          				>
          					<Text>Next</Text>
          				</Button>
          				</Form>
    				)}
  					</Formik>
  				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	form:{
		flex:1,
		paddingHorizontal:10
	},
	ctnTitle:{
		marginTop:20,
		alignItems:'center'
	},
	title:{
		fontFamily:'parisienne',
		marginBottom:10
	},
	btn:{
		marginTop:10
	}

})

const mapDispatchToProps = dispatch => ({
	setLoading: value => dispatch(setLoading(value)),
	setToast : value => dispatch(setToast(value))
});

export default connect(null, mapDispatchToProps)(SignupBusiness);