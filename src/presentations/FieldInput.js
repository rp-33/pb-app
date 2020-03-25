import React from 'react';
import {
	StyleSheet,
	View
} from 'react-native'
import {
	Input,
	Item,
	Text
} from 'native-base';

const FieldInput = ({placeholder,type,formikProps,secureTextEntry, keyboardType})=>{
	const { handleChange, handleBlur, values, errors, touched } = formikProps;
	
	return(
		<View style={styles.ctnInput}>
			<Item rounded last error={errors[type] && touched[type]}>
            	<Input 
            		placeholder={placeholder} 
            		onChangeText={handleChange(type)}
          			onBlur={handleBlur(type)}
          			secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
          			value={values[type]}
            	/>
        	</Item>
        	{
        		(errors[type] && touched[type]) &&
            	<Text style={styles.error}>{errors[type]}</Text>
        	}
        </View>
    
	)
}

const styles = StyleSheet.create({
	ctnInput:{
		marginVertical : 10
	},
	 error: {
        fontStyle: 'italic',
        color: '#ed2f2f',
        fontSize: 15,
        marginTop: 3,
        marginLeft: 15,
    },
})

export default FieldInput;