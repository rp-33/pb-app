import React,{Component} from 'react';
import {
	StyleSheet,
	View
} from 'react-native';
import {connect} from 'react-redux';
import {
	Container,
	Content,
	Toast,
	Card, 
	CardItem,
	Text,
	Icon
} from 'native-base';
import Head from './Head';
import {
	setLogout,
	setDistance,
	setSex,
	setNotifications,
	setAge
} from '../../actions/user';
import { setLoading } from '../../actions/loading';
import {
	logout,
	editDistance,
    editAge
} from '../../api/user';
import themeColor from '../../theme/color';
import ModalDistance from './ModalDistance';
import ModalAge from './ModalAge';
import Sex from './Sex';
import Notification from './Notification';


class Configuration extends Component{
	constructor(props){
		super(props);
		this.state = {
			modalDistance : false
		}
	}

	handleModal = (modal) => () => {
        this.setState(previosState=>({
            [modal] : !previosState[modal]
        }))
    };

	handleBack = ()=> this.props.navigation.goBack();

	handleLogout = async()=>{
		let {setLogout,setLoading,navigation} = this.props;	
		setLoading(true);
        try{            
            let { status, data } = await logout();
            if(status === 204)
            {   
                setLogout();
				navigation.navigate('Home');
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
        finally
        {
            setLoading(false);
        }	
	}

	setDistance = async(value)=> {
		let {setLoading,setDistance} = this.props;	
		setLoading(true);
		try
		{
			let { status, data } = await editDistance(value);
			if(status===201)
			{
				setDistance(value);
				Toast.show({
                    text: 'saved successfully',
                    textStyle: { fontSize: 15  },
                    buttonTextStyle: { color: '#000000', fontSize: 15 },
                    buttonText: "Ok",
                    duration: 3000
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
		finally
        {
            setLoading(false);
        }
	}

	setAge = async(values, actions)=>{
        let { setLoading, setAge} = this.props;
        setLoading(true);
        try{            
            let { status, data } = await editAge(values.age)
            if(status === 201)
            {   
                setAge(parseInt(values.age));
                Toast.show({
                    text: 'saved successfully',
                    textStyle: { fontSize: 15  },
                    buttonTextStyle: { color: '#000000', fontSize: 15 },
                    buttonText: "Ok",
                    duration: 3000
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
        finally
        {
            setLoading(false);
        }
    }

	setSex = (value)=>this.props.setSex(value);

	setNotifications = (value)=>this.props.setNotifications(value);

	navigationPassword = ()=>this.props.navigation.navigate('EditPassword');

	render(){
		let {
			sex,
			notifications,
			distance,
			pet,
			age
		} = this.props.user;
		return(
			<Container>
				<Head 
					handleBack = {this.handleBack}
					handleLogout = {this.handleLogout}
				/>
				<Content style={styles.ctn}>
					<Card style={styles.card}>
						<CardItem
							button
							onPress = {this.handleModal('modalDistance')}
						>
							<View style={styles.ctnPassword}>
								<View style={{flexDirection:'row'}}>
									<Icon style={styles.icon} type='FontAwesome5' name='map-marker-alt' />                
									<Text>Distance</Text>
								</View>
								<Text style={{color:themeColor.primary}}>{distance}</Text>
							</View>
						</CardItem>
					</Card>
					<Text style={styles.textInfo}>Information</Text>
					<Card style={styles.card}>
						<CardItem 
							button
							onPress = {()=>this.props.navigation.push('EditPet')}
						>
							<Icon style={styles.icon} type='FontAwesome5' name='filter' />
							<Text>{pet}</Text>
						</CardItem>
						<CardItem 
							button
							onPress = {this.handleModal('modalAge')}						
						>
							<Icon style={styles.icon} type='FontAwesome5' name='birthday-cake' />                               
							<Text>{age} years old</Text>
						</CardItem>
					</Card>
					<Text style={styles.textInfo}>Sex</Text>
					<Sex 
						sex = {sex}
						handleSex = {this.setSex}
					/>
					<Text style={styles.textInfo}>Configuration</Text>
					<Card style={styles.card}>
						<CardItem>
							<Notification 
								notifications = {notifications}
								handleNotifications = {this.setNotifications}
							/>
						</CardItem>
						<CardItem
							button
							onPress = {this.navigationPassword}
						>
							<View style={styles.ctnPassword}>
								<View style={{flexDirection:'row'}}>
									<Icon style={styles.icon} type='FontAwesome5' name='lock' />                
									<Text>Password</Text>
								</View>
								<Text>******</Text>
							</View>
						</CardItem>
					</Card>
					<Text style={styles.textInfo}>Legal</Text>
					<Card style={styles.card}>
						<CardItem button>
							<Icon style={styles.icon} type='FontAwesome5' name='user-shield' />
							<Text>Terms and Conditions</Text>
						</CardItem>
						<CardItem button>
							<Icon style={styles.icon} type='FontAwesome5' name='user-secret' />                               
							<Text>Privacy policies</Text>
						</CardItem>
					</Card>
				</Content>
				{this.state.modalDistance &&
				<ModalDistance 
					modal = {this.state.modalDistance}
					distance ={distance}
					handleModal = {this.handleModal('modalDistance')}
					setDistance = {this.setDistance}
				/>
				}
				{this.state.modalAge &&
                <ModalAge
                    modal = {this.state.modalAge}
                    handleModal = {this.handleModal('modalAge')}
                    setAge = {this.setAge}
                    age = {age.toString()}
                />
                }
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	ctn:{
		paddingHorizontal:10
	},
	card:{
		marginBottom:20
	},
	textInfo:{
		color:themeColor.primary,
		fontWeight:'bold'
	},
	ctnPassword : {
		flexDirection:'row',
		justifyContent:'space-between',
		width:'100%'
	},
	icon:{
		marginRight:3,
		fontSize:20,
		color:themeColor.primary
	}
})

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    setLogout : ()=>dispatch(setLogout()),
    setDistance : value =>dispatch(setDistance(value)),
    setSex: value =>dispatch(setSex(value)),
    setNotifications: value =>dispatch(setNotifications(value)),
    setAge : value =>dispatch(setAge(value))
})

export default connect(mapStateToProps,mapDispatchToProps)(Configuration);