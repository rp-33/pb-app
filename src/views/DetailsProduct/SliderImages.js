import React from 'react';
import {
	Image,
	View,
	StyleSheet
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {width} from '../../constants/dimensions';
import PropTypes from 'prop-types';

const screen = width - 50;

const SliderImages = ({images,layout})=>{

	let carousel = {};

	const renderItem = ({item, index}) => {
        return (
        	<View
        		style= {styles.ctn} 
        	>
            	<Image 
					source ={{uri:item}}
					style= {styles.image}
				/>
			</View>
        );
    }

    return(
		<Carousel
            ref={(c) => { carousel = c; }}
            data={images}
            layout={layout}
            renderItem={renderItem}
            sliderWidth={width}
          	itemWidth={screen}
        />
	)
}

SliderImages.propTypes = {
	image : PropTypes.array.isRequired,
	layout : PropTypes.string.isRequired
}

const styles = StyleSheet.create({
	ctn:{
		width:screen,
		height:'auto',
		marginVertical:20,
		borderRadius:20,
		backgroundColor:'white',
		overflow:'hidden'
	},
	image : {
		width:'100%',
		height:'100%'
	}
})

export default SliderImages;