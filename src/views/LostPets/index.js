import React,{Component} from 'react';
import {
	FlatList,
	View
} from 'react-native';
import {
	Container,
	Content
} from 'native-base';
import Head from '../../presentations/HeadOption';
import SelectPet from '../../presentations/SelectPet';
import ItemCardPet from '../../presentations/ItemCardPet';

class LostPets extends Component{
	constructor(props){
		super(props);
		this.state = {
			petSelect : '',
			pets : [
				{
					_id:'1',
					name : 'name 1',
					location: [-68,10],
					user : {
						displayName : 'nini',
						sex :'female',
						pet : 'dog',
						avatar : 'http://192.168.1.5:8888/uploads/file-15906325767596ade50b9-4cb5-490f-b5ab-c7ba1609edc0.jpg',
						age : 2
					}
				},
				{
					_id:'2',
					name : 'name 1',
					location : [-68,10],
					user : {
						displayName : 'nini',
						sex :'male',
						pet : 'dog',
						avatar : 'http://192.168.1.5:8888/uploads/file-15906325767596ade50b9-4cb5-490f-b5ab-c7ba1609edc0.jpg',
						age : 2
					}
				},
				
			]
		}
	}

	handleSelectPet = (pet)=>{
		this.setState(prevState=>{
			return{
				petSelect : prevState.petSelect === pet ? '' : pet
			}
		})	
	}

	handleComments = ()=>this.props.navigation.push('Comments');

	render(){
		return(
			<Container>
				<Head 
					title = "Lost Pets"
				/>
				<Content>
				<SelectPet 
					petSelect = {this.state.petSelect}
					handleSelectPet = {this.handleSelectPet}
				/>
				<FlatList
					style={{marginTop:10}}
                    data = {this.state.pets}
                    keyExtractor={(item, index) => item._id}
                    renderItem = {({item,index})=>(
                        <ItemCardPet
                        	key = {index}
                        	{...item}
                        	handleComments = {this.handleComments}
                        />
                    )}
                />
                </Content>
			</Container>
		)
	}
}

export default LostPets;