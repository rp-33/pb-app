import React,{Component} from 'react';
import {
	TouchableOpacity,
    View,
	StyleSheet
} from 'react-native'
import {
	Container,
	Content,
	Toast,
	H3,
    Text,
    Icon
}
from 'native-base';
import {connect} from 'react-redux';
import Head from './Head';
import Avatars from './Avatars';
import Families from './Families';
import ModalAvatar from './ModalAvatar';
import ModalFamily from './ModalFamily';
import ModalBiography from './ModalBiography';
import ModalHobbie from './ModalHobbie';
import ModalDisplayname from './ModalDisplayname';
import TextBiography from './TextBiography';
import Hobbies from './Hobbies';
import { setLoading } from '../../actions/loading';
import { 
	setAvatar,
	setFamily,
    setBiography,
    setHobbie,
    deleteHobbie,
    deletePicture,
    deleteFamily,
    setDisplayName
} from '../../actions/user';
import { 
	editAvatar,
	saveFamily,
    editBiography,
    saveHobbie,
    deletehobbie,
    deletepicture,
    deletefamily,
    editDisplayName
} from '../../api/user';


class MyProfile extends Component{

	constructor(props){
		super(props);
		this.state = {
			modalAvatar : false,
			modalFamilies : false,
            modalBiography : false,
            modalHobbie : false,
            modalDisplayname : false
		}
	}

	handleNavigation = ()=>this.props.navigation.push('Configuration');

	handleModal = (modal) => () => {
        this.setState(previosState=>({
            [modal] : !previosState[modal]
        }))
    };

    setAvatar = async(avatar)=>{
    	let { setAvatar, setLoading} = this.props;
        setLoading(true);
        try{            
            let { status, data } = await editAvatar(avatar)
            if(status === 201)
            {	
                setAvatar(data.avatar);
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

    setFamily = async(avatar)=>{
    	let { setFamily, setLoading} = this.props;
        setLoading(true);
        try{            
            let { status, data } = await saveFamily(avatar)
            if(status === 201)
            {	
                setFamily(data.avatar);
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

    setBiography = async(values, actions)=>{
        let { setLoading, setBiography} = this.props;
        setLoading(true);
        try{            
            let { status, data } = await editBiography(values.biography)
            if(status === 201)
            {   
                setBiography(values.biography);
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

    setHobbie = async(values, actions)=>{
        let { setLoading,setHobbie,user} = this.props;
        setLoading(true);
        if([...user.hobbies].includes(values.hobbie.toLowerCase())){
            Toast.show({
                text: 'hobby already exists',
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Ok",
                duration: 3000
            }) 

            return  setLoading(false);
        }
        try{            
            let { status, data } = await saveHobbie(values.hobbie)
            if(status === 201)
            {   
                setHobbie(data.hobbie);
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

    handleDeleteHobbie = async(hobbie)=>{
        let { setLoading,deleteHobbie} = this.props;
        setLoading(true)
        try{            
            let { status, data } = await deletehobbie(hobbie)
            if(status === 201)
            {   
                deleteHobbie(hobbie);
                Toast.show({
                    text: 'Delete successfully',
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

    handleDeletePicture = async(picture)=>{
        let { setLoading,deletePicture} = this.props;
        setLoading(true)
        try{            
            let { status, data } = await deletepicture(picture)
            if(status === 201)
            {   
                deletePicture(picture);
                Toast.show({
                    text: 'Delete successfully',
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

    handleDeleteFamily = async(picture)=>{
        let { setLoading,deleteFamily} = this.props;
        setLoading(true);
        try{            
            let { status, data } = await deletefamily(picture)
            if(status === 201)
            {   
                deleteFamily(picture);
                Toast.show({
                    text: 'Delete successfully',
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

    setDisplayname = async(values, actions)=>{
        let { setLoading, setDisplayName} = this.props;
        setLoading(true);
        try{            
            let { status, data } = await editDisplayName(values.displayName)
            if(status === 201)
            {   
                setDisplayName(values.displayName);
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

    handlePicture = picture => this.props.navigation.push('MyPicture',{picture: picture})

	render(){
		let {
			avatar,
			pictures,
			families,
			biography,
            displayName,
            hobbies
		} = this.props.user;
		return(
			<Container>
				<Head 
					handleNavigation = {this.handleNavigation}
					title = "Profile"
				/>
				<Content>
                    <TouchableOpacity 
                        style = {styles.ctnText}
                        onPress ={this.handleModal('modalDisplayname')}
                    >
                        <H3 style={styles.capitalize}>
                            {displayName}
                        </H3>
                        <Icon 
                            name="md-create" 
                            type='Ionicons'
                            style={styles.icon}
                        />
                    </TouchableOpacity>

					<Avatars 
						avatar = {avatar}
						pictures = {pictures}
						handleModal ={this.handleModal('modalAvatar')}
						handlePicture = {this.handlePicture}
                        handleDelete = {this.handleDeletePicture}
					/>
					<TextBiography 
						biography = {biography}
                        handleModal = {this.handleModal('modalBiography')}
					/>
                    <View style = {styles.ctnText}>
                        <H3>
                            Hobbies
                        </H3>
                    </View>

                    <Hobbies 
                        hobbies = {hobbies}
                        handleModal = {this.handleModal('modalHobbie')}
                        handleDelete = {this.handleDeleteHobbie}
                    />

					<View style = {styles.ctnText}>
						<H3>
							Families
						</H3>
					</View>
					<Families
						pictures = {families}
						handleModal ={this.handleModal('modalFamilies')}
						handlePicture = {this.handlePicture}
                        handleDelete = {this.handleDeleteFamily}
					/>

				</Content>
				<ModalAvatar 
                    image = {avatar}
                    modal = {this.state.modalAvatar}
                    handleModal = {this.handleModal('modalAvatar')}
                    setAvatar = {this.setAvatar}
                />
                {this.state.modalFamilies &&
                <ModalFamily
                    modal = {this.state.modalFamilies}
                    handleModal = {this.handleModal('modalFamilies')}
                    setAvatar = {this.setFamily}
                />
                }

                {this.state.modalBiography &&
                <ModalBiography
                    modal = {this.state.modalBiography}
                    handleModal = {this.handleModal('modalBiography')}
                    biography = {biography}  
                    setBiography = {this.setBiography}
                />
                }

                {this.state.modalHobbie &&
                <ModalHobbie 
                    modal = {this.state.modalHobbie}
                    handleModal = {this.handleModal('modalHobbie')}
                    setHobbie  = {this.setHobbie}
                />
                }

                {this.state.modalDisplayname &&
                <ModalDisplayname
                    modal = {this.state.modalDisplayname}
                    handleModal = {this.handleModal('modalDisplayname')}
                    setDisplayname = {this.setDisplayname}
                    displayName = {displayName}
                />
                }
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	ctnText : {
		marginLeft:10,
		marginTop:10,
        flexDirection:'row'
	},
    capitalize : {
        textTransform : 'capitalize'
    },
    icon : {
        fontSize : 20,
        marginLeft:10
    }
})

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    setAvatar: value => dispatch(setAvatar(value)),
    setFamily: value => dispatch(setFamily(value)),
    setBiography : value =>dispatch(setBiography(value)),
    setHobbie : value =>dispatch(setHobbie(value)),
    deleteHobbie : value =>dispatch(deleteHobbie(value)),
    deletePicture : value =>dispatch(deletePicture(value)),
    deleteFamily : value =>dispatch(deleteFamily(value)),
    setDisplayName : value =>dispatch(setDisplayName(value))
})

export default connect(mapStateToProps,mapDispatchToProps)(MyProfile);