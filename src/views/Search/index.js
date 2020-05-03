import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {
	Container,
	Toast
}
from 'native-base';
import {connect} from 'react-redux';
import SwipeCards from 'react-native-swipe-cards';
import CardItem from './CardItem';
import HeadBack from '../../presentations/HeadBack';
import NoMoreData from './NoMoreData';
import {
	searchUsers,
	like,
	disLike
} from '../../api/user';

class Search extends Component{
	constructor(props){
		super(props);
		this.state = {
			users : [],
		}
		this.sex = props.user.sex;
	}

	componentDidMount(){
		this._handleFindUser(this.sex);
	}

	componentDidUpdate(prevProps, prevState){
		if(this.sex !=this.props.user.sex){
			this.sex = this.props.user.sex;
			this._handleFindUser(this.sex);
		}
	}

	_handleFindUser = async(sex)=>{
		try
		{
			let {status,data} = await searchUsers(sex);
			if(status === 200)
			{
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

	setUser = (index)=>{
		let {_id} = this.state.users.find((item,i)=>(i===index));
		return _id
	}

	handleNope = ({_id})=>{
		try
		{
			disLike(_id)
			.then((response)=>{
				let {status,data} = response;
				if(status!=201)
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
			})
			.catch((err)=>{
				throw err;
			})
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
	}

	handleYup = ({_id})=>{
		try
		{
			like(_id,false)
			.then((response)=>{
				let {status,data} = response;
				if(status===201)
				{
					if(data.message!="match") return;//like
					
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
			})
			.catch((err)=>{
				throw err;
			})
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
	}
	
	userRemoved = (index)=>{

   		let CARD_REFRESH_LIMIT = 1

    	if (this.state.users.length - index <= CARD_REFRESH_LIMIT){
    		this._handleFindUser();
    	}
	}

	render(){
		return(
			<Container>

				<HeadBack />
				<SwipeCards
        			cards={this.state.users}
        			renderCard={(item) => <CardItem {...item} />}
        			renderNoMoreCards={() => <NoMoreData />}
        			yupText="LIKE"
        			nopeText="DISLIKE"
        			handleYup={this.handleYup}
        			handleNope={this.handleNope} 
        			handleMaybe={this.handleMaybe}
        			cardRemoved={this.userRemoved} 	
        			yupStyle = {{marginRight:20}}
        			nopeStyle={{marginLeft:20}}		
      			/>

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

const mapStateToProps = state=>({
	user : state.user
})

export default connect(mapStateToProps,null)(Search);