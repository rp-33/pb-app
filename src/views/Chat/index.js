import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
	FlatList,
	Image,
	View,
	Text,
	KeyboardAvoidingView
} from 'react-native';
import {Container} from 'native-base';
import Head from './Head';
import InputChat from './InputChat';
import ChatBubble from './ChatBubble';
import ModalBottom from './ModalBottom';
import Loading from '../../presentations/LoadingMore';
import {
	changeStatusMessage,
	newMessage
} from '../../utils/message';
import {
	newMessageText,
	findChat,
	newMessageImage,
	newMessageLocation
} from '../../api/user';
import {updateToMessage} from '../../actions/messages';
import {findChatId} from '../../utils/message';
import {setToast} from '../../actions/toast';

class Chat extends Component{
	constructor(props){
		super(props);
		this._id = this.props.navigation.getParam('_id');
		this.user = this.props.navigation.getParam('user');		
		this.state = {
			messages : [],
			modalBottom : false,
			loading : true,
			noData : false
		}
	}

	componentDidMount(){
		this.findChat(this.state.messages.length);
	}

	componentDidUpdate(prevProps, prevState){
		
		if(this.props.navigation.getParam('location'))
		{
			const { location,text } = this.props.navigation.state.params;
			delete this.props.navigation.state.params['location'];
			this.setLocation(location,text);
			
		}
		else if(this.props.navigation.getParam('image'))
		{
			const { image,text } = this.props.navigation.state.params;
			delete this.props.navigation.state.params['image'];
			this.setImage(image,text);
		}
	}

	findChat=async(page)=>{
		try
		{
			let {setToast} = this.props;
			this.setState({loading:true});
			let {status,data} = await findChat(this._id,page);
			if(status ===200)
			{

				if(data.length===0) return this.setState({noData:true});

				this.setState(prevState=>{
					return{
						messages: page === 0 ? data : [...prevState.messages,...data]
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
				loading : false
			})
		}
	}

	handleBack = ()=> this.props.navigation.goBack();

	handleModal = () => {
        this.setState(previosState=>({
            modalBottom : !previosState.modalBottom
        }))
    };

	handleLoadMore = ()=>{
		if(!this.state.noData) this.findChat(this.state.messages.length);	
	}

	setMessage = async(text)=>{
		try
		{
			let message = new newMessage(this.props.user._id,this.user._id,'text').setText(text);
			this.setState(prevState=>{
				return{
					messages : [message,...prevState.messages]
				}			
			},()=>{
				this.props.updateToMessage(this._id,this.state.messages,this.user);//actualizo messages
			})
			let {status,data} = await newMessageText(this._id,'text',text,this.user._id,message.time);
			let statusMsm = (status===201) ? 'sent' : 'error';
			let	newMsm = changeStatusMessage(this.state.messages,statusMsm,data.time);
			this.setState({messages : newMsm})
		}
		catch(err)
		{
			this.props.setToast({title:'Error',visible:true,type:'error'}); 
		}

	}

	setImage = async(image,text)=>{
		try
		{
			let message = new newMessage(this.props.user._id,this.user._id,'image').setText(text).setImage(image);	
			this.setState(prevState=>{
				return{
					messages : [message,...prevState.messages]
				}			
			},()=>{
				this.props.updateToMessage(this._id,message,this.user);//actualizo messages
			})
			let {status,data} = await newMessageImage(this._id,'image',text,image,this.user._id,message.time);
			let statusMsm = (status===201) ? 'sent' : 'error';
			let	newMsm = changeStatusMessage(this.state.messages,statusMsm,data.time);
			this.setState({
				messages : newMsm
			})
		}
		catch(err)
		{
			this.props.setToast({title:'Error',visible:true,type:'error'}); 
		}
	}

	setLocation = async(location,text)=>{
		try
		{
			let message = new newMessage(this.props.user._id,this.user._id,'location').setText(text).setLocation(location);	
			this.setState(prevState=>{
			return{
				messages : [message,...prevState.messages]
			}			
			},()=>{
				this.props.updateToMessage(this._id,message,this.user);//actualizo messages
			})
			let {status,data} = await newMessageLocation(this._id,'location',text,location,this.user._id,message.time);
			let statusMsm = (status===201) ? 'sent' : 'error';

			let	newMsm = changeStatusMessage(this.state.messages,statusMsm,data.time);
			this.setState({
				messages : newMsm
			})
		}
		catch(err)
		{
			this.props.setToast({title:'Error',visible:true,type:'error'});
		}
	}

	handleOpenImage = picture => this.props.navigation.push('ChatPicture',{picture: picture})

	handleProfile = ()=> this.props.navigation.push('Profile',{user:this.user,_id:this._id})

	handleLocation = ()=>this.props.navigation.push('ChatLocation');

	handleSetImage = (image)=>this.props.navigation.push('ChatImage',{image:image});

	render(){
		return(
			<Container>
				<Head 
					displayName = {this.user.petName}
					avatar = {this.user.avatar}
					handleBack = {this.handleBack}
					handleProfile = {this.handleProfile}
				/>
				<Image style={{flex:1,position:'absolute',zIndex:-1}} source={require('../../assets/images/chat-background.jpg')} />
				<KeyboardAvoidingView style={{flex:1}} enabled>
					<FlatList
                    	data = {this.state.messages}
                    	keyExtractor={(item, index) => index.toString()}
                   		onEndReached={this.state.noData ? null : this.handleLoadMore}
          				onEndReachedThreshold={0.01}
          				initialNumToRender={30}
          				inverted = {true}
          				ListFooterComponent = {
          					<Loading
          						loading = {this.state.loading}
          					/>	
          				}
                    	renderItem = {({item,index})=>(
                        	<ChatBubble 
                        		key ={index.toString()}
                        		message = {item}
                        		myUser = {this.props.user._id}
                        		handleOpenImage = {this.handleOpenImage}
                        	/>
                    	)}
                	/>
					<InputChat
						handleModal = {this.handleModal}
						setMessage = {this.setMessage}
					/>
				</KeyboardAvoidingView>
               
               	{this.state.modalBottom &&
                	<ModalBottom 
                    	modal = {this.state.modalBottom}
                    	handleModal = {this.handleModal}
                    	setImage = {this.handleSetImage}
                    	handleLocation = {this.handleLocation}
                	/>
                }

			</Container>
		)
	}
}

const mapStateToProps = state => ({
    user: state.user,
    messages: state.messages
})

const mapDispatchToProps = dispatch => ({
    updateToMessage: (_id,message,user) => dispatch(updateToMessage(_id,message,user)),
    setToast : value => dispatch(setToast(value))
})

export default connect(mapStateToProps,mapDispatchToProps)(Chat);