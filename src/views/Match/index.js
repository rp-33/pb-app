import React,{Component} from 'react';
import { connect } from 'react-redux';
import {
	FlatList,
	View,
	Text
} from 'react-native';
import {Container} from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import ItemMatch from './ItemMatch';
import LoadingCard from './LoadingCard';
import {findMatches} from '../../api/user';
import {setToast} from '../../actions/toast';

class Match extends Component{
	constructor(props){
		super(props);
		this.state = {
			page : 0,
			isRefreshing : false,
			loading : true,
			matches : []
		}
	}

	componentDidMount(){
		this.findMatches('loading',this.state.page);
	}

	findMatches= async(obj,page)=>{
		try
		{

			this.setState({[obj]:true});
			let {setToast} = this.props;
			let {status,data} = await findMatches(this.state.matches.length);
			if(status ===200)
			{
				if(data.length===0) return this.setState({noData:true});

				this.setState(prevState=>{
					return{
						matches: page === 0 ? data : [...prevState.matches,...data],
						page : prevState.page + 1
					}
				})
			}
			else
			{
				setToast({title:data.error,visible:true});  
			}

		}
		catch(err)
		{
			setToast({title:'Error',visible:true,type:'error'});
		}
		finally
		{
			this.setState({
				[obj] : false
			})	
		}
	}

	handleRefresh = ()=>{
		this.setState({
			noData : false,//restablezco la condicion porque he cargado de nuevo los match
			page : 0//restableco mi paginacion ya que estoy cargando match de nuevo
		},()=>{
			this.findMatches('isRefreshing',0);
		})
	
	}

	handleLoadMore =()=>{
		if(!this.state.noData) this.findMatches('loading',this.state.page);
	}

	handleNavigation = (_id,user)=> this.props.navigation.push('Profile',{user:user,_id:_id})

	handleBack = ()=>this.props.navigation.goBack();

	render(){
		return(
			<Container>
				<HeadBack
					title= "Match"
					handleBack = {this.handleBack}
				/>
				<FlatList
                    numColumns = {2}
                    data = {this.state.matches}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing = {this.state.isRefreshing}
                    onRefresh ={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
          			onEndReachedThreshold={0.2}
          			initialNumToRender={20}
          			ListFooterComponent = {
          				<LoadingCard 
          					loading = {this.state.loading}
          				/>
          			}
                    renderItem = {({item,index})=>(
                        <ItemMatch 
                        	key = {index.toString()}
                        	item = {item}
                        	handleNavigation = {this.handleNavigation}
                        />
                    )}
                />
			</Container>
		)
	}
}

const mapDispatchToProps = dispatch => ({
    setToast : value => dispatch(setToast(value))
});

export default connect(null, mapDispatchToProps)(Match);