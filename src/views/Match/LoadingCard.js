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


const LoadingCard = ({loadingMore})=>{
	if(!loadingMore) return null;
	return(
		<ContentLoader style={styles.card}>
			<Rect
				x="2" 
				y="2" 
				width={SCREEN_WIDTH - 4} 
				height={SCREEN_HEIGHT - 4} 
			/>
		</ContentLoader>

	)
}

LoadingCard.propTypes = {
	loadingMore : PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
	card :{
		width : SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		borderRadius:4,
		margin:10,
		borderWidth:2,
		borderColor:'#f1f1f1',
		overflow:'hidden'
	},
})

export default LoadingCard;