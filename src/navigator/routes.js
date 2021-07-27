import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import userDb from '../database/user';
import Home from '../views/Home/';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import SignupAvatar from '../views/SignupAvatar';
import SignupLocation from '../views/SignupLocation';
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
import StepEmail from '../views/recoverPassword/StepEmail';
import StepCode from '../views/recoverPassword/StepCode';
import StepPassword from '../views/recoverPassword/StepPassword';
import StepPasswordSuccess from '../views/recoverPassword/StepSuccess';
import EditPet from '../views/EditPet';
import Marketplace from '../views/Marketplace';
import { Icon } from 'native-base';

let db = new userDb();

const nameIcon = {
  search:  'ios-compass',
  myProfile: 'contact',
  marketplace : 'cart'
}

const MessagesNavigator = createStackNavigator({
  Messages: {
    screen: Messages,
    navigationOptions: {headerShown: false}
  },
  Chat:{
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
  },
  ChatPicture :{
    screen: Picture,
    navigationOptions: {headerShown: false} 
  },
},
{
  initialRouteName: 'Messages'
})


const SearchNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {headerShown: false}
  },
  Match: {
    screen: Match,
    navigationOptions: {headerShown: false}
  },
  Profile:{
    screen: Profile,
    navigationOptions: {headerShown: false} 
  },
  Picture:{
    screen: Picture,
    navigationOptions: {headerShown: false} 
  },
  Messages : {
    screen: MessagesNavigator,
    navigationOptions: {headerShown: false}
  }
},
{
  initialRouteName: 'Search'
});

SearchNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) tabBarVisible = false;
  return { tabBarVisible };
};


MessagesNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) tabBarVisible = false;
  return { tabBarVisible };
};


const MarketplaceNavigator = createStackNavigator({
  Marketplace : {
    screen : Marketplace,
    navigationOptions : {headerShown: false}
  }
})

const MyProfileNavigator = createStackNavigator({
  MyProfile : {
    screen: MyProfile,
    navigationOptions: {headerShown: false}
  },
  Configuration : {
    screen: Configuration,
    navigationOptions: {headerShown: false}
  },
  EditPassword:{
    screen: EditPassword,
    navigationOptions: {headerShown: false} 
  },
  MyPicture:{
    screen: Picture,
    navigationOptions: {headerShown: false} 
  },
  EditPet : {
    screen: EditPet,
    navigationOptions: {headerShown: false} 
  }
},
{
  initialRouteName: 'MyProfile'
})

MyProfileNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) tabBarVisible = false;
  return { tabBarVisible };
};


const DashboardNavigator = createMaterialBottomTabNavigator({
    search:{
      screen: SearchNavigator
    },
    marketplace : {
      screen : MarketplaceNavigator
    },
    myProfile:{
      screen: MyProfileNavigator
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

const PasswordNavigator = createStackNavigator({
  RecoverPassword : {
    screen: StepEmail,
    navigationOptions: {headerShown: false}
  },
  StepCode : {
    screen: StepCode,
    navigationOptions: {headerShown: false}
  },
  StepPassword : {
    screen: StepPassword,
    navigationOptions: {headerShown: false}
  },
  StepPasswordSuccess : {
    screen: StepPasswordSuccess,
    navigationOptions: {headerShown: false}
  }
},
{
  initialRouteName: 'RecoverPassword'
})

const SignupNavigator = createStackNavigator({
  Signup: {
    screen: SignUp,
    navigationOptions: {headerShown: false}
  },
  SignupAvatar : {
    screen: SignupAvatar,
    navigationOptions: {headerShown: false}   
  },
  SignupLocation :{
    screen : SignupLocation,
    navigationOptions: {headerShown: false}  
  }
},
{
  initialRouteName: 'Signup' 
})

const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {headerShown: false}
  },
  Login: {
    screen: Login,
    navigationOptions: {headerShown: false}
  },
  Signup: {
    screen: SignupNavigator,
    navigationOptions: {headerShown: false}
  },
  RecoverPassword : {
    screen: PasswordNavigator,
    navigationOptions: {headerShown: false}
  }
},{
  initialRouteName: 'Home'
})


const RootNavigator = createSwitchNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {header: null}
  },
  Dashboard : {
    screen: DashboardNavigator,
    navigationOptions: {header: null }
  }
},
{
  initialRouteName: db.get().isAuthenticated ? 'Dashboard' : 'Home'
})

export { RootNavigator };
