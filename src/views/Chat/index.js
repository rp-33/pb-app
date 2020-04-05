import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
	FlatList,
	Image,
	View,
	Text,
	Dimensions,
	KeyboardAvoidingView
} from 'react-native';
import {
	Container,
	Toast
}
from 'native-base';
import Head from './Head';
import InputChat from './InputChat';
import ChatBubble from './ChatBubble';
import ModalBottom from './ModalBottom';
import Loading from '../../presentations/LoadingMore';
import {
	newMessage,
	changeStatusMessage
} from '../../utils/message';
import {
	newMessageText,
	findChat
} from '../../api/user';
import {updateToMessage} from '../../actions/messages';

let { height } = Dimensions.get('window'),
	SCREEN_HEIGHT = height - 80;

class Chat extends Component{
	constructor(props){
		super(props);
		this.state = {
			messages : [],
			modalBottom : false,
			page : 0,
			loading : true,
			noData : false
		}
		this._id = this.props.navigation.getParam('_id');
		this.user = this.props.navigation.getParam('user');
	}

	componentDidMount(){
		this.findChat(this.state.page)
	}

	findChat=async(page)=>{
		try
		{
			this.setState({loading:true});
			let {status,data} = await findChat(this._id,page);
			if(status ===200)
			{

				if(data.length===0) return this.setState({noData:true});

				this.setState(prevState=>{
					return{
						messages: page === 0 ? data : [...prevState.messages,...data],
						page : prevState.page + 1
					}
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
                type:'danger'
            }) 
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
		if(!this.state.noData) this.findChat(this.state.page);
		
	}

	setMessage = async(text)=>{
		let message = newMessage(this.props.user._id,this.user._id,'text',text,null,null);
		this.setState(prevState=>{
			return{
				messages : [message,...prevState.messages]
			}			
		},()=>{
			this.props.updateToMessage(this._id,message,this.user);//actualizo messages
		})

		try
		{
			let {status,data} = await newMessageText(this._id,'text',text,this.user._id,message.time);
			let statusMsm = (status===201) ? 'sent' : 'error';
			let	newMsm = changeStatusMessage(this.state.messages,statusMsm,data.time);
				this.setState({
					messages : newMsm
				})
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

	setImage = image=>{
		let message = newMessage('5e4fd53291de4025832fa617','2','image',null,image,null);

		this.setState(prevState=>{
			return{
				messages : [message,...prevState.messages]
			}			
		})
	}

	render(){
		return(
			<Container>
				<Head 
					displayName = {this.user.displayName}
					avatar = {this.user.avatar}
					handleBack = {this.handleBack}
				/>
				<Image style={{flex:1,position:'absolute',zIndex:-1}} source={require('../../assets/images/chat-background.jpg')} />
				<KeyboardAvoidingView style={{flex:1}} enabled>
					<FlatList
                    	data = {this.state.messages}
                    	keyExtractor={(item, index) => item._id}
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
                        		message = {item}
                        		myUser = {this.props.user._id}
                        	/>
                    	)}
                	/>
					<InputChat
						handleModal = {this.handleModal}
						setMessage = {this.setMessage}
					/>
				</KeyboardAvoidingView>
               
                <ModalBottom 
                    modal = {this.state.modalBottom}
                    handleModal = {this.handleModal}
                    setImage = {this.setImage}
                />
			</Container>
		)
	}
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    updateToMessage: (_id,message,user) => dispatch(updateToMessage(_id,message,user))
})

export default connect(mapStateToProps,mapDispatchToProps)(Chat);