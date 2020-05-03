import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import {findUserDb} from '../services/realm'
import Home from '../views/Home/';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import SignupAvatar from '../views/SignupAvatar';
import Search from '../views/Search';
import Match from '../views/Match';
import Messages from '../views/Messages';
import MyProfile from '../views/MyProfile';
import Picture from '../views/Picture';
import Configuration from '../views/Configuration';
import EditPassword from '../views/EditPassword';
import Profile from '../views/Profile';
import Chat from '../views/Chat';
import ChatLocation from '../views/ChatLocation';
import ChatImage from '../views/ChatImage';
import { Icon } from 'native-base';


const nameIcon = {
  search:  'ios-compass',
  match : 'md-heart',
  messages : 'ios-chatbubbles',
  myProfile: 'contact',
}


const Dashboard = createMaterialBottomTabNavigator({
    search:{
      screen:Search
    },
    match:{
      screen:Match
    },
    messages:{
      screen:Messages
    },
    myProfile:{
      screen:MyProfile
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      return {
        tabBarIcon : ({tintColor})=>(
            <Icon 
                style={{color: tintColor, fontSize: 27}} 
                type="Ionicons" 
                name={nameIcon[routeName]} 
            />
        )
      }
    },
    labeled :false,
    initialRouteName:'search',
    backBehavior:'initialRoute',
    barStyle: { backgroundColor: '#fff' },
    activeColor:'#ff6969',
    inactiveColor:'#c7c7c7'
  })


const RootNavigator = createStackNavigator({
    Home : {
      screen: Home,
      navigationOptions: {headerShown: false}
    },
    Login : {
      screen: Login,
      navigationOptions: {headerShown: false}
    },
    SignUp : {
      screen: SignUp,
      navigationOptions: {headerShown: false}
    },
    SignupAvatar : {
      screen: SignupAvatar,
      navigationOptions: {headerShown: false}   
    },
    Dashboard:{
      screen: Dashboard,
      navigationOptions: {headerShown: false} 
    },
    Picture:{
      screen: Picture,
      navigationOptions: {headerShown: false} 
    },
    Configuration:{
      screen: Configuration,
      navigationOptions: {headerShown: false} 
    },
    EditPassword:{
      screen: EditPassword,
      navigationOptions: {headerShown: false} 
    },
    Profile:{
      screen: Profile,
      navigationOptions: {headerShown: false} 
    },
    Chat :{
      screen: Chat,
      navigationOptions: {headerShown: false} 
    },
    ChatLocation :{
      screen: ChatLocation,
      navigationOptions: {headerShown: false} 
    },
    ChatImage :{
      screen: ChatImage,
      navigationOptions: {headerShown: false} 
    }
},
{
    initialRouteName: findUserDb().isAuthenticated ? 'Dashboard' : 'Home'
})

export { RootNavigator };