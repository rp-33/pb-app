import React,{Component} from 'react';
import {
	Image,
	StyleSheet
} from 'react-native';
import {Container} from 'native-base';
import HeadBack from '../../presentations/HeadBack';

class Picture extends Component{

	handleBack = ()=> this.props.navigation.goBack();

	render(){
		let {getParam} = this.props.navigation;
		return(
			<Container>
				<HeadBack 
					handleBack = {this.handleBack}
					title = "Picture"
				/>
				<Image 
					source = {{uri : getParam('picture')}}
					style = {styles.image}
				/>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	image : {
		flex:1
	}
})

export default Picture;