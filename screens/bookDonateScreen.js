import React ,{Component} from 'react'
import {View , Text,TextInput,KeyboardAvoidingView,StyleSheet,TouchableOpacity,Alert} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
import {ListItem} from 'react-native-elements'

export default class bookDonateScreen extends Component{
constructor(){
super()
this.state={
requestedBooksList: [],
}
this.request+=null;
}


getRequestedBooksList=()=>{
this.requestRef = ("requested_books").onSnapShot((snapshot)=>{
var requestedBooksList=snapshot.docs.map(document=>document.data())
this.setState({
requestedBooksList: requestedBooksList,
})
})
}


componentDidMount(){
this.getRequestedBooksList()
}

componentWillUnMount(){
this.requestRef();
}

keyExtractor=(item,index)=>index.toString()
renderItem=({item,i})=>{
return(
<ListItem
key={i}
title={item.book_name}
subTitle={item.reason_to_request}
titleStyle={{fontWeight:'bold',color:'black'}}
rightElement={
<TouchableOpacity style={style.button}>
<Text style={{color:'#4ffff'}}>View</Text>
</TouchableOpacity>
}
bottomDivider
/>
)
}

render(){
return(
<View style={{flex: 1}}>
<MyHeader title="DONATE BOOKS"/>
<View style={{flex:1}}>
{this.state.requestedBooksList.length===0?(
<View style={styles.subContainer}>
    <Text style={{fontSize: 20}}>LIST OF ALL REQUESTED BOOKS</Text>
</View>
):(<FlatList
keyExtractor={this.keyExtractor}
data={this.state.requestedBooksList}
renderItem={this.state.renderItem}
/>)
}
</View>
</View>
)
}
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
}