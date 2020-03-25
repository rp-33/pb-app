import React,{Fragment} from 'react';
import {
	StyleSheet,
	View
} from 'react-native';
import PropTypes from 'prop-types';
import themeColor from '../../theme/color';

const BarPictures = ({pictures,position})=>{
	return(
		<Fragment>
			{pictures.length>1 &&
				<View style={styles.ctn}>
					{pictures.map((item,i)=>
						<View 
							key = {item}
							style={[
								styles.item,
								position===i ? styles.active : styles.inactive
							]}
						/>
					)}
				</View>
			}
		</Fragment>

	)
}

BarPictures.propTypes = {
	pictures : PropTypes.array.isRequired,
	position : PropTypes.number.isRequired
}

const styles = StyleSheet.create({
	ctn : {
		width:'100%',
		height:5,
		marginBottom:2,
		flexDirection:'row'
	},
	item:{
		marginHorizontal:2,
		borderRadius:20,
		height:5,
		flex:1
	},
	active : {
		backgroundColor:themeColor.primary,
	},
	inactive:{
		backgroundColor:'#f1f1f1'
	}
})

export default BarPictures;