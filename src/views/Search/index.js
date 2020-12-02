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
import Head from './Head';
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
		this.pet = props.user.pet;
		this.location = props.user.location;
		this.distance = props.user.distance
	}

	componentDidMount(){
		this._handleFindUser(this.sex,this.pet,this.location,this.distance);
	}

	componentDidUpdate(prevProps, prevState){
		if(!this.props.user.isAuthenticated) return;

		if(this.sex !=this.props.user.sex)
		{
			this.sex = this.props.user.sex;
			this._handleFindUser(this.sex,this.pet,this.location,this.distance);
		}
		else if(this.distance != this.props.user.distance)
		{
			this.distance = this.props.user.distance;
			this._handleFindUser(this.sex,this.pet,this.location,this.distance);
		
		}
		else if(this.pet != this.props.user.pet)
		{
			this.pet = this.props.user.pet;
			this._handleFindUser(this.sex,this.pet,this.location,this.distance);
		
		}
	}

	_handleFindUser = async(sex,pet,location,distance)=>{
		try
		{
			let {status,data} = await searchUsers(sex,pet,location,distance);
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
    		this._handleFindUser(this.sex,this.pet,this.location,this.distance);
    	}
	}

	handleNavigation = routeName=>this.props.navigation.push(routeName);

	handleProfile = (_id,displayName,avatar)=>{

		let user = {_id,displayName,avatar};

		this.props.navigation.push('Profile',{user:user,_id:null});
	}

	render(){
		return(
			<Container>

				<Head 
					handleNavigation = {this.handleNavigation}
				/>
				<SwipeCards
        			cards={this.state.users}
        			renderCard={(item) => (
        				<CardItem 
        					{...item} 
        					myLocation = {this.props.user.location}
        					handleProfile = {this.handleProfile}
        				/>
        			)}
        			renderNoMoreCards={() => <NoMoreData />}
        			yupText="LIKE"
        			nopeText="DISLIKE"
        			handleYup={this.handleYup}
        			handleNope={this.handleNope} 
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