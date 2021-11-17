import React, {useState, useEffect} from 'react'
import {View, Text, TouchableHighlight, Modal,  StyleSheet, Image } from 'react-native'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Button from './components/Button'

const Profile = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('')
    const [posts, setPosts] = useState([])
    const [me,setMe] = useState()
    const [name, setName] = useState()


    const load = async () => {
      const {data : username}= await axios.get('http://192.168.0.104:3001/api/Myname')
        console.log(username)
        setName(username)
        console.log("asd")
        console.log(name)
        const { data: posts } = await axios.get('http://192.168.0.104:3001/api/myposts')
        setPosts(posts)
        console.log(posts)
        const {data} = await axios.get('http://192.168.0.104:3001/api/Mypics')
        console.log(data)
        setMe(data)
        console.log(me)

    }
    useEffect(() =>{
        load()
    }, [])


    const LogOut = async () =>{
        setModalVisible(false)
        AsyncStorage.removeItem('token')
        navigation.navigate('Login')

    }

    const ChangeProfilePics = async () =>{
        setModalVisible(false)
        navigation.navigate('Changeppics')
    }
    const ChangePassword = async () =>{
        setModalVisible(false)
        navigation.navigate('PWChange')
    }

    const Read = async (post) =>{
        console.log(post)
        const id = post._id
        const data = await axios.put('http://192.168.0.104:3001/api/postsread/' + id)
        console.log(data)
        navigation.navigate("PostViewer", {id: id})
    }

    const Modalopen = () =>{
        setModalVisible(true)
    }

    const Close = () =>{
        setModalVisible(false)
    }

    
    return(
        <View style={styles.container}>
              <View style={styles.header}>
              <TouchableHighlight onPress={() =>Modalopen()}>
              <Image source={{ uri: 'http://192.168.0.104:3001'+me }} style={{ width: 50, height: 50 }} />
              </TouchableHighlight>
              <View style={styles.user}>
                <Text style={styles.Name}>{name}</Text>
              </View>
              </View>
            <View>
                {posts.map((post) => (
                    <View style={styles.touchable}>
                        <TouchableHighlight onPress={() =>Read(post)}>
                          <Text style={styles.Text}>{post.title}</Text>
                        </TouchableHighlight>
                    </View>
                 ))}
            </View>
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
                <Button title="Change Password"  onPress={ChangePassword}/>
                <Button title="Change Profile Pics"  onPress={ChangeProfilePics}/>
                <Button title="LogOut"  onPress={LogOut}/>
                <Button onPress={Close} title="Close"/>
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
    touchable:{
        justifyContent: "center",
        alignItems: "center",
        width: 350,
        height: 55,
        backgroundColor: '#303030',
        margin: 10,
        padding: 8,
        color: "white",
        borderRadius: 14,
        fontSize: 18,
      },
      container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
      },
      Text:{
        color: 'lightgray'
      },
      header:{
        flexDirection: "row" ,
        backgroundColor: "black",
      },
      Name:{
        color: 'lightgray',
        fontSize:24
      },
      user:{
        paddingLeft:100,
        paddingTop:10
      }
    
    })
  

export default Profile