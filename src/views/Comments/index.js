import React,{Component} from 'react';
import {
	StyleSheet,
	View,
	FlatList
} from 'react-native';
import {
	Container
} from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import CommentBubble from './CommentBubble';
import InputChat from './InputChat';

class Comments extends Component{
	constructor(props){
		super(props);
		this.state = {
			comments :[1,2,3,4,5,6,7,8]
		}
	}

	handleBack = ()=>this.props.navigation.goBack();

	handleSend = (text)=>{
		console.log(text)
	}

	render(){
		return(
			<Container>
				<HeadBack 
					title = "Comments"
					handleBack = {this.handleBack}
				/>
				<FlatList
					style={{marginTop:10}}
                    data = {this.state.comments}
                    keyExtractor={(item, index) => item}
                    renderItem = {({item,index})=>(
                        <CommentBubble/>
                    )}
                />
                <InputChat 
                	handleSend = {this.handleSend}
                />
			</Container>
		)
	}
}

export default Comments;