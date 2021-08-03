import React,{Component} from 'react';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import Head from '../../presentations/HeadLogout';
import {setLogout} from '../../actions/business';
import {setToast} from '../../actions/toast';
import {setLoading} from '../../actions/loading';
import {logout} from '../../api/business';

class MyProfileBusiness extends Component{
	constructor(props){
		super(props);
	} 


	handleLogout = async()=>{
		let {setLogout,setLoading,setToast,navigation} = this.props;	
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


	render(){
		return(
			<Container>
				<Head 
					handleLogout = {this.handleLogout}
				/>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
    business: state.business
})

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    setLogout : ()=>dispatch(setLogout()),
    setToast : value => dispatch(setToast(value))
})

export default connect(mapStateToProps,mapDispatchToProps)(MyProfileBusiness);