import React, {useState} from 'react'
import {View, TextInput, Text, Modal,  StyleSheet } from 'react-native'
import axios from 'axios'
import Button from './components/Button'

const Registration = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [modalText, setModalText] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const Registration = async () =>{
        if(username===''){
            setModalText("Username is empty")
            setModalVisible(true)
        }else if(password.length<8 || password.length>16){
            setModalText("password must be between 8-16 charachter")
            setModalVisible(true)
        } else if(email===''){
            setModalText("email is empty")
            setModalVisible(true)
        } else if(!email.includes('@') || (!email.endsWith('.com') && !email.endsWith('.hu'))){
            setModalText("Use valid email adress")
            setModalVisible(true)
        }  else {
            const { data } = await axios.post('http://192.168.0.104:3001/api/registration', {
                username,
                password,
                email,
            })
            console.log(data)
            if(data==="Registration completed successfully"){
                setModalText("Registration completed successfully")
                setModal2Visible(true)
            } else {
                setModalText(data)
                setModalVisible(true)
            }
      
          }
    }
    const Close = () =>{
        setModalVisible(false)
    }
    const gotologin =() =>{
        navigation.navigate('Login')
    }
    return(
        <View style={styles.container}>
            <TextInput 
              style={styles.input} 
              autoCapitalize="none"
              placeholderTextColor="white"
              value={username} 
              placeholder="Username"
              onChangeText={username => setUsername(username)} />
            <TextInput 
              style={styles.input} 
              autoCapitalize="none"
              placeholderTextColor="white"
              secureTextEntry={true} 
              value={password}
              placeholder="Password" 
              onChangeText={password => setPassword(password)} />
            <TextInput 
              style={styles.input} 
              autoCapitalize="none"
              placeholderTextColor="white"
              value={email} 
              placeholder="Email"
              onChangeText={email => setEmail(email)} />
            <Button 
              onPress={Registration} 
              title="Registration"/>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalView}>
                <Text>{modalText}</Text>
                <Button onPress={Close} title="OK"/>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modal2Visible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalView}>
                <Text style={styles.Text}>{modalText}</Text>
                <Button onPress={gotologin} title="OK"/>
              </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    modalView: {
      margin: 20,
      backgroundColor: "black",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    container: {
      flex: 1,
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      width: 350,
      height: 55,
      backgroundColor: '#303030',
      margin: 10,
      padding: 8,
      color: "white",
      borderRadius: 14,
      fontSize: 18,
      fontWeight: "500",
    },
    Text:{
      color: 'lightgray'
    },
  })
  
export default Registration