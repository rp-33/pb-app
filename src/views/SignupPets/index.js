import React,{Component} from 'react';
import {
	FlatList
} from 'react-native'
import {
	Container,
	Button,
	Text
} from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import CardPet from '../../presentations/CardPet';
import {pets} from '../../json/pets';

class SignupPets extends Component{
	constructor(props){
		super(props);
		this.state = {
			petSelect : ''
		}
		this.pets = pets();
	}

	handleBack = ()=>this.props.navigation.goBack();

	handleSelect = (pet)=>{
		this.setState(prevState=>{
			return{
				petSelect : prevState.petSelect === pet ? '' : pet
			}
		})	
	}

	handleSubmit = ()=>{
		let user = this.props.navigation.state.params;
		user['pet'] = this.state.petSelect 
		this.props.navigation.push('SignupAvatar',user);
	}


	render(){
		return(
			<Container>
				<HeadBack 
					title = "Pet Select"
					handleBack = {this.handleBack}
				/>
				<FlatList
                    numColumns = {3}
                    data = {this.pets}
                    keyExtractor={(item, index) => item}
                    renderItem = {({item,index})=>(
                        <CardPet
                        	key = {item}
                        	pet = {item}
                        	petSelect = {this.state.petSelect}
                        	handleSelect = {this.handleSelect}
                       	/>
                    )}
                />
                <Button 
                	style = {{marginBottom:10,marginHorizontal:10}}
					onPress={this.handleSubmit} 
					disabled={!this.state.petSelect}
          			full 
          			rounded
          		>
          			<Text>Next</Text>
          		</Button>
			</Container>
		)
	}
}

export default SignupPets;