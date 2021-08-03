import React from 'react';
import {
	FlatList,
	TouchableOpacity,
	View,
	Text,
	StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import themeColor from '../theme/color';

const ListSize = ({sizes,selectSize,handleSelectSize})=>{

	if(sizes.length === 0) return null;

	const _handlePosition = (array,size)=>{
		return array.findIndex(item=>item.text === size)
	}

	return(
		<View>
			<FlatList 
				style={styles.list} 
				horizontal={true}
        		showsHorizontalScrollIndicator = {false}
        		data = {sizes}
        		keyExtractor={(item, index) => index.toString()}
        		contentContainerStyle ={{
        			alignItems : 'center',
        			paddingTop: 5,
        			paddingEnd: 5
        		}}
        		renderItem = {({item,index})=>(
        			<View>
        				<TouchableOpacity
        					onPress = {()=>handleSelectSize(item.text)}
        					style={[styles.ctnSize,{backgroundColor:selectSize===item.text ? themeColor.primary : 'white'}]}
        				>
        					<Text>{item.text}</Text>
        				</TouchableOpacity>
        			</View>
        		)}
			/>
			{selectSize !== '' &&
			<FlatList
				style={styles.list} 
				horizontal={true}
        		showsHorizontalScrollIndicator = {false}
        		data = {sizes[_handlePosition(sizes,selectSize)].colors}
        		keyExtractor={(item, index) => index.toString()}
        		renderItem = {({item,index})=>(
        			<View>
        				<TouchableOpacity
        					style={[styles.ctnColor,{backgroundColor:item}]}
        				>
        				</TouchableOpacity>
        			</View>
        		)}
			/>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	ctn:{
		flex:1
	},
	list:{
		height: 50,
	},
	ctnSize:{
		borderWidth:1,
		borderColor:'#c7c7c7',
		paddingVertical:5,
		paddingHorizontal : 15,
		borderRadius:20,
		marginHorizontal : 7
	},
	ctnColor:{
		width: 30,
		height:30,
		borderRadius:15,
		borderWidth:1,
		borderColor:'#c7c7c7',
		marginHorizontal : 5
	}
})

export default ListSize;