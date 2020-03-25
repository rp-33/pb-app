import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {
	Container,
	Toast
}
from 'native-base';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardItem from './CardItem';
import HeadBack from '../../presentations/HeadBack';
import {
	searchUsers,
	like
} from '../../api/user';

class Search extends Component{
	constructor(props){
		super(props);
		this.state = {
			users : []
		}
	}

	componentDidMount(){
		this._handleFindUser();
	}

	_handleFindUser = async()=>{
		try
		{
			let {status,data} = await searchUsers();
			if(status === 200)
			{
				console.log(data)
				this.setState({
					users : data
				})
			}
		}
		catch(err)
		{
			Toast.show({
                text:'Server error',
                textStyle: { fontSize: 15 },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "OK",
                duration: 3000,
                type: "danger"
            })  
		}
	}

	handleLike = async(_id)=>{
		try
		{
			await like(_id,false);
		}
		catch(err)
		{

		}
	}

	handleSuperLike = async(_id)=>{
		try
		{
			await like(_id,true);
		}
		catch(err)
		{
			
		}

	}


	render(){
		return(
			<Container>

				<HeadBack />

				<CardStack
					loop={false}
					verticalSwipe={true}
					renderNoMoreCards={() => null}
					style={styles.content}
					ref={swiper => { this.swiper = swiper }}>

    				{this.state.users.map((item,i)=>
    					<Card key={item._id}>
    						<CardItem 
    							item = {item} 
    							handleLike = {this.handleLike}
    							handleSuperLike = {this.handleSuperLike}
    						/>
    					</Card>                    
    				)}
  				</CardStack>


			</Container>
		)
	}
}

const styles = StyleSheet.create({
	card:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
        marginBottom:30
	},
})

export default Search;