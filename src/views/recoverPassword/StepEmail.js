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
	H1
} from 'native-base';
import {connect} from 'react-redux';
import { Formik } from 'formik';
import HeadBack from '../../presentations/HeadBack';
import FieldInput from '../../presentations/FieldInput';
import { FargotPasswordSchema } from '../../constants';
import {sendCodePassword} from '../../api/user';
import { setLoading } from '../../actions/loading';
import {setToast} from '../../actions/toast';

class StepEmail extends Component{

	handleBack = ()=>this.props.navigation.navigate('Login');


	_handleSubmit = async(values,actions)=>{
		let {setLoading,navigation,setToast} = this.props;
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
	setLoading: value => dispatch(setLoading(value)),
	setToast : value => dispatch(setToast(value))
});

export default connect(null, mapDispatchToProps)(StepEmail);