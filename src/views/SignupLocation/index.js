import React,{Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import {
	Container,
	Toast,
    Button,
    Text
} from 'native-base';
import {connect} from 'react-redux';
import MapLocation from '../../presentations/MapLocation';
import Head from '../../presentations/HeadBack';
import {permissionsLocation} from '../../services/permissions';
import {geolocation} from '../../services/geolocation';
import {signup} from '../../api/user';
import { setAuth } from '../../actions/user';
import { setLoading } from '../../actions/loading';
import {setToast} from '../../actions/toast';


class SignupLocation extends Component{
	constructor(props){
		super(props);
		this.state = {
			location :{
				longitude : null,
                latitude : null
			},
			errorLocation : false,
			findLocation : false
		}
	}

	componentDidMount(){
      this.getPosition();
    }

    async getPosition(){
        const granted = await permissionsLocation('location');

        if(granted == 'authorized' || granted == 'granted'){
        	let coords = await geolocation();
            let {setToast} = this.props
        	if(coords.latitude && coords.longitude)
        	{
        		this.setState({
        			location :{
        				longitude : coords.longitude,
        				latitude: coords.latitude
        			}
        		})
        	}
          	else
          	{
                setToast({title:'must give the location permissions',visible:true,type:'error'}); 
          	}
         
        }
        else if(granted == 'denied')
        {
            setToast({title:'must give the location permissions',visible:true,type:'error'}); 
        }
    }

    handleSignup = async ()=>{
        let { setAuth, setLoading,navigation,setToast} = this.props;
        setLoading(true);
        try
        {
            let {petName,displayName,email,sex,password,pet,avatar,age} = navigation.state.params;
            let {longitude,latitude} = this.state.location
            let {status,data} = await signup(petName,displayName,email,sex,age,password,avatar,pet,longitude,latitude);
            if(status === 201)
            {
                setAuth(data);
                navigation.navigate('Dashboard');
            }
            else
            {
                setToast({title:data.error || 'Path not found',visible:true,type:'error'});  
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

    handleBack = ()=>this.props.navigation.goBack();

	render(){
		return(
			<Container>
				<Head 
					title = "My location"
					handleBack = {this.handleBack}
				/>
				{
					this.state.location.latitude &&
					<View style={styles.ctnMap}>
						<MapLocation 
							location = {this.state.location}
						/>
                        <View style = {styles.ctnBtn}>
						  <Button 
                            onPress={this.handleSignup} 
                            full 
                            rounded
                            >
                                <Text>Save</Text>
                            </Button>
                        </View>
           			</View>
				}
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	ctnMap : {
		backgroundColor : 'white',
		flex:1
	},
    ctnBtn:{
        position:'absolute',
        bottom:5,
        paddingHorizontal:10,
        width:'100%'
    }
})

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    setAuth: value => dispatch(setAuth(value)),
    setToast : value => dispatch(setToast(value))
});

export default connect(null, mapDispatchToProps)(SignupLocation);