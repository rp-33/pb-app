import React,{Component} from 'react';
import {FlatList} from 'react-native';
import {Container} from 'native-base';
import TypeProduct from '../../presentations/TypeProduct';
import Product from '../../presentations/Product';
import Head from './Head';

class Marketplace extends Component{
	constructor(props){
		super(props);
		this.state = {
			products : [1,2,3,4],
			type : 'food'
		}
	}

	handleSelect = (type)=>{
		this.setState(prevState=>({
			type : type === prevState.type ? '' : type
		}))
	}

	handleNavigation = (root)=>this.props.navigation.push(root);

	handleNavigationDetails = (_id,name)=>this.props.navigation.push('DetailsProduct',{_id,name})

	render(){
		return(
			<Container>
				<Head 
					cart = {1}
					handleNavigation = {this.handleNavigation}
				/>
				<FlatList
                    data = {this.state.products}
                    keyExtractor={(item, index) => index.toString()}
          			onEndReachedThreshold={0.2}
          			initialNumToRender={20}
          			ListHeaderComponent ={
          				<TypeProduct 
							type = {this.state.type}
							handleSelect = {this.handleSelect}
						/>
          			}
                    renderItem = {({item,index})=>(
                        <Product
                        	key = {index.toString()}
                        	product = {item}
                        	handleNavigationDetails = {this.handleNavigationDetails}
                        />
                    )}
                />
			</Container>
		)
	}
}

export default Marketplace;