import React, {useState} from 'react'
import {View, TextInput, Text, Button, Modal,  StyleSheet } from 'react-native'
import axios from 'axios'

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
            const { data } = await axios.post('http://192.168.0.102:3001/api/registration', {
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
        <View>
            <Text>Username:</Text>
            <TextInput value={username} onChangeText={username => setUsername(username)} />
            <Text>Password:</Text>
            <TextInput secureTextEntry={true} value={password} onChangeText={password => setPassword(password)} />
            <Text>Email:</Text>
            <TextInput value={email} onChangeText={email => setEmail(email)} />
            <Button onPress={Registration} title="Registration"/>
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
                <Text>{modalText}</Text>
                <Button onPress={gotologin} title="OK"/>
              </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    modalView: {
      margin: 20,
      backgroundColor: "white",
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
    }})
  
export default Registration