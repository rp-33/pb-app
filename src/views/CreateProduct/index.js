import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {
	Container,
	Form,
	Button,
	Text,
	H1,
	Content
} from 'native-base';
import { Formik } from 'formik';
import { ProductSchema } from '../../constants';
import HeadBack from '../../presentations/HeadBack';
import FieldInput from '../../presentations/FieldInput';
import FieldImage from '../../presentations/FieldImage';
import SelectPet from '../../presentations/SelectPet';
import TabType from './TabType';

class CreateProduct extends Component{
	constructor(props){
		super(props);
		this.state = {
			type : 'accessory',
		}
	}

	_handleBack = ()=>this.props.navigation.goBack();

	_handleCreate = ()=>{

	}


	_handleType = (type)=>{
		this.setState({
			type : type
		})
	}

	render(){
		return(
			<Container>
				<HeadBack 
					title = "Add product"
					handleBack = {this._handleBack}
				/>
				<Content>
					<TabType 
    					type = {this.state.type} 
    					handleSelect = {this._handleType}
    				/>
					<Formik
    					initialValues={{
    						name : '',
    						price : '',
    						description : '',
    						pet : 'dog',
    						photos : []
    					}}
    					isSubmitting = {true}
    					validationSchema = {ProductSchema}
    					onSubmit={this._handleCreate}
  					>
    				{formikProps => (
    					<Form style={styles.form}>
    					<SelectPet 
							petSelect = {formikProps.values['pet']}
							handleSelectPet = {(pet)=>formikProps.setFieldValue('pet', pet)}
						/>
    					<FieldInput
   							formikProps = {formikProps}
							placeholder='Product name'
							type='name'					
						/>
						<FieldInput
   							formikProps = {formikProps}
							placeholder='Price'
							type = 'price'
							keyboardType = {'phone-pad'}					
						/>
						<FieldInput
   							formikProps = {formikProps}
							placeholder='Description'
							type='description'	
							multiline				
						/>
						<FieldImage 
							photos = {formikProps.values.photos}
							handlePicture = {(photo)=>formikProps.setFieldValue('photos', [...formikProps.values.photos,photo])}
							handleDelete = {(photo)=>formikProps.setFieldValue('photos',formikProps.values.photos.filter(item=>(item!==photo)))}
							errors = {formikProps.errors['photos']}
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
		paddingHorizontal:10,
		marginVertical : 20
	},
	btn:{
		marginTop:10
	}
})


export default CreateProduct;