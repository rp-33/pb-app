import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Snackbar } from 'react-native-paper';
import {setToast} from '../actions/toast';

class Toast extends Component{

	_handleDismiss = ()=>{
		this.props.setToast({title:'',visible:false});
	}


	render(){
		let {visible,title,type} = this.props;
		return(
			<Snackbar
        		visible={visible}
        		onDismiss={this._handleDismiss}  
        		duration = {3000}
        		style = {{backgroundColor : (type == 'error') ? 'red' : 'black' }}
        	>   
        		{title}
      		</Snackbar>
		)
	}
}


const mapStateToProps = state => ({
    toast : state.toast
})

const mapDispatchToProps = dispatch => ({
    setToast: value => dispatch(setToast(value))
})

export default connect(mapStateToProps,mapDispatchToProps)(Toast);