import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet,
	View,
} from 'react-native';
import {
	Container,
	Button,
	Form,
	Text,
	H1
} from 'native-base';
import {Formik} from 'formik';
import HeadBack from '../../presentations/HeadBack';
import {ChangePasswordSchema} from '../../constants';
import FieldInput from '../../presentations/FieldInput';
import {setLoading} from '../../actions/loading';
import {newPassword} from '../../api/user';
import {setToast} from '../../actions/toast';

class StepPassword extends Component{

	handleBack = ()=>this.props.navigation.navigate('Login');

	_handleSave = async(values,actions)=>{
		const {setLoading,navigation,setToast} = this.props;
		setLoading(true);
		try{
			let {token} = navigation.state.params;
			let {password} = values;
			let {status,data} = await newPassword(password,token);
			if(status === 201)
			{
				navigation.push('StepPasswordSuccess');   
			}
			else
			{
				setToast({title:data.error,visible:true});     
			}
		}
		catch(err)
		{
			console.log(err)
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
					handleBack = {this.handleBack}
				/>
				<View style={styles.ctnForm}>
					<H1 style={styles.title}>Change Password</H1>
					<Formik
    					initialValues={{ 
    						password: '',
    						confirmPassword : ''
    					}}
    					validationSchema = {ChangePasswordSchema}
    					onSubmit={this._handleSave}
  					>
    				{formikProps => (
    					<Form style={styles.form}>
   						<FieldInput
   							formikProps = {formikProps}
							placeholder="Password"
							type = "password"	
							secureTextEntry					
						/>
						<FieldInput
   							formikProps = {formikProps}
							placeholder="Confirm Password"
							type = "confirmPassword"									
							secureTextEntry						
						/>
						<Button 
							style = {styles.btn}
							onPress={formikProps.handleSubmit} 
          					full 
          					rounded
          				>
          					<Text>save</Text>
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
		justifyContent:'center',
		marginTop:20
	},
	form:{
		width:'100%',
		marginBottom:50	
	},
	btn:{
		marginTop:10
	},
	title:{
		fontFamily:'parisienne',
		marginBottom:10
	}

})

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    setToast : value => dispatch(setToast(value))
})


export default connect(null,mapDispatchToProps)(StepPassword);