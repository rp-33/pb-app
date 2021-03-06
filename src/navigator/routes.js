import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import userDb from '../database/user';
import businessDb from '../database/business';
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
import SearchProduct from '../views/SearchProduct';
import DetailsProduct from '../views/DetailsProduct';
import Rol from '../views/Rol';
import SignupBusiness from '../views/SignupBusiness';
import MyProfileBusiness from '../views/MyProfileBusiness';
import SalesBusiness from '../views/SalesBusiness';
import MyProductsBusiness from '../views/MyProductsBusiness';
import CreateProduct from '../views/CreateProduct'
import { Icon } from 'native-base';

let dbUser = new userDb();
let dbBusiness = new businessDb();

const nameIconUser = {
  Search:  'ios-compass',
  MyProfile: 'contact',
  Marketplace : 'cart'
}

const nameIconBusiness = {
  MyProductsBusiness:  'basket',
  SalesBusiness: 'cart',
  MyProfileBusiness : 'contact'
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
  },
  SearchProduct : {
    screen : SearchProduct,
    navigationOptions : {headerShown :false}
  },
  DetailsProduct : {
    screen : DetailsProduct,
    navigationOptions : {headerShown :false}
  }
},
{
  initialRouteName : 'Marketplace'
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
    Search:{
      screen: SearchNavigator
    },
    Marketplace : {
      screen : MarketplaceNavigator
    },
    MyProfile:{
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
                name={nameIconUser[routeName]} 
            />
        )
      }
    },
    labeled :false,
    initialRouteName:'Search',
    backBehavior:'initialRoute',
    barStyle: { backgroundColor: '#fff' },
    activeColor:'#ff6969',
    inactiveColor:'#c7c7c7'
})

const ProductBusinessNavigator = createStackNavigator({
  MyProductsBusiness : {
    screen: MyProductsBusiness,
    navigationOptions: {headerShown: false}
  },
  CreateProduct : {
    screen: CreateProduct,
    navigationOptions: {headerShown: false}
  }
},
{
  initialRouteName: 'MyProductsBusiness'
})

ProductBusinessNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) tabBarVisible = false;
  return { tabBarVisible };
};


const DashboardBusinessNavigator = createMaterialBottomTabNavigator({
    MyProductsBusiness:{
      screen: ProductBusinessNavigator
    },
    SalesBusiness : {
      screen : SalesBusiness
    },
    MyProfileBusiness:{
      screen: MyProfileBusiness
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
                name={nameIconBusiness[routeName]} 
            />
        )
      }
    },
    labeled :false,
    initialRouteName:'MyProductsBusiness',
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
  Rol :{   
    screen : Rol,
    navigationOptions: {headerShown: false} 
  },
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
  },
  SignupBusiness :{
    screen : SignupBusiness,
    navigationOptions: {headerShown: false}  
  }
},
{
  initialRouteName: 'Rol' 
})

const LoginNavigator = createStackNavigator({
  Rol :{   
    screen : Rol,
    navigationOptions: {headerShown: false} 
  },
  Login: {
    screen: Login,
    navigationOptions: {headerShown: false}
  }
},
{
  initialRouteName: 'Rol' 
})

const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {headerShown: false}
  },
  Login: {
    screen: LoginNavigator,
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
  },
  DashboardBusiness : {
    screen: DashboardBusinessNavigator,
    navigationOptions: {header: null }
  }
},
{
  initialRouteName: (dbUser.get().isAuthenticated || dbBusiness.get().isAuthenticated) ? (dbUser.get().isAuthenticated ? 'Dashboard' : 'DashboardBusiness') : 'Home'
})

export { RootNavigator };
