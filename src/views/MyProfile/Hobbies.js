import React from 'react';
import {
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Icon} from 'native-base';
import themeColor from '../../theme/color';
import Proptypes from 'prop-types';

const Hobbies = ({hobbies,handleModal,handleDelete})=>{
	return(
		<ScrollView 
        	horizontal={true}
        	showsHorizontalScrollIndicator = {false}
        	contentContainerStyle ={{
        		alignItems : 'center',
        		marginHorizontal : 10,
        		marginBottom : 10,
        		paddingTop: 5,
        		paddingEnd: 5
        	}}
    	>
    		<TouchableOpacity 
    			style={styles.badge}
    			onPress = {()=>handleModal()}
    		>
    			<Text>New Hobbie</Text>
    			<Icon 
                    type='Ionicons'
       	            name="md-add"  
                    style = {styles.icon}
                />
    		</TouchableOpacity>

    		{([...hobbies].reverse() || []).map((item,i)=>
    			<View
    				style={styles.badge} 
    				key={item}
    			>
    				<Text style={styles.capitalize}>{item}</Text>
    				<TouchableOpacity onPress = {()=>handleDelete(item)}>
    				<Icon 
                    	type='Ionicons'
       	            	name="md-close"  
                    	style = {styles.icon}
                	/>
                	</TouchableOpacity>
    			</View>
    		)}

    	</ScrollView>
	)
}

Hobbies.proptypes = {
  	hobbies : Proptypes.array.isRequired,
  	handleModal : Proptypes.func.isRequired,
  	handleDelete : Proptypes.func.isRequired
}

const styles = StyleSheet.create({
	badge : {
		paddingHorizontal:10,
		paddingVertical : 5,
		borderRadius : 40,
		backgroundColor : themeColor.primary,
		marginRight : 10,
		flexDirection : 'row'
	},
	icon : {
		fontSize : 20,
		marginLeft:9,
		marginTop:2
	},
	capitalize : {
		textTransform : 'capitalize'
	}
})

export default Hobbies;