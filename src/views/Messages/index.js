import React,{Component} from 'react';
import {FlatList} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import Head from './Head';
import Loading from './Loading';
import Chat from './Chat';
import {findMessages} from '../../api/user';
import {addToMessage,removeToMessage} from '../../actions/messages';
import {setToast} from '../../actions/toast';

class Messages extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading : true,
			delete : [],
			noData : false
		}
	}

	componentDidMount(){
		this._findMessages(this.props.messages.length);
	}

	handleBack = ()=>this.props.navigation.navigate('Search');

	_findMessages = async(page)=>{
		try
		{
			let {addToMessage,setToast} = this.props;
			this.setState({loading:true});
			let {status,data} = await findMessages(page);
			if(status ===200)
			{
				if(data.length===0) return this.setState({noData:true});
				this.props.addToMessage(data,page);
			}
			else
			{
				this.setState({noData:true});
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
				loading:false
			})
		}
	}

	handleLoadMore = ()=>{
		if(!this.state.noData) this._findMessages(this.props.messages.length);
	}

	_selectChat = (_id)=>{
		this.setState(prevState=>{
			return{
				delete : prevState.delete.includes(_id) 
				? prevState.delete.filter((item,index)=>{return item != _id}) 
				: [...prevState.delete,_id]			
			}
		})
	}

	handleSelect = ({_id,user})=>{
		if(this.state.delete.length===0) return this.props.navigation.navigate('Chat',{user:user,_id:_id});
		this._selectChat(_id);
	}

	handleAddDelete = (_id) => this._selectChat(_id);

	handleDelete = ()=>{
		this.props.removeToMessage(this.state.delete);
		this.setState({
			delete : []
		})
	}

	orderBy = (data)=>{
		let messages = data.sort((a, b)=> {
  			if (a.message[0].time < b.message[0].time) {
    			return 1;
  			}
  			if (a.message[0].time > b.message[0].time) {
    			return -1;
 	 		}
  			return 0;
		});

		return messages
		
	}//ordeno mis mensajes por orden de llegada al mas reciente

	render(){
		return(
			<Container>
				<Head 
					dataLength = {this.state.delete.length}
					handleDelete = {this.handleDelete}
					handleBack = {this.handleBack}
				/>
				<FlatList
                    data = {this.orderBy(this.props.messages)}
                    keyExtractor={(item, index) => item._id}onEndReached={this.state.noData ? null : this.handleLoadMore}
                    onEndReached={this.state.noData ? null : this.handleLoadMore}
          			onEndReachedThreshold={0.2}
          			initialNumToRender={20}
          			ListFooterComponent = {
          				<Loading
          					loading = {this.state.loading}
          				/>
          			}
                    renderItem = {({item,index})=>(
                    	<Chat 
                    		key = {item._id}
                    	 	item = {item}
                    	 	handleSelect = {this.handleSelect}
                    	 	handleAddDelete = {this.handleAddDelete}
                    	 	arrayDelete = {this.state.delete}
                    	/>
                    )}
                />
			</Container>
		)
	}
}

const mapStateToProps = state => ({
    messages: state.messages
})

const mapDispatchToProps = dispatch => ({
    addToMessage: (messages,page) => dispatch(addToMessage(messages,page)),
    removeToMessage : (values)=>dispatch(removeToMessage(values)),
    setToast : value => dispatch(setToast(value))
})


export default connect(mapStateToProps,mapDispatchToProps)(Messages);