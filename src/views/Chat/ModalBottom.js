import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import Modal from 'react-native-modal';
import {Button,Right} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { galery, camera } from '../../utils/imagepicker';
import Proptypes from 'prop-types';

const ModalBottom = ({modal, handleModal,setImage,handleLocation})=>{

  const handleCamera = () => {
    handleModal();
    camera(setImage);
  };

  const handleGalery = () => {
    handleModal();
    galery(setImage);
  };

  const handleOpenLocation = ()=>{
    handleModal();
    handleLocation();
  }

  return(
    <Modal isVisible={modal} style={styles.bottomModal} onBackdropPress={()=>handleModal()} onBackButtonPress ={()=>handleModal()}>
      <View style={styles.modalContent}> 
        <TouchableOpacity onPress = {()=>handleCamera()}>
          <View style={styles.item}>
           <Image source={require('../../assets/images/camera.png')} style={styles.img}/>
          </View>
        </TouchableOpacity> 
        <TouchableOpacity onPress = {()=>handleGalery()}>
          <View style={styles.item}>
            <Image source={require('../../assets/images/galery.png')} style={styles.img}/>
          </View>
        </TouchableOpacity> 
        <TouchableOpacity onPress = {()=>handleOpenLocation()}>
          <View style={styles.item}>
            <Image source={require('../../assets/images/point.png')} style={styles.img}/>
          </View>
        </TouchableOpacity>   
      </View>
    </Modal>
  )
          
}

const styles = StyleSheet.create ({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection:'row'
  },
  item:{
    width:70,
    height:70,
    borderRadius:35, 
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#f2f2f2'
  },
  img:{
    width:35,
    height:35
  }
})

ModalBottom.proptypes = {
  modal : Proptypes.bool.isRequired,
  handleModal : Proptypes.func.isRequired,
}

export default ModalBottom;