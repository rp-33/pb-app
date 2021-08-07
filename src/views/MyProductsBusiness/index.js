import React,{Component} from 'react';
import {
	FlatList,
	StyleSheet
} from 'react-native';
import {Container} from 'native-base';
import ButtonCard from '../../presentations/ButtonCard'


class MyProductBusiness extends Component{

	_handleAddProduct = ()=>this.props.navigation.push('CreateProduct');

	render(){
		return(
			<Container>
				<ButtonCard
					image = "init"
					text = "Add product"
					onPress = {this._handleAddProduct}
					style = {styles.btnCard}
				/>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	btnCard : {
		marginHorizontal:10
	}
})

export default MyProductBusiness;