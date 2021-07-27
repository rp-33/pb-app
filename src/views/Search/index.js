import React,{Component} from 'react';
import {StyleSheet,View} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import Swiper from 'react-native-deck-swiper';
import CardItem from './CardItem';
import Head from './Head';
import NoMoreData from './NoMoreData';
import {
	searchUsers,
	like,
	disLike
} from '../../api/user';
import {setToast} from '../../actions/toast';

class Search extends Component{
	constructor(props){
		super(props);
		this.state = {
			match : false,
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
		this._handleUpdate();
	}

	_handleUpdate(){
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
			let {setToast} = this.props;
			let {status,data} = await searchUsers(sex,pet,location,distance);
			if(status === 200)
			{
				this.setState({
					users : data
				})
			}
			else
			{
				setToast({title:data.error,visible:true});
			}
		}
		catch(err)
		{
			setToast({title:'Error',visible:true,type:'Error'});
		}
	}

	setUser = (index)=>{
		let {_id} = this.state.users.find((item,i)=>(i===index));
		return _id
	}

	_handleDislike = async({_id})=>{
		try
		{
			let {setToast} = this.props;
			let {status,data} = await disLike(_id)
			if(status !==201)
			{
				setToast({title:data.error,visible:true});
			}
		}
		catch(err)
		{
			setToast({title:data.error,visible:true,type:'Error'}); 
		}
	}

	_handleLike = async({_id})=>{
		try
		{
			let {setToast} = this.props;
			let {status,data} = await like(_id,false);
			console.log(data,status)
			if(status ===201)
			{

				if(data.message ==="match")
				{
					this.setState({
						match : true
					})
					setToast({title:'Congratulations user match',visible:true});
				} 
			}
			else
			{
				setToast({title:data.error,visible:true});
			}
		}
		catch(err)
		{
			setToast({title:'Error',visible:true,type:'Error'});    
		}
	}
	
	userRemoved = (index)=>{

   		let CARD_REFRESH_LIMIT = 1

    	if (this.state.users.length - index <= CARD_REFRESH_LIMIT){
    		this._handleFindUser(this.sex,this.pet,this.location,this.distance);
    	}
	}

	handleNavigation = routeName=>{
		if(routeName === 'Match') this.setState({match:false});
		this.props.navigation.push(routeName);
	}

	handleProfile = (_id,displayName,avatar)=>{

		let user = {_id,displayName,avatar};

		this.props.navigation.push('Profile',{user:user,_id:null});
	}

	render(){
		return(
			<Container>
				<Head 
					handleNavigation = {this.handleNavigation}
					match = {this.state.match}
				/>
				{this.state.users.length>0
				&&
				<View style={styles.card}>
					<Swiper
	            	cards={this.state.users}
	            	renderCard={(item) => {
                	   return (
                	   		<CardItem 
        						item = {item}
        						myLocation = {this.props.user.location}
        						handleProfile = {this.handleProfile}
        					/>
                		)
            		}}
            		onSwipedLeft = {(index,item)=>this._handleDislike(item)}
            		onSwipedRight = {(index,item)=>this._handleLike(item)}
            		cardIndex={0}
            		stackSize= {7}
            		backgroundColor = {'transparent'}
               		/>
                </View>
            	}
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	card:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
})

const mapStateToProps = state=>({
	user : state.user
})

const mapDispatchToProps = dispatch => ({
    setToast : value => dispatch(setToast(value))
});

export default connect(mapStateToProps,mapDispatchToProps)(Search);