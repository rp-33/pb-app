import React,{Fragment} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ContentLoader, { Rect } from 'react-content-loader/native';

const Loading = ({loading})=>{
	if(!loading) return null;
	return(
		<ContentLoader 
    		speed={1}
    		backgroundColor={'#f1f1f1'}
    		foregroundColor={'#c7c7c7'}
    		style = {styles.ctn}
		>
			<Rect x="10" y="0" rx="30" ry="30" width="60" height="60" />
    		<Rect x="90" y="17" rx="4" ry="4" width="90" height="13" />
    		<Rect x="90" y="40" rx="3" ry="3" width="190" height="10" />
		</ContentLoader>

	)
}

const styles = StyleSheet.create({
	ctn:{
		width:'100%',
		height : 62,
		marginVertical:10
	}
})

Loading.propTypes = {
	loading : PropTypes.bool.isRequired
}

export default Loading;