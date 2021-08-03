import React from 'react';
import {StyleSheet} from 'react-native'
import {
    Header,
    Button,
    Item,
    Input,
    Icon
} from 'native-base';
import PropTypes from 'prop-types';


const Head = ({value,handleBack,handleChange})=>{

	return(
		<Header searchBar noShadow style={styles.head} iosBarStyle='dark-content' androidStatusBarColor='white'>
		    <Item>
                <Input 
                    placeholder = "Search products..."
                    value = {value}
                    onChangeText = {(text)=>handleChange(text)}
                />
                <Button  
                    transparent
                    onPress = {()=>handleBack()}
                >	
               		<Icon type='EvilIcons' name="close" />
        	    </Button>
            </Item>
	    </Header>
	)
}

Head.propTypes = {
	value : PropTypes.string.isRequired,
    handleBack : PropTypes.func.isRequired,
    handleChange : PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    head : {
        borderBottomWidth: 0,
        backgroundColor: 'white'
    }
})

export default Head;