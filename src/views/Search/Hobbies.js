import React from 'react';
import {
	FlatList
} from 'react-native';
import { Badge } from 'react-native-paper';

const Hobbies = ({hobbies})=>{
	return(
		<FlatList
		 	horizontal={true}
        	showsHorizontalScrollIndicator = {false}
        	contentContainerStyle ={{
        		alignItems : 'center',
        		paddingTop: 5,
        		paddingEnd: 5
        	}}
            data = {hobbies}
            keyExtractor={(item, index) => index.toString()}        
            renderItem = {({item,index})=>(
                <Badge 
                	key={index}
                	size = {30}
                	style = {{marginHorizontal:5,paddingHorizontal:10}}
                >
                	{item}
                </Badge>
            )}
        />
	)
}

export default Hobbies