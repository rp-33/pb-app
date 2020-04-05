import React,{Fragment} from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import themeColor from '../theme/color';

const LoadingMore = ({loading})=>{
	if(!loading) return null;
	return(
		<View style ={styles.ctn} >
			<ActivityIndicator
               color = {themeColor.primary}
               size = {30}
               style={styles.loading}
            />
		</View>
	)
}

LoadingMore.propTypes = {
	loading : PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
	ctn :{
		width : '100%',
		height: 80,
		marginTop:30,
		justifyContent:'center',
		alignItems:'center'
	},
	loading:{
		backgroundColor:'white',
		width:40,
		height:40,
		borderRadius:20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 1,
		shadowRadius: 5.84,
		elevation: 6
	}
})

export default LoadingMore;