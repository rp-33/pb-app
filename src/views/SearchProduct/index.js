import React,{Component} from 'react';
import {FlatList} from 'react-native';
import {Container} from 'native-base';
import Head from './Head';
import Item from './Item';

class SearchProduct extends Component{
	constructor(props){
		super(props);
		this.state = {
			products : [
				{
					_id:'1',
					type : 'daycare',
					name : 'producto 1'
				},
				{
					_id:'2',
					type:'food',
					name : 'producto 2'
				},
				{
					_id:'3',
					type:'supermarket',
					name : 'producto 3'
				}
			],
			value : ''
		}
	}

	handleBack = ()=>this.props.navigation.goBack();

	handleChange = (value)=>{
		this.setState({
			value : value
		})
	}

	handleNavigation = (_id,name)=>this.props.navigation.navigate('DetailsProduct',{_id:_id,name});

	render(){
		return(
			<Container>
				<Head 
					value = {this.state.value}
					handleBack = {this.handleBack}
					handleChange = {this.handleChange}
				/>
				<FlatList
					style={{flex:1}}
          data = {this.state.products}
          keyExtractor={(item) => item._id}
          renderItem = {({item,index})=>(
            <Item 
            	{...item}
            	handleNavigation = {this.handleNavigation}
            />  
          
          )}
        />

			</Container>
		)
	}

}

export default SearchProduct;