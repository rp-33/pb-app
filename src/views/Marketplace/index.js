import React,{Component} from 'react';
import {FlatList} from 'react-native';
import {Container} from 'native-base';
import Product from '../../presentations/Product';

class Marketplace extends Component{
	constructor(props){
		super(props);
		this.state = {
			products : [1,2,3,4]
		}
	}

	render(){
		return(
			<Container>
				<FlatList
                    data = {this.state.products}
                    keyExtractor={(item, index) => index.toString()}
          			onEndReachedThreshold={0.2}
          			initialNumToRender={20}
                    renderItem = {({item,index})=>(
                        <Product
                        	key = {index.toString()}
                        	product = {item}
                        />
                    )}
                />
			</Container>
		)
	}
}

export default Marketplace;