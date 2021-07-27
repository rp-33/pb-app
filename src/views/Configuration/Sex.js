import React,{Component} from 'react';
import {
	View,
	StyleSheet
} from 'react-native';
import {
	Card, 
	CardItem,
	Text,
} from 'native-base';
import { 
	RadioButton 
} from 'react-native-paper';
import {editSex} from '../../api/user';
import PropTypes from 'prop-types';

class Sex extends Component{
	constructor(props){
		super(props);
		this.state = {
			sex:props.sex
		}
	}

	handleSex = async(value)=>{
		this.setState({sex: value});
		try
		{
			let {status,data} = await editSex(value);
			if(status===201)
			{
				this.props.handleSex(value,201)
			}
			else
			{
				this.setState({
					sex : value=='male' ? 'female' :  'male'
				},()=>{
					this.props.handleSex(data.error,400)
            	})
			}
		}
		catch(err)
		{
			this.setState({
				sex : value=='male' ? 'female' :  'male'
			},()=>{
				this.props.handleSex('Error',500)
            })
		}
	}
	render(){
		return(
			<Card style={styles.card}>
				<CardItem>
					<View>
						<View style={styles.ctnSex}>
							<RadioButton
          						value="male"
          						color="blue"
          						status={this.state.sex === 'male' ? 'checked' : 'unchecked'}
          						onPress = {()=>this.handleSex('male')}
          					/>
        					<Text>Male</Text>
        				</View>
        				<View style={styles.ctnSex}>
        					<RadioButton
          						value="female"
          						color="pink"
          						status={this.state.sex === 'female' ? 'checked' : 'unchecked'}
          						onPress = {()=>this.handleSex('female')}
          					/>
        					<Text>Female</Text>
        				</View>	
        			</View>					
				</CardItem>
			</Card>
		)
	}
}

const styles = StyleSheet.create({
	card:{
		marginBottom:20
	},
	ctnSex:{
		flexDirection:'row',
		alignItems:'center',
		width:'100%'
	}
})


Sex.propTypes = {
	sex : PropTypes.string.isRequired,
	handleSex : PropTypes.func.isRequired
}

export default Sex;