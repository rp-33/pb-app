import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
  BackHandler
} from 'react-native';
import { NavigationActions} from "react-navigation";
import {AppNavigator} from './navigator/';

class App extends Component{

  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    const { nav } = this.props;
      if (nav.index === 0) {
          return false;
      }
      this.props.handleNavigation();
    return true;
  }
    
    render(){
    return (
      <AppNavigator />
    )
  }
}

const mapStateToProps = state => ({
  nav: state.navState
});

const mapDispatchToProps = dispatch =>{
  return{
    handleNavigation(){
      dispatch(NavigationActions.back());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
