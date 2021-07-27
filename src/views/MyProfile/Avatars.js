import React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {Icon} from 'native-base';
import { Avatar } from 'react-native-paper';
import Proptypes from 'prop-types';
import themeColor from '../../theme/color';

const Pictures = ({pictures,avatar,handleModal,handlePicture,handleDelete})=>(

	<FlatList
        horizontal={true}
        showsHorizontalScrollIndicator = {false}
        ListHeaderComponent ={
            <View style={styles.ctnAvatar}>
                <TouchableOpacity
                    onPress = {()=>handleModal()}
                >
                    <View style={styles.iconCamera}>
                        <Icon 
                        type='Ionicons'
                        name="md-camera"  
                        style = {styles.icon}
                        />
                    </View>
                    <Avatar.Image 
                    source={{uri:avatar}} 
                    style={{marginHorizontal : 5}}
                    size = {70} 
                    /> 
                </TouchableOpacity>
            </View>
        }
        data = {pictures}
        contentContainerStyle ={{
        	alignItems : 'center',
        	paddingTop: 5,
        	paddingEnd: 5
        }}
        renderItem = {({item,index})=>(
            <View 
                key={index} 
                style={styles.ctnPictures}
            >
                <TouchableOpacity onPress = {()=>handlePicture(item)}>
                    <Avatar.Image 
                        source={{uri:item}} 
                        style={{marginHorizontal : 5}}
                        size = {70} 
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

)


Pictures.proptypes = {
  	pictures : Proptypes.array.isRequired,
    avatar : Proptypes.string.isRequired,
    handleModal : Proptypes.func.isRequired,
    handlePicture : Proptypes.func.isRequired,
    handleDelete : Proptypes.func.isRequired
}

const styles = StyleSheet.create({
    ctnAvatar:{
        marginTop:10,
        marginBottom:10,
        position:'relative'
    },
    iconCamera:{
        width:25,
        height:25,
        borderRadius:12.5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:themeColor.primary,
        position:'absolute',
        bottom:5,
        right:1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    ctnPictures:{
        marginVertical : 10,
        position:'relative'
    },
    icon:{
        fontSize:16,
        color:'white'
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
    }
})

export default Pictures;