import React, {useState, useEffect} from 'react'
import {View, TextInput, Text, Button, Modal,  StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    
    const check = async () => {
        const token = await AsyncStorage.getItem('token')
        axios.defaults.headers.authorization = `Bearer ${token}`
        const { data } = await axios.get('http://192.168.0.102:3001/api/Usercheck')
        console.log(data)
        if (data === 'OK') {
            navigation.navigate('Blogz')
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          check();
        });
        return unsubscribe;
      }, [navigation]);

    

    const login = async () => {
        const { data } = await axios.post('http://192.168.0.102:3001/api/login', {
          username,
          password,
        })
        if(data!="Wrong username" & data!="Wrong password" ){
          axios.defaults.headers.authorization = `Bearer ${data.token}`
          await AsyncStorage.setItem('token',data.token);
          console.log(data.token)
          navigation.navigate('Blogz')
        } else {
          setModalText(data)
          setModalVisible(true)
        }
      }

    const Registration = () =>{
        navigation.navigate('Registration')
    }    

    const Close = () =>{
      setModalVisible(false)
    }

    return(
        <View> 
            <Text>Username:</Text>
            <TextInput value={username} onChangeText={username => setUsername(username)} />
            <Text>Password:</Text>
            <TextInput secureTextEntry={true} value={password} onChangeText={password => setPassword(password)} />
            <Button onPress={login} title="Login" />
            <Button onPress={Registration} title="Registration" />
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

export default Login