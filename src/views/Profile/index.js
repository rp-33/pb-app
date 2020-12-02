import React,{Component} from 'react';
import {
	View,
	StyleSheet,
	Text
} from 'react-native';
import {
	Container,
	Content,
	H3,
	Icon,
	Toast
} from 'native-base';
import ContentLoader, { Rect } from 'react-content-loader/native';
import Head from './Head';
import Pictures from './Pictures';
import Hobbies from './Hobbies';
import {findUser} from '../../api/user';
import themeColor from '../../theme/color';

class Profile extends Component{
	constructor(props){
		super(props);
		this.user = props.navigation.getParam('user');
		this.state = {
			pictures : [this.user.avatar],
			family : [],
			hobbies : [],
			biography : ''
		};
	}

	componentDidMount(){
		this.findUser(this.user._id);
	}

	findUser = async(_id)=>{
		try
		{
			let {status,data} = await findUser(_id);
			if(status===200)
			{
				this.setState(prevState=>{
					return{
						pictures : [...data.pictures,...prevState.pictures],
						biography : data.biography,
						family : data.family || [],
						hobbies : data.hobbies || [],
					}
				})
			}
			else
			{
				Toast.show({
                    text: data.error,
                    textStyle: { fontSize: 15  },
                    buttonTextStyle: { color: '#000000', fontSize: 15 },
                    buttonText: "Ok",
                    duration: 3000,
                    type: "danger"
                })     
			}
		}
		catch(err)
		{
			Toast.show({
                text: 'Error',
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Ok",
                duration: 3000,
                type: "danger"
            })     
		}
	}

	handleBack = ()=>this.props.navigation.goBack();

	handleChat = ()=>{
		this.props.navigation.navigate('Chat',{
			user : this.props.navigation.getParam('user'),
			_id : this.props.navigation.getParam('_id')
		});
	}

	handlePicture = picture => this.props.navigation.push('Picture',{picture: picture})

	render(){
		return(
			<Container>
				<Head 
					handleBack = {this.handleBack}
					handleNavigation = {this.props.navigation.getParam('_id') ? this.handleChat : null}
				/>
				<Content style={styles.ctn}>
					<View style ={styles.ctnText}>
						<Pictures 
							pictures = {this.state.pictures}
							handleNavigation = {this.handlePicture}
						/>
					</View>
					<View style = {styles.ctnText}>
						<Icon 
                            name="ios-paw" 
                            type='Ionicons'
                            style={styles.icon}
                        />
						<H3 style={styles.capitalize}>
                           {this.user.displayName}
                        </H3>
					</View>
					<View style = {styles.ctnText}>
						<Icon 
                            name="md-create" 
                            type='Ionicons'
                            style={styles.icon}
                        />
						<H3 style={styles.capitalize}>
                           Biography
                        </H3>
					</View>
					<Text style={{color:themeColor.secondary,fontSize:20}}>{this.state.biography}</Text>
					<View style = {styles.ctnText}>
						<Icon 
                            name="logo-game-controller-a" 
                            type='Ionicons'
                            style={styles.icon}
                        />
						<H3 style={styles.capitalize}>
                           Hobbies 
                        </H3>
					</View>
					<Hobbies 
						hobbies = {this.state.hobbies}
					/>
					<View style = {styles.ctnText}>
						<Icon 
                            name="ios-contacts" 
                            type='Ionicons'
                            style={styles.icon}
                        />
						<H3 style={styles.capitalize}>
                           Families
                        </H3>
					</View>
					<Pictures 
						pictures = {this.state.family}
					/>
				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	ctn:{
		paddingHorizontal:10
	},
	ctnText : {
		flexDirection:'row',
		marginVertical:10
	},
	 icon : {
        fontSize : 20,
        marginRight:10
    },
    capitalize:{
    	textTransform:'capitalize'
    }
})

export default Profile;