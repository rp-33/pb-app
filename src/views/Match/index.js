import React,{Component} from 'react';
import {
	FlatList,
	View,
	Text
} from 'react-native';
import {
	Container,
	Toast
}
from 'native-base';
import Head from '../../presentations/HeadBack';
import ItemMatch from './ItemMatch';
import LoadingCard from './LoadingCard';
import {findMatches} from '../../api/user';

class Match extends Component{
	constructor(props){
		super(props);
		this.state = {
			page : 0,
			isRefreshing : false,
			loadingMore : true,
			matches : []
		}
	}

	componentDidMount(){
		this.findMatches(this.state.page);
	}

	findMatches=async(page)=>{
		try
		{
			let {status,data} = await findMatches(page);
			if(status ===200)
			{
				this.setState(prevState=>{
					return{
						matches: page === 0 ? data : [...prevState.matches,...data],
						page : prevState.page + 1
					}
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
                    type:'danger'
                })   
			}

		}
		catch(err)
		{

		}
		finally
		{
			this.setState({
				isRefreshing:false
			})
		}
	}

	handleRefresh = ()=>{
		this.setState({
			page : 0
		},()=>{
			this.findMatches(0);
		})
	}

	handleLoadMore = async()=>{
		try
		{
			this.setState({
				loadingMore : true
			});
			let {status,data} = await findMatches(this.state.page);
			if(status ===200)
			{
				this.setState(prevState=>{
					return{
						matches : [...prevState.matches,...data],
						page : prevState.page + 1
					}
				})
			}
			else if(status===204)
			{
				this.setState({
					loadingMore : false
				});
			}
			else
			{
				Toast.show({
                    text: data.error,
                    textStyle: { fontSize: 15  },
                    buttonTextStyle: { color: '#000000', fontSize: 15 },
                    buttonText: "Ok",
                    duration: 3000,
                    type :'danger'
                })   
			}

		}
		catch(err)
		{
			Toast.show({
                text: 'Error',
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Ok",
                duration: 3000,
                type: "danger"
            })   
		}
	}

	handleNavigation = (_id,user)=> this.props.navigation.navigate('Profile',{user:user,_id:_id})

	render(){
		return(
			<Container>
				<Head/>
				<FlatList
                    numColumns = {2}
                    data = {this.state.matches}
                    keyExtractor={(item, index) => item._id}
                    refreshing = {this.state.isRefreshing}
                    onRefresh ={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
          			onEndReachedThreshold={0.2}
          			initialNumToRender={6}
          			ListFooterComponent = {
          				<LoadingCard 
          					loadingMore = {this.state.loadingMore}
          				/>
          			}
                    renderItem = {({item,index})=>(
                        <ItemMatch 
                        	key = {item._id}
                        	item = {item}
                        	handleNavigation = {this.handleNavigation}
                        />
                    )}
                />
			</Container>
		)
	}
}

export default Match;