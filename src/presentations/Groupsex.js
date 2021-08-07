import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import { RadioButton } from 'react-native-paper';

const Groupsex= ({formikProps,handleSelect})=>{
	const {values} = formikProps;
	return(
		<View style={styles.ctnSex}>
			<View style={styles.sex}>
				<Text>Male</Text>
				<RadioButton
          			value="male"
          			color="blue"
          			status={values['sex']=== 'male' ? 'checked' : 'unchecked'}
        			onPress={()=>handleSelect('male')}
        		/>
        	</View>
        	<View style={styles.sex}>
        		<Text>Female</Text>
        		<RadioButton
          			value="female"
          			color="pink"
          			status={values['sex']=== 'female' ? 'checked' : 'unchecked'}
        			onPress = {()=>handleSelect('female')}
        		/>
        	</View>
		</View>
	)
}

const styles = StyleSheet.create({
	ctnSex:{
		flexDirection:'row',
		marginLeft:10
	},
	sex:{
		flexDirection:'row',
		alignItems:'center',
		marginRight:20
	}

})


export default Groupsex;