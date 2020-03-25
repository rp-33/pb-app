import React,{Component} from 'react';
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
	H1,
	Content,
	Toast
} from 'native-base';
import {connect} from 'react-redux';
import { Formik } from 'formik';
import { RadioButton } from 'react-native-paper';
import HeadBack from '../../presentations/HeadBack';
import FieldInput from '../../presentations/FieldInput';
import { SignUpSchema } from '../../constants';
import themeColor from '../../theme/color';
import {verifiedEmail} from '../../api/user';
import { setLoading } from '../../actions/loading';

class SignUp extends Component{

	_handleBack = ()=>{
		this.props.navigation.goBack();
	}

	_handleSignup = async (values,actions)=>{
		let { setLoading,navigation} = this.props;
        setLoading(true);
		try
		{	
	
			let {status,data} = await verifiedEmail(values.email);
			if(status === 204)
			{
				navigation.push('SignupAvatar',values)
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
				<Content>
					<View style={styles.ctnTitle}>
						<H1 style={styles.title}>Sign up</H1>
					</View>
					<Formik
    					initialValues={{ 
    						email: '',
    						password : '',
    						displayName : '',
    						sex:'male',
    						repeatPassword : ''
    					}}
    					isSubmitting = {true}
    					validationSchema = {SignUpSchema}
    					onSubmit={this._handleSignup}
  					>
    				{formikProps => (
    					<Form style={styles.form}>
    					<FieldInput
   							formikProps = {formikProps}
							placeholder="Pet's name"
							type='displayName'					
						/>
   						<FieldInput
   							formikProps = {formikProps}
							placeholder="Email"
							type = "email"						
						/>
						<View style={styles.ctnSex}>
							<View style={styles.sex}>
								<Text>Male</Text>
								<RadioButton
          							value="male"
          							color="blue"
          							status={formikProps.values['sex']=== 'male' ? 'checked' : 'unchecked'}
        							onPress={()=>formikProps.setFieldValue('sex', 'male')}
        						/>
        					</View>
        					<View style={styles.sex}>
        						<Text>Female</Text>
        						<RadioButton
          							value="female"
          							color="pink"
          							status={formikProps.values['sex']=== 'female' ? 'checked' : 'unchecked'}
        							onPress={()=>formikProps.setFieldValue('sex', 'female')}
        						/>
        					</View>
						</View>
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
  					<View style={styles.CtnConditions}>
  						<TouchableOpacity>
            				<Text style={{color:themeColor.secondary}}>To register you accept our</Text>
            				<Text style={{color:themeColor.primary,marginLeft:15}}>terms and conditions</Text>
         	 			</TouchableOpacity>
         	 		</View>
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
	},
	CtnConditions:{
		width:'100%',
		paddingTop:15,
		marginTop:20,
		alignItems:'center',
		marginBottom:20
	},
	ctnSex:{
		flexDirection:'row',
		marginLeft:10
	},
	sex:{
		flexDirection:'row',
		alignItems:'center',
		marginRight:20
	}

})

const mapDispatchToProps = dispatch => ({
	setLoading: value => dispatch(setLoading(value))
});

export default connect(null, mapDispatchToProps)(SignUp);
