import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
} from 'react-native';
import Modal from 'react-native-modal';
import { 
    Text,
    Icon, 
    Form, 
    Item, 
    Input, 
    Button 
} from 'native-base';
import themeColor from '../../theme/color';
import { Width } from '../../constants';
import { Formik } from 'formik';
import { ChangeAgeSchema } from '../../constants';
import FieldInput from '../../presentations/FieldInput';

const ModalAge = ({ modal, handleModal,setAge,age }) => {
    
    const handleSubmit = (values, actions) => { 
        handleModal(); 
        setAge(values, actions);
    };

    return (
        <Modal style={styles.modal} onBackdropPress={handleModal} onBackButtonPress={handleModal} isVisible={modal}>     
            <View style={styles.modalContent}>
                <View style={styles.imageContent}>
                    <View style={styles.image}>
                        <Icon style={styles.icon} type='Ionicons' name='md-create' />
                    </View>
                </View>
                <View style={{alignItems:'center',marginVertical:7}}>
                    <Text style={{fontSize:15,textAlign:'center'}}>Pet age.</Text>
                </View>
                <Formik
                    initialValues={{ age }}
                    onSubmit={(values, actions) => handleSubmit(values, actions)}
                    validationSchema = {ChangeAgeSchema}
                >
                    {formikProps => (
                        <Form style={{paddingHorizontal:10, marginTop:5}}>
                           <FieldInput
                                formikProps = {formikProps}
                                placeholder="pet age"
                                type = "age" 
                                keyboardType = {"phone-pad"}                     
                            />
                            <Button 
                                style={{marginTop: 15}} 
                                full 
                                rounded 
                                onPress={formikProps.handleSubmit} 
                            >
                                <Text style={{fontSize:17,color:'black'}}>Save</Text>
                            </Button>
                        </Form>
                    )}
                </Formik>
                    
            </View>             
        </Modal>
    )
};

ModalAge.proptypes = {
    modal: PropTypes.bool.isRequired,
    handleModal : PropTypes.func.isRequired,
    setDisplayname : PropTypes.func.isRequired,
    displayName : PropTypes.string.isRequired
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
        borderColor:'white',
    },
    icon: {
        paddingLeft:5,
        color: 'white',
        fontSize:25,
        backgroundColor: themeColor.primary,
        width: 50,
        height: 50,
        borderRadius: 25,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});

export default ModalAge;