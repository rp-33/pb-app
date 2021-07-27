import React,{Component} from 'react';
import {
	TouchableOpacity,
    View,
	StyleSheet
} from 'react-native'
import {
	Container,
	Content,
	H3,
    Text,
    Icon
} from 'native-base';
import {connect} from 'react-redux';
import Head from './Head';
import Avatars from './Avatars';
import Families from './Families';
import ModalAvatar from './ModalAvatar';
import ModalFamily from './ModalFamily';
import ModalBiography from './ModalBiography';
import ModalHobbie from './ModalHobbie';
import ModalPetname from './ModalPetname';
import TextBiography from './TextBiography';
import Hobbies from './Hobbies';
import {setLoading} from '../../actions/loading';
import {setToast} from '../../actions/toast';
import { 
	setAvatar,
	setFamily,
    setBiography,
    setHobbie,
    deleteHobbie,
    deletePicture,
    deleteFamily,
    setPetName
} from '../../actions/user';
import { 
	editAvatar,
	saveFamily,
    editBiography,
    saveHobbie,
    deletehobbie,
    deletepicture,
    deletefamily,
    editPetName
} from '../../api/user';


class MyProfile extends Component{

	constructor(props){
		super(props);
		this.state = {
			modalAvatar : false,
			modalFamilies : false,
            modalBiography : false,
            modalHobbie : false,
            modalPetname : false
		}
	}

	handleNavigation = ()=>this.props.navigation.push('Configuration');

	handleModal = (modal) => () => {
        this.setState(previosState=>({
            [modal] : !previosState[modal]
        }))
    };

    setAvatar = async(avatar)=>{
    	let {setAvatar,setLoading,setToast} = this.props;
        setLoading(true);
        try{            
            let { status, data } = await editAvatar(avatar)
            if(status === 201)
            {	
                setAvatar(data.avatar);
                setToast({title:'saved successfully',visible:true});
            }
            else
            {      
                setToast({title:data.error,visible:true});                
            }
        }
        catch(err)
        {   
             setToast({title:'Error',visible:true,type:'Error'});  
        }
        finally
        {
            setLoading(false);
        }
    }

    setFamily = async(avatar)=>{
    	let { setFamily, setLoading,setToast} = this.props;
        setLoading(true);
        try{            
            let { status, data } = await saveFamily(avatar)
            if(status === 201)
            {	
                setFamily(data.avatar);
                setToast({title:'saved successfully',visible:true});                              
            }
            else
            {    
                setToast({title:data.error,visible:true});                
            }
        }
        catch(err)
        {
             setToast({title:'Error',visible:true,type:'Error'});
        }
        finally
        {
            setLoading(false);
        }
    }

    setBiography = async(values, actions)=>{
        let { setLoading, setBiography,setToast} = this.props;
        setLoading(true);
        try{            
            let { status, data } = await editBiography(values.biography)
            if(status === 201)
            {   
                setBiography(values.biography);
                setToast({title:'saved successfully',visible:true});      
            }
            else
            {             
                setToast({title:data.error,visible:true});                  
            }
        }
        catch(err)
        {
            setToast({title:'Error',visible:true,type:'Error'});   
        }
        finally
        {
            setLoading(false);
        }
    }

    setHobbie = async(values, actions)=>{
        let { setLoading,setHobbie,user,setToast} = this.props;
        setLoading(true);
        if([...user.hobbies].includes(values.hobbie.toLowerCase())){
            setToast({title:'hobby already exists',visible:true});   
            return  setLoading(false);
        }
        try{            
            let { status, data } = await saveHobbie(values.hobbie)
            if(status === 201)
            {   

                setHobbie(data.hobbie);
                setToast({title:'saved successfully',visible:true});
            }
            else
            {            
                setToast({title:data.error,visible:true});                
            }
        }
        catch(err)
        {
            setToast({title:'Error',visible:true,type:'error'});  
        }
        finally
        {
            setLoading(false);
        }
    }

    handleDeleteHobbie = async(hobbie)=>{
        let { setLoading,deleteHobbie,setToast} = this.props;
        setLoading(true)
        try{            
            let { status, data } = await deletehobbie(hobbie)
            if(status === 201)
            {   
                deleteHobbie(hobbie);
                setToast({title:'Delete successfully',visible:true});  
               
            }
            else
            {             
                setToast({title:data.error,visible:true});                
            }
        }
        catch(err)
        {
            setToast({title:'Error',visible:true,type:'error'});  
        }
        finally
        {
            setLoading(false);
        }

    }

    handleDeletePicture = async(picture)=>{
        let { setLoading,deletePicture,setToast} = this.props;
        setLoading(true)
        try{            
            let { status, data } = await deletepicture(picture)
            if(status === 201)
            {   
                deletePicture(picture);
                setToast({title:'Delete successfully',visible:true});  
            }
            else
            {             
                setToast({title:data.error,visible:true});                 
            }
        }
        catch(err)
        {
            setToast({title:'Error',visible:true,type:'Error'});  
        }
        finally
        {
            setLoading(false);
        }
    }

    handleDeleteFamily = async(picture)=>{
        let { setLoading,deleteFamily,setToast} = this.props;
        setLoading(true);
        try{            
            let { status, data } = await deletefamily(picture)
            if(status === 201)
            {   
                deleteFamily(picture);
                setToast({title:'Delete successfully',visible:true}); 
            }
            else
            {             
                setToast({title:data.error,visible:true});                
            }
        }
        catch(err)
        {
            setToast({title:'Error',visible:true,type:'error'});  
        }
        finally
        {
            setLoading(false);
        }
    }

    setPetname = async(values, actions)=>{
        let { setLoading, setPetName,setToast} = this.props;
        setLoading(true);
        try{            
            let { status, data } = await editPetName(values.petName)
            if(status === 201)
            { 
                setPetName(values.petName);
                setToast({title:'Saved successfully',visible:true}); 
            }
            else
            {     
                setToast({title:data.error,visible:true});                
            }
        }
        catch(err)
        {
            setToast({title:'Error',visible:true,type:'error'});
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
            petName,
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
                        onPress ={this.handleModal('modalPetname')}
                    >
                        <H3 style={styles.capitalize}>
                            {petName}
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

                {this.state.modalPetname &&
                <ModalPetname
                    modal = {this.state.modalPetname}
                    handleModal = {this.handleModal('modalPetname')}
                    setPetname = {this.setPetname}
                    petName = {petName}
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
    setPetName : value =>dispatch(setPetName(value)),
    setToast : value => dispatch(setToast(value))
})

export default connect(mapStateToProps,mapDispatchToProps)(MyProfile);