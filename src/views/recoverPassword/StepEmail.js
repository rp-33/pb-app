import React,{Component} from 'react';
import {
	View,
	StyleSheet
} from 'react-native';
import {
	Container,
	Form,
	Button,
	Text,
	H1,
	Toast
} from 'native-base';
import {connect} from 'react-redux';
import { Formik } from 'formik';
import HeadBack from '../../presentations/HeadBack';
import FieldInput from '../../presentations/FieldInput';
import { FargotPasswordSchema } from '../../constants';
import {sendCodePassword} from '../../api/user';
import { setLoading } from '../../actions/loading';

class StepEmail extends Component{

	handleBack = ()=>this.props.navigation.navigate('Login');


	_handleSubmit = async(values,actions)=>{
		let {setLoading,navigation} = this.props;
		setLoading(true);
		try
		{
			let {email} = values;
			let {status,data} = await sendCodePassword(email);
			if(status===201)
			{
				navigation.push('StepCode',{
					token : data.token,
					email : email
				});
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
                text: 'Server error',
                textStyle: { fontSize: 15 },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "OK",
                duration: 3000,
                type: "danger"
            })     
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
					<Formik
    					initialValues={{ 
    						email: ''
    					}}
    					validationSchema = {FargotPasswordSchema.email}
    					onSubmit={this._handleSubmit}
  					>
    				{formikProps => (
    					<Form style={styles.form}>
   						<FieldInput
   							formikProps = {formikProps}
							placeholder="Email"
							type = "email"						
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
	}

})


const mapDispatchToProps = dispatch => ({
	setLoading: value => dispatch(setLoading(value))
});

export default connect(null, mapDispatchToProps)(StepEmail);