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
	H1,
	Toast
} from 'native-base';
import { Formik } from 'formik';
import HeadBack from '../../presentations/HeadBack';
import { ChangePasswordSchema } from '../../constants';
import FieldInput from '../../presentations/FieldInput';
import { setLoading } from '../../actions/loading';
import {editPassword} from '../../api/user';

class EditPassword extends Component{

	handleBack = ()=>this.props.navigation.goBack();

	_handleSave = async(values,actions)=>{
		const {setLoading } = this.props;
		setLoading(true);
		try{
			let {password} = values;
			let {status,data} = await editPassword(password);
			if(status === 201)
			{
				actions.resetForm();
				Toast.show({
                	text: 'saved successfully',
                	textStyle: { fontSize: 15 },
       	        	buttonTextStyle: { color: '#000000', fontSize: 15 },
                	buttonText: "OK",
               		duration: 3000
            	})   
			}
			else
			{
				Toast.show({
                	text: data.error,
                	textStyle: { fontSize: 15 },
       	        	buttonTextStyle: { color: '#000000', fontSize: 15 },
                	buttonText: "OK",
               		duration: 3000,
               		type: "danger"
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
							disabled={formikProps.isSubmitting}
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
    setLoading: value => dispatch(setLoading(value))
})


export default connect(null,mapDispatchToProps)(EditPassword);