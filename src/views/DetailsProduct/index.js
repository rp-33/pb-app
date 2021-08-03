import React,{Component} from 'react';
import {StyleSheet,View} from 'react-native';
import {Container} from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import ListSize from '../../presentations/ListSize';
import ListFlavors from '../../presentations/ListFlavors';
import SliderImages from './SliderImages';

class DetailsProduct extends Component{
	constructor(props){
		super(props);
		this.state = {
			photos : ['https://www.qfeast.com/imret/q/dxHFgj.jpg','https://www.qfeast.com/imret/q/dxHFgj.jpg'],
			selectSize : 'm',		
			selectFlavor : 'perrarina',
			sizes : [
				{
					text:'xl',
					colors : ['red','blue','green']
				},
				{
					text:'m',
					colors : ['green','blue','yellow']
				},
				{
					text:'xs',
					colors : ['red','black']
				},
			],
			flavors : [
				{
					text:'perrarina',
					sizes : ['small','big']
				},
				{
					text:'gatarina',
					sizes : ['medium','big']
				},
			]
		}
	}

	handleBack = ()=>this.props.navigation.goBack();

	handleSelectFlavor = (flavor)=>{
		this.setState(prevState=>({
			selectFlavor : prevState.selectFlavor === flavor ? '' : flavor
		}))
	}

	handleSelectSize = (size)=>{
		this.setState(prevState=>({
			selectSize : prevState.selectSize === size ? '' : size
		}))
	}

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
						<ListSize 
							sizes = {this.state.sizes}
							selectSize = {this.state.selectSize}
							handleSelectSize = {this.handleSelectSize}
						/>
						<ListFlavors 
							flavors = {this.state.flavors}
							selectFlavor = {this.state.selectFlavor}
							handleSelectFlavor = {this.handleSelectFlavor}
						/>
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