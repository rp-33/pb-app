import React from 'react';
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	Image
} from 'react-native';
import {imageTypeProduct} from '../../utils/imageTypeProduct';

const Item = ({_id,name,type,handleNavigation})=>{
	return(
		<TouchableOpacity
            key = {_id}
            style={styles.item}
            onPress = {()=>handleNavigation(_id,name)}
        >
        	<Image 
        	    source ={imageTypeProduct(type)}
        	    style={styles.image}
        	/> 
            <Text>{name}</Text>
        </TouchableOpacity>
                        
	)
}

const styles = StyleSheet.create({
	item : {
        marginVertical:10,
        marginHorizontal:10,
        paddingBottom:5,
        paddingLeft:5,
        flexDirection:'row'
    },
    image : {
    	width:20,
    	height:20,
    	marginRight:10
    }
})

export default Item;