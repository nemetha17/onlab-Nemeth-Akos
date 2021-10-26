import React, {useState} from 'react'
import {View, TextInput, Text, Modal,  StyleSheet } from 'react-native'
import axios from 'axios'
import Button from './components/Button'

const PWChange = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [modalText, setModalText] = useState('')
    const [oldpassword, setOldpassword] = useState('')
    const [newpasswordone, setNewpasswordone] = useState('')
    const [newpasswordtwo, setnewpasswordtwo] = useState('')

    const ChangePassword = async () =>{
        if(newpasswordone === newpasswordtwo){
            console.log("Jó")
            const {data} = await axios.post('http://192.168.0.104:3001/api/ChangePW', {
                oldpassword,
                newpasswordone})
            if(data === "Wrong password"){
                setModalText(data)
                setModalVisible(true)
            } else {
                setModalText("Password changed")
                setModal2Visible(true)
            }
            
        } else {
            setModalText("Passwords doesn't match")
            setModalVisible(true)
        }
        
    }
    const Close = () =>{
        setModalVisible(false)
    }
    const gotoprofile =() =>{
        navigation.navigate('Profile')
    }
    return(
        <View style={styles.container}>
            <TextInput 
              style={styles.input} 
              autoCapitalize="none"
              placeholderTextColor="white"
              secureTextEntry={true} 
              value={oldpassword} 
              placeholder="Old password"
              onChangeText={oldpassword => setOldpassword(oldpassword)} />
            <TextInput 
              style={styles.input} 
              autoCapitalize="none"
              placeholderTextColor="white"
              secureTextEntry={true} 
              value={newpasswordone}
              placeholder="New password" 
              onChangeText={newpasswordone => setNewpasswordone(newpasswordone)} />
            <TextInput 
              style={styles.input} 
              autoCapitalize="none"
              placeholderTextColor="white"
              secureTextEntry={true} 
              value={newpasswordtwo} 
              placeholder="New passwrod"
              onChangeText={newpasswordtwo => setnewpasswordtwo(newpasswordtwo)} />
            <Button 
              onPress={ChangePassword} 
              title="Change"/>
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
                <Button onPress={gotoprofile} title="OK"/>
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
    },
    container: {
      flex: 1,
      backgroundColor: "green",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      width: 350,
      height: 55,
      backgroundColor: "lightgreen",
      margin: 10,
      padding: 8,
      color: "white",
      borderRadius: 14,
      fontSize: 18,
      fontWeight: "500",
    },
  })
  
export default PWChange