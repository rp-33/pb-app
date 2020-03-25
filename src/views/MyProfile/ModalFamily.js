import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import Modal from 'react-native-modal';
import { galery, camera } from '../../utils/imagepicker';
import { Icon } from 'native-base';
import { Avatar } from 'react-native-paper';
import color from '../../theme/color';
import { Width } from '../../constants';

const ModalFamily = ({ image, modal, handleModal, setAvatar })=>{
    
    const handleCamera = () => {
        handleModal();
        camera(setAvatar);
    };

    const handleGalery = () => {
        handleModal();
        galery(setAvatar);
    };

    return (
        <Modal style={styles.modal} onBackdropPress={handleModal} onBackButtonPress={handleModal} isVisible={modal}>     
            <View style={styles.modalContent}>
                <View style={styles.imageContent}>
                    <View style={styles.image}>
                        <Avatar.Image 
                        	style={{backgroundColor:'white'}} 
                        	size={50} 
                        	source={require("../../assets/images/logo.png")} 
                        />
                    </View>
                </View>
                <View style={{alignItems:'center',marginVertical:7}}>
                    <Text style={{fontSize:15}}>¿Quieres cambiar tu foto de perfil?</Text>
                </View>
                <View style={styles.btnContent}>
                    <TouchableOpacity onPress={handleCamera}>
                        <View style={[styles.btn,{marginRight:25}]}>
                            <Icon
                                type='Ionicons' 
                                name='md-camera' 
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={handleGalery}>
                        <View style={[styles.btn,{marginLeft:25}]}>
                            <Icon 
                                size={22} 
                                type='Ionicons' 
                                name='ios-images' 
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity> 
                </View>      
            </View>             
        </Modal>
    )
};

ModalFamily.proptypes = {
    modal: PropTypes.bool.isRequired,
    handleModal : PropTypes.func.isRequired,
    setAvatar : PropTypes.func.isRequired,
    image : PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    modal:{
        justifyContent:'center',
        alignItems:'center'
    },
    modalContent:{
        width: Width-40,
        backgroundColor:'white',
        borderRadius:3,
        paddingVertical:20,
        paddingHorizontal:10
    },
    imageContent:{
        width:'100%',
        height:5,
        alignItems:'center'
    },
    image: {
        justifyContent:'center',
        alignItems:'center',
        top:-50,
        width:55,
        height:55,
        borderRadius:27,
        borderWidth:5,
        borderColor:'#f1f1f1',
    },
    icon: {
        color:'white',
        fontSize:25
    },
    btnContent: {
        marginTop:10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row'
    },
    btn: {
        width:50,
        height:50,
        borderRadius:25, 
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:color.primary
    },
});

export default ModalFamily;