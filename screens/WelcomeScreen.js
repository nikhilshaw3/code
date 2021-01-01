import React ,{Component} from 'react'
import {View,Text, TextInput, TouchableOpacity, Alert,Modal,ScrollView , keyboardAvoidingView,StyleSheet} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import bookAnimation from '../components/book'

export default class WelcomeScreen extends Component{
constructor(){
    super()
    this.state={
        emailId: '' , 
        password: '',
        isModalVisible:'false',
        firstName: '',
        lastName: '',
        address: '',
        contact: '',
        confirmPassword: ''
    }
}

userSignUp=(email,password,confirmPassword)=>{
if(password!==confirmPassword){
return Alert.alert("PASSWORD DOES'NOT MATCH/CHECK YOUR PASSWORD")
}else{
firebase.auth().createUserWithEmailAndPassword(emailId,password)
.then(()=>{
db.collection('users').add({
first_name : this.state.firstName,
last_name : this.state.lastName,
contact : this.state.contact,
email_id : this.state.emailId,
address : this.state.address,
})
return Alert.alert("USER ADDED SUCCESSFULLY",
'',
[{text: 'OK' , onPress: ()=>this.setState({"isModalVisible": false})}]
)
})
.catch((error)=>{
var errorCode = error.code
var errorMessage = error.message
return Alert.alert (errorMessage)
})
}
}

showModal = ()=>{
return(
    <Modal animationType="fade" transparent={true} visible = {this.state.isModalVisible}>

    <View style={styles.modalContainer} >

    <ScrollView><keyboardAvoidingView>
        <Text style={styles.modalTitle}>REGISTRATION</Text>
        <TextInput
        style={styles.formTextInput}
        placeholder={"first name"}
        maxLength={8}
        onChangeText={(text)=>{
            this.setState({
                firstName: text

            })
        }}
        />
        <TextInput
        style={styles.formTextInput}
        placeholder={"Last name"}
        maxLength={8}
        onChangeText={(text)=>{
            this.setState({
                lastName: text
                
            })
        }}
        />
        <TextInput
        style={styles.formTextInput}
        placeholder={"Contact"}
        keyboardType={'numeric'}
        maxLength={10}
        onChangeText={(text)=>{
            this.setState({
                contact: text
                
            })
        }}
        />
        <TextInput
        style={styles.formTextInput}
        placeholder={"Address"}
        maxLength={8}
        onChangeText={(text)=>{
            this.setState({
                address: text
                
            })
        }}
        />
        <TextInput
        style={styles.formTextInput}
        placeholder={"Email Id"}
keyboardType={'email-address'}
multiline={true}
        onChangeText={(text)=>{
            this.setState({
                emailId: text
                
            })
        }}
 />
        <TextInput
        style={styles.formTextInput}
        placeholder={"Password"}
        secureTextEntry={true}
        onChangeText={(text)=>{
            this.setState({
                password: text
                
            })
        }}
        />
        <TextInput
        style={styles.formTextInput}
        placeholder={"Confirm password"}
       secureTextEntry={true}
        onChangeText={(text)=>{
            this.setState({
               confirmPassword: text
                
            })
        }}
        />
        <View style={styles.modalBackButton}>
<TouchableOpacity style={styles.registerButton} 
onPress={()=>this.userSignUp(this.state.emailId,this.state.password)}
>

    <Text style={styles.registerButtonText}>REGISTER</Text>
        </TouchableOpacity>
                </View>
                <View style={styles.modalBackButton}>
                    <TouchableOpacity style={styles.cancelButton}
                    onPress={()=>this.setState({"isModalVisible": false})}
                    >
                        <Text style={{color: '#ff5722'}}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
        </keyboardAvoidingView></ScrollView>
    </View>
    </Modal>
)
}

userLogin=(emailId,password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId,password)
    .then(()=>{
        this.props.navigation.navigate('Donate')
    })
    .catch(function(error){
        var errorCode = error.code
        var errorMessage = error.message
        return Alert.alert("errorMessage")
        })
}

render(){
    return(
<View style={styles.container}>
<View style={{justifyContent: 'center' , alignItems: 'center'}}>
{this.showModal()}
</View>

<View>
<Text style={styles.title}>BOOK SANTA</Text>
</View>
<View>
    <TextInput
    style={styles.loginBox}
 placeholder = "abc@example.com"
 keyboardType ="email-address"
 onChangeText = {(text)=>{
     this.setState({
         emailId:text
     })
 }}
    />
    <TextInput
    style={styles.loginBox}
    secureTextEntry={true}
    placeholder = "Enter Password"
   onChangeText={(text)=>{
    this.setState({
        password:text
    })
}}
   />

<TouchableOpacity style={[styles.button,{marginBottom: 20 , marginTop: 20}]}
onPress={()=>{
    this.userLogin(this.state.emailId, this.state.password)
}}
>

<Text style={styles.buttonText}>LOGIN</Text>
</TouchableOpacity>

<TouchableOpacity style={style.button}
onPress={()=>{
    this.userSignUp(this.state.emailId, this.state.password)
}}
>

<Text style={styles.buttonText}>SIGN UP</Text>
</TouchableOpacity>


</View>

</View>
    )
}
}

const styles = StyleSheet.create({ container:{ flex:1, backgroundColor:'#F8BE85' }, profileContainer:{ flex:1, justifyContent:'center', alignItems:'center', }, title :{ fontSize:65, fontWeight:'300', paddingBottom:30, color : '#ff3d00' }, loginBox:{ width: 300, height: 40, borderBottomWidth: 1.5, borderColor : '#ff8a65', fontSize: 20, margin:10, paddingLeft:10 }, button:{ width:300, height:50, justifyContent:'center', alignItems:'center', borderRadius:25, backgroundColor:"#ff9800", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.30, shadowRadius: 10.32, elevation: 16, }, buttonText:{ color:'#ffff', fontWeight:'200', fontSize:20 }, buttonContainer:{ flex:1, alignItems:'center' } })