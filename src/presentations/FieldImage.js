import React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Text
} from 'react-native';
import {Icon} from 'native-base';
import Proptypes from 'prop-types';
import themeColor from '../theme/color';
import { galery } from '../utils/imagepicker';

const FieldImage = ({photos,handlePicture,handleDelete,errors})=>{
    
    const handleImage = ()=>{
       galery(handlePicture)
    }

    return(
        <View>
	    <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator = {false}
        data = {photos}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle ={{
        	alignItems : 'center',
        	paddingTop: 5,
        	paddingEnd: 5
        }}
        ListHeaderComponent ={
            <View style={styles.ctnAvatar}>
                <TouchableOpacity
                    onPress = {handleImage}
                >
                    <Image 
                        source={require('../assets/images/galery.png')}
                        style={styles.icon}
                    /> 
                </TouchableOpacity>
            </View>
        }
        renderItem = {({item,index})=>(
            <View 
                key={index} 
                style={styles.ctnPictures}
            >
                <TouchableOpacity onPress = {()=>handlePicture(item)}>
                    <Image 
                        source={{uri:item}} 
                        style={styles.pictures}
                    /> 
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress = {()=>handleDelete(item)}
                    style={styles.ctnDelete}
                >
                    <Icon 
                        type='Ionicons'
                        name="md-close"
                        style = {styles.iconDelete}
                    />
                </TouchableOpacity>
            </View>
        )}
        />
            {errors && <Text style={styles.error}>{errors}</Text>}
        </View>
    )
}

FieldImage.proptypes = {
  	photos: Proptypes.array.isRequired,
    handlePicture : Proptypes.func.isRequired,
    handleDelete : Proptypes.func.isRequired,
    errors : Proptypes.string
}

const styles = StyleSheet.create({
    ctnAvatar:{
        marginTop:10,
        marginBottom:10,
        position:'relative',
        backgroundColor:'#f1f1f1',
        borderWidth:1,
        borderColor:themeColor.secondary,
        width:70,
        height:70,
        borderRadius:35,
        marginHorizontal:5,
        alignItems:'center',
        justifyContent:'center'
    },
    ctnPictures:{
        marginVertical : 10
    },
    pictures : {
        borderWidth:1,
        borderColor:'#ffebe6',
        width:70,
        height:70,
        borderRadius:35,
        marginLeft:5,
        marginRight:5
    },
    icon:{
        width:35,
        height:35
    },
    ctnDelete:{
        position:'absolute',
        width:25,
        height:25,
        backgroundColor:themeColor.primary,
        justifyContent:'center',
        alignItems:'center',
        borderRadius :12.5,
        right:5
    },
    iconDelete:{
        color:'black',
        fontSize : 16
    },
    error: {
        fontStyle: 'italic',
        color: '#ed2f2f',
        fontSize: 15,
        marginTop: 3,
        marginLeft: 15,
    },
})

export default FieldImage;