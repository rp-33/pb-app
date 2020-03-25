import React from 'react';
import {
   FlatList
} from 'react-native';
import { Badge } from 'react-native-paper';
import Proptypes from 'prop-types';
import themeColor from '../../theme/color';

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
                    key={item}
                    size = {30}
                    style = {{marginHorizontal:5,paddingHorizontal:10,backgroundColor:themeColor.primary}}
                >
                    {item}
                </Badge>
            )}
        />
	)
}

Hobbies.proptypes = {
  	hobbies : Proptypes.array.isRequired
}

export default Hobbies;