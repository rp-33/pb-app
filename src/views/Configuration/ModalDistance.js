import React,{Component} from 'react';
import{
	View,
	StyleSheet,
	Text
} from 'react-native';
import Modal from 'react-native-modal';
import {
	Icon,
	Form,
	Button,
	Toast
} from 'native-base';
import themeColor from '../../theme/color';
import { Width } from '../../constants';
import PropTypes from 'prop-types';

class ModalDistance extends Component{
	constructor(props){
		super(props);
		this.state = {
			value : props.distance
		}
	}

	handleIncrease = ()=>{
		if(this.state.value!=100){
			this.setState(prevState=>{
				return{
					value : prevState.value + 1
				}
			})
		}
	}

	handleDecrease = ()=>{
		if(this.state.value!=1){
			this.setState(prevState=>{
				return{
					value : prevState.value - 1
				}
			})
		}
	}

	handleSave = ()=>{
		let {setDistance,handleModal} = this.props;
		handleModal();
		setDistance(this.state.value);
	}

	render(){
		let {
			modal,
			handleModal,
		} = this.props;
		return(
			<Modal style={styles.modal} onBackdropPress={handleModal} onBackButtonPress={handleModal} isVisible={modal}>     
            	<View style={styles.modalContent}>
                	<View style={styles.imageContent}>
                    	<View style={styles.image}>
                        	<Icon style={styles.icon} type='FontAwesome5' name='map-marker-alt'/>
                    	</View>
                	</View>
                	<View style={{alignItems:'center',marginVertical:7}}>
                    	<Text style={{fontSize:15,textAlign:'center'}}>Distance</Text>
                	</View>

                	<Form>              		
                		<View style={styles.ctnDistance}>
                			<Button dark transparent onPress={this.handleDecrease}>
                    			<Icon name="angle-left" type='FontAwesome5'/>
                			</Button>
                			<Text style={styles.text}>{this.state.value}</Text>
                			<Button dark transparent onPress = {this.handleIncrease}>
                    			<Icon name="angle-right" type='FontAwesome5'/>
                			</Button>
                		</View>
                        <Button 
                            style={{marginTop: 15}} 
                            full 
                            rounded 
                            onPress={this.handleSave} 
                        >
                            <Text style={{fontSize:17,color:'black'}}>Save</Text>
                        </Button>
                	</Form>
                    
            	</View>             
        	</Modal>
		)
	}
}

ModalDistance.propTypes = {
	modal : PropTypes.bool.isRequired,
	distance : PropTypes.number.isRequired,
	handleModal : PropTypes.func.isRequired,
	setDistance : PropTypes.func.isRequired
}

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
    },
    ctnDistance: {
    	flexDirection:'row',
    	justifyContent:'center',
    	alignItems:'center'
    },
    text:{
    	fontSize:20,
    	fontWeight:'bold',
    	marginHorizontal:10
    }
})

export default ModalDistance;