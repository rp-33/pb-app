import React,{Component} from 'react';
import {StyleSheet,View} from 'react-native';
import {Container} from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import SliderImages from './SliderImages';

class DetailsProduct extends Component{
	constructor(props){
		super(props);
		this.state = {
			photos : ['https://www.qfeast.com/imret/q/dxHFgj.jpg','https://www.qfeast.com/imret/q/dxHFgj.jpg'],
		}
	}

	handleBack = ()=>this.props.navigation.goBack();

	render(){
		return(
			<Container>
				<HeadBack 
					title = "titulo"
					handleBack = {this.handleBack}
				/>
				<View style={styles.ctn}>
					<SliderImages 
					images = {this.state.photos}
					layout = 'stack'
					/>
					<View style={styles.ctnDetails}>
						
					</View>
				</View>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	ctn:{
		flex:1
	},
	ctnDetails : {
		paddingHorizontal: 20
	}
})

export default DetailsProduct;