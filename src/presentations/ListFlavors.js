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

const ListFlavors = ({flavors,selectFlavor,handleSelectFlavor})=>{

	if(flavors.length === 0) return null;
	
	const _handlePosition = (array,flavor)=>{
		return array.findIndex(item=>item.text === flavor)
	}

	return(
		<View>
			<FlatList 
				style={styles.list} 
				horizontal={true}
        		showsHorizontalScrollIndicator = {false}
        		data = {flavors}
        		keyExtractor={(item, index) => index.toString()}
        		contentContainerStyle ={{
        			alignItems : 'center',
        			paddingTop: 5,
        			paddingEnd: 5
        		}}
        		renderItem = {({item,index})=>(
        			<View>
        				<TouchableOpacity
        					onPress = {()=>handleSelectFlavor(item.text)}
        					style={[styles.ctnItem,{backgroundColor:selectFlavor===item.text ? themeColor.primary : 'white'}]}
        				>
        					<Text>{item.text}</Text>
        				</TouchableOpacity>
        			</View>
        		)}
			/>
			{selectFlavor !== '' &&
			<FlatList
				style={styles.list} 
				horizontal={true}
        		showsHorizontalScrollIndicator = {false}
        		data = {flavors[_handlePosition(flavors,selectFlavor)].sizes}
        		keyExtractor={(item, index) => index.toString()}
        		renderItem = {({item,index})=>(
        			<View>
        				<TouchableOpacity
        					style={styles.ctnItem}
        				>
        					<Text>{item}</Text>
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
	ctnItem:{
		borderWidth:1,
		borderColor:'#c7c7c7',
		paddingVertical:5,
		paddingHorizontal : 15,
		borderRadius:20,
		marginHorizontal : 7
	}
})

export default ListFlavors