import React from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {Icon} from 'native-base';
import { Avatar } from 'react-native-paper';
import Proptypes from 'prop-types';
import themeColor from '../../theme/color';

const Pictures = ({pictures,handleNavigation})=>(

	<ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator = {false}
        contentContainerStyle ={{
        	alignItems : 'center',
        	paddingTop: 5,
        	paddingEnd: 5
        }}
    >

        {([...pictures].reverse() || []).map((item,i)=>
        	<TouchableOpacity
                key={item} 
                style={{marginVertical:10}}
                onPress = {()=>handleNavigation(item)}
            >
                <Avatar.Image 
                    source={{uri:item}} 
                    style={{marginHorizontal : 5}}
                    size = {70} 
                />
            </TouchableOpacity>
        )}
         
    </ScrollView>
)


Pictures.proptypes = {
  	pictures : Proptypes.array.isRequired,
    handleNavigation : Proptypes.func.isRequired
}

export default Pictures;