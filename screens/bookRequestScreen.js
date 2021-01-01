import React ,{Component} from 'react'
import {View , Text,TextInput,KeyboardAvoidingView,StyleSheet,TouchableOpacity,Alert} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'

export default class bookRequestScreen extends Component{
constructor(){
super()
this.state={
userId: firebase.auth().currentUser.email,
bookName: "",
reasonToRequest: '',
}
}

createUniqueId(){
return Math.random().toString(36).subString(7)
}

addRequest=(bookName,reasonToRequest)=>{
var userId = this.state.userId
var randomRequestId = this.createUniqueId();
db.collection("requested_books").add({
"user_id": userId,
"book_name": bookName,
"reason_to_request": reasonToRequest,
"request_id": randomRequestId,
})
this.setState({
bookName: '' , reasonToRequest: ''
})
return Alert.alert("BOOK REQUESTED SUCCESSFULLY")
}

render(){
return(
<View style ={{flex:1}}>
<MyHeader title="REQUEST BOOK"/>
<KeyboardAvoidingView>
<TextInput 
style={styles.formTextInput}
placeholder={"ENTER BOOK NAME"}
onChangeText={(text)=>{
this.setState({
bookName: text
})
}}
/>
<TextInput
style={styles.formTextInput}
placeholder={"WHY DO YOU NEED THE BOOK"}
onChangeText={(text)=>{
this.setState({
reasonToRequest: text
})
}}
/>
<TouchableOpacity style={styles.button} 
onPress={()=>{
this.addRequest(this.state.bookName,this.state.reasonToRequest)
}}

>
<Text>REQUEST</Text>
</TouchableOpacity>

</KeyboardAvoidingView>
</View>
)
}
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {width: 0,
        height: 8,
     },
     shadowOpacity: 0.44,
     shadowRadius: 10.32,
     elevation: 16,
     marginTop:20
     },
   }
 )