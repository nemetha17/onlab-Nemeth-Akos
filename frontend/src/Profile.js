import React, {useState} from 'react'
import {View, Text, TouchableHighlight, Modal,  StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Button from './components/Button'

const Profile = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('')
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')

    const getMyPosts = async () => {
        const { data: posts } = await axios.get('http://192.168.0.104:3001/api/myposts')
        setPosts(posts)
        console.log(posts)
    }

    const LogOut = async () =>{
        AsyncStorage.removeItem('token')
        navigation.navigate('Login')

    }

    const ChangeProfilePics = async () =>{
        navigation.navigate('Changeppics')
    }
    const ChangePassword = async () =>{
        navigation.navigate('PWChange')
    }

    const Read = async (post) =>{
        console.log(post)
        const id = post._id
        const data = await axios.put('http://192.168.0.104:3001/api/postsread/' + id)
        console.log(data)
        navigation.navigate("PostViewer", {id: id})
    }

    const EditPost = async () =>{
        if(search===''){
            setModalText("Search is empty")
            setModalVisible(true)
        } else {
            const {data} = await axios.get('http://192.168.0.104:3001/api/checkposts/'+search)
            console.log(data)
            if(data==="no such post"){
                setModalText("Wrong title")
                setModalVisible(true)
            } else if(data==="Not your post"){
                setModalText(data)
                setModalVisible(true)
            }else {
                const {data} = await axios.get('http://192.168.0.104:3001/api/searchposts/'+search)
                console.log(data)
                if(data.title===search){
                    console.log(data._id)
                    navigation.navigate("PostEditor", {id: data._id})
                } else{
                    console.log(data)
                }
            }}
    }

    const Close = () =>{
        setModalVisible(false)
    }

    
    return(
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <Button title="Change Password"  onPress={ChangePassword}/>
                <Button title="Change Profile Pics"  onPress={ChangeProfilePics}/>
                <Button title="LogOut"  onPress={LogOut}/>
            </View>
            <Button title="My Posts"  onPress={getMyPosts}/>
            <View>
                {posts.map((post) => (
                    <View style={styles.touchable}>
                        <TouchableHighlight onPress={() =>Read(post)}><Text>{post.title}</Text></TouchableHighlight>
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
    },
    touchable:{
        justifyContent: "center",
        alignItems: "center",
        width: 350,
        height: 55,
        backgroundColor: "lightgreen",
        margin: 10,
        padding: 8,
        color: "white",
        borderRadius: 14,
        fontSize: 18,
      },
      container: {
        flex: 1,
        backgroundColor: "green",
        alignItems: "center",
      },
})
  

export default Profile