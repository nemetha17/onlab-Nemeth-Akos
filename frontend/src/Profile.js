import React, {useState} from 'react'
import {View, TextInput, Text, Button, TouchableHighlight, Modal,  StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"

const Profile = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('')
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')

    const getMyPosts = async () => {
        const { data: posts } = await axios.get('http://192.168.0.102:3001/api/myposts')
        setPosts(posts)
        console.log(posts)
    }

    const LogOut = async () =>{
        AsyncStorage.removeItem('token')
        navigation.navigate('Login')

    }

    const Read = async (post) =>{
        console.log(post)
        const id = post._id
        const data = await axios.put('http://192.168.0.102:3001/api/postsread/' + id)
        console.log(data)
        navigation.navigate("PostViewer", {id: id})
    }

    const EditPost = async () =>{
        if(search===''){
            setModalText("Search is empty")
            setModalVisible(true)
        } else {
            const {data} = await axios.get('http://192.168.0.102:3001/api/checkposts/'+search)
            console.log(data)
            if(data==="no such post"){
                setModalText("Wrong title")
                setModalVisible(true)
            } else if(data==="Not your post"){
                setModalText(data)
                setModalVisible(true)
            }else {
                const {data} = await axios.get('http://192.168.0.102:3001/api/searchposts/'+search)
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
        <View>
            <Button title="LogOut"  onPress={LogOut}/>
            <Button title="My Posts"  onPress={getMyPosts}/>
            <Text>Title:</Text>
            <TextInput value={search} onChangeText={search => setSearch(search)} />
            <Button title="Edit post"  onPress={EditPost}/>
            <View>
                {posts.map((post) => (
                    <TouchableHighlight onPress={() =>Read(post)}><Text>{post.title}</Text></TouchableHighlight>
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
    }})
  

export default Profile