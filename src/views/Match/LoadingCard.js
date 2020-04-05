import React,{Fragment} from 'react';
import {
	StyleSheet,
	View,
	Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import ContentLoader, { Rect } from 'react-content-loader/native';

let {width} = Dimensions.get('window'),
	SCREEN_WIDTH = (width - 40)/2,
	SCREEN_HEIGHT = SCREEN_WIDTH * 1.2;


const LoadingCard = ({loading})=>{
	if(!loading) return null;
	return(
		<ContentLoader style={styles.card}>
			<Rect
				x="2" 
				y="2" 
				rx = "10"
				ry = "10"
				width={SCREEN_WIDTH - 4} 
				height={SCREEN_HEIGHT - 4} 
			/>
		</ContentLoader>

	)
}

LoadingCard.propTypes = {
	loading : PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
	card :{
		width : SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		margin:10
	},
})

export default LoadingCard;