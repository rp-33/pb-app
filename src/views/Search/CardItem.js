import React,{Component} from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	Image,
	Text,
	TouchableOpacity,
	Animated
} from 'react-native';
import {
	Icon,
	H3
} from 'native-base';
import themeColor from '../../theme/color';
import BarPictures from './BarPictures';
import Hobbies from './Hobbies';

let {width,height} = Dimensions.get('window'),
	SCREEN_WIDTH  = (width - 20) /2;

	console.log(SCREEN_WIDTH)

class CardItem extends Component{
	constructor(props){
		super(props)
		this.state = {
			inf : false,
			pictures : [props.item.avatar,...props.item.pictures],
			position : 0
		};
		this.animationImg = new Animated.Value(1);
		this.animationInf = new Animated.Value(0);
	}

	showInf = ()=>{
		this.setState(prevState=>{
			return {
				inf : true
			}
		},()=>{
			Animated.timing(this.animationInf, {
      			toValue : 0,
      			timing : 400
    		}).start(()=>{
      			Animated.timing(this.animationInf,{
        			toValue : 1,
        			duration : 500
      			}).start();      			
    		});
    		this.animationImg.setValue(0)//reseteo la animacion a 0
		})
	}

	showImages = ()=>{
		this.setState(prevState=>{
			return {
				inf : false
			}
		},()=>{
			Animated.timing(this.animationImg, {
      			toValue : 0,
      			timing : 400
    		}).start(()=>{
      			Animated.timing(this.animationImg,{
        			toValue : 1,
        			duration : 500
      			}).start();
    		});
    		this.animationInf.setValue(0)//reseteo la animacion a 0
		})
	}

	handlePicture = (event)=>{
		if(event.nativeEvent.locationX>SCREEN_WIDTH + 20)
		{
			let lengthPictures = this.state.pictures.length - 1;
			this.setState(prevState=>{
				return{
					position : (prevState.position === lengthPictures) ? prevState.position : prevState.position + 1
				}
			})
		}
		else if(event.nativeEvent.locationX<SCREEN_WIDTH - 20)
		{
			this.setState(prevState=>{
				return{
					position : (prevState.position === 0) ? prevState.position : prevState.position - 1
				}
			})
		}
		
	}

	render(){
		let {
			item,
			handleLike,
			handleSuperLike
		} = this.props;
		return(
		<View style={styles.container}>
			<View style={styles.ctnAnimated}>
				<Animated.View style={[styles.ctnInf, {opacity : this.animationInf}]}>	
					<View style={{marginVertical:10}}>		
						<View style={styles.ctnDetail}>
							<H3>Pet's name</H3>
							<Icon 
							name="ios-paw" 
							type='Ionicons'
							style = {{fontSize:16,color:themeColor.primary,marginLeft:10}}
							/>
						</View>
						<Text style={{textTransform:'capitalize',fontSize:20,color:themeColor.secondary}}>{item.displayName}</Text>
					</View>
					<View>		
						<View style={styles.ctnDetail}>
							<H3>Biography</H3>
							<Icon 
							name="md-create" 
							type='Ionicons'
							style = {{fontSize:20,color:themeColor.primary,marginLeft:10}}
							/>
						</View>
						{item.biography 
						?
							<Text style={{textTransform:'capitalize',fontSize:16,color:themeColor.secondary}}>
								{item.biography}
							</Text>
						:
							<Text style={{fontSize:16,color:themeColor.secondary}}>
								His biography is empty
							</Text>
						}
					</View>	
					<View style={{marginVertical:10}}>		
						<View style={styles.ctnDetail}>
							<H3>Hobbies</H3>
							<Icon 
							name="ios-rocket" 
							type='Ionicons'
							style = {{fontSize:16,color:themeColor.primary,marginLeft:10}}
							/>
						</View>
						<Hobbies 
							hobbies = {item.hobbies}
						/>
						
					</View>	
				</Animated.View>
				<Animated.View style={[styles.ctnAvatar, {opacity : this.animationImg}]}>			
					<BarPictures 
						pictures = {this.state.pictures}
						position = {this.state.position}
					/>
					<TouchableOpacity
						activeOpacity = {1}
						onPress = {(this.state.pictures.length!=1 && !this.state.inf) ? this.handlePicture : null}
					>
						<Image 
							source = {{uri : this.state.pictures[this.state.position]}}
							style = {styles.avatar}
						/>
					</TouchableOpacity>
					<View style={styles.badge}>
						<Text style={styles.badgeText}>25 km near you</Text>
					</View>
				</Animated.View>
			</View>
			<View style={styles.ctnBtn}>
				<TouchableOpacity 
					onPress = {!this.state.inf ? this.showInf : this.showImages}	
					style={[styles.btnBig,styles.btn]}
				>
					<Icon 
						name={this.state.inf ? "md-photos" : "ios-information"}
						type='Ionicons'
						style = {{fontSize:40,color:'#F5A623'}}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.btnSmall,styles.btn]}>
					<Icon 
						name="md-close" 
						type='Ionicons'
						style = {{fontSize:18}}
					/>
				</TouchableOpacity>
				<TouchableOpacity 
					onPress  = {()=>handleLike(item._id)}
					style={[styles.btnSmall,styles.btn]}
				>
					<Icon 
						name="ios-heart" 
						type='Ionicons'
						style = {{fontSize:18,color:'#D0021B'}}
					/>
				</TouchableOpacity>
				<TouchableOpacity 
					onPress  = {()=>handleSuperLike(item._id)}
					style={[styles.btnBig,styles.btn]}
				>
					<Icon 
						name="ios-flash" 
						type='Ionicons'
						style = {{fontSize:30,color:'#9013FE'}}
					/>
				</TouchableOpacity>
			</View>
		</View>
		)
	}
	
}

const styles = StyleSheet.create({
	container: {
		backgroundColor:'white',
		borderRadius: 8,
		alignItems: "center",
		marginTop:10,
		width: width - 20,
		height : height - 185,
		marginLeft:10,
		borderWidth:1,
		borderColor:'#c7c7c7',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.25,
		shadowRadius: 0.84,
		elevation: 2,
		padding:10,
		position:'relative'
	},
	ctnAnimated : {
		borderRadius: 8,
		width: '100%',
		height : height - 295,
	},
	ctnAvatar: {
		width: '100%',
		height : height - 295,
		position:'absolute',
		left:0
	},
	ctnInf:{
		width: '100%',
		height : height - 295,
		position:'absolute'
	},
	avatar:{
		width: '100%',
		height : '100%',
		borderRadius: 8,
	},
	badge:{
		paddingLeft:20,
		paddingRight:20,
		paddingTop:6,
		paddingBottom:6,
		borderRadius:25,
		backgroundColor: themeColor.primary,
		justifyContent:'center',
		alignItems:'center',
		position:'absolute',
		top:15,
		left:10
	
	},
	badgeText:{
		color:'white',
		fontWeight:'bold'
	},
	ctnBtn:{
		flexDirection:'row',
		marginTop:15
	},
	btn:{
		borderColor:'black',
		shadowColor: "#000",
		shadowOffset: {
			width: 1,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 1.84,
		elevation: 7,
		backgroundColor:'white',
		margin:5,
		justifyContent:'center',
		alignItems:'center'
	},
	btnBig:{
		width:60,
		height:60,
		borderRadius:30,
	},
	btnSmall:{
		width:45,
		height:45,
		borderRadius:22.5,
		marginTop:-5
	},
	ctnDetail :{
		flexDirection:'row'
	}
});

export default CardItem;