import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity 
} from 'react-native';
import { 
  Container,
  H1 ,
  Button
} from 'native-base';
import LottieView from 'lottie-react-native';

class StepSuccess extends Component{

  handleLogin = ()=>this.props.navigation.navigate('Login');

  render(){
    return(
      <Container>
          <View style={styles.center}>
            <LottieView 
              style={{width: 150,alignSelf: 'center'}} 
              source={require('../../assets/animations/success.json')} 
              autoPlay 
              loop = {false}
            />
            <H1 allowFontScalling style={styles.centerText}>Recovered password!!</H1>
            <Text allowFontScalling style={styles.centerText}>can go to login</Text>
            <Button 
              onPress={this.handleLogin} 
              full 
              rounded
            >
              <Text>LOGIN</Text>
            </Button>
          </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  ctn:{
    backgroundColor:'white',
	},
  center:{
		marginHorizontal:10,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
	},
  centerText:{
    textAlign: 'center',
    marginVertical:15
  }
});

export default StepSuccess;