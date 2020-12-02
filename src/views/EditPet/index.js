import React,{Component} from 'react';
import {
	FlatList
} from 'react-native'
import {
	Container,
	Button,
	Text,
	Toast
} from 'native-base';
import {connect} from 'react-redux';
import HeadBack from '../../presentations/HeadBack';
import CardPet from '../../presentations/CardPet';
import {pets} from '../../json/pets';
import { setLoading } from '../../actions/loading';
import { setPet } from '../../actions/user';
import {editPet} from '../../api/user';

class EditPet extends Component{
	constructor(props){
		super(props);
		this.state = {
			petSelect : props.pet
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

	handleSubmit = async()=>{
		let { setLoading, setPet} = this.props;
        setLoading(true);
        try{            
            let { status, data } = await editPet(this.state.petSelect)
            if(status === 201)
            {   
                setPet(this.state.petSelect);
                Toast.show({
                    text: 'saved successfully',
                    textStyle: { fontSize: 15  },
                    buttonTextStyle: { color: '#000000', fontSize: 15 },
                    buttonText: "Ok",
                    duration: 3000
                }) 
            }
            else
            {             
                Toast.show({
                    text: data.error,
                    textStyle: { fontSize: 15  },
                    buttonTextStyle: { color: '#000000', fontSize: 15 },
                    buttonText: "Ok",
                    duration: 3000,
                    type: "danger"
                })                
            }
        }
        catch(err)
        {
        	console.log(err)
            Toast.show({
                text: 'Error',
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Ok",
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
const mapStateToProps = state => ({
    pet : state.user.pet
})

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    setPet : value =>dispatch(setPet(value))
})

export default connect(mapStateToProps,mapDispatchToProps)(EditPet);