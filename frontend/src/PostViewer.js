import React, {useState, useEffect} from 'react'
import {View, Text, Button, Modal, StyleSheet } from 'react-native'
import axios from 'axios'

const PostViewer = ({route}) =>{
    const [post, setPosts] = useState([])
    const [userid, setUserid] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('')
    const { id } = route.params;

    const load = async () => {
        console.log(id)
        const { data :posts } = await axios.get('http://192.168.0.102:3001/api/posts/'+id)
        setPosts(posts)
        console.log(posts)
        const { data: user } = await axios.get('http://192.168.0.102:3001/api/Userid')
        console.log(user)
        setUserid(user._id)
    }

    useEffect(() =>{
        load()
    }, [])

    const DeletePost = async (post) =>{
        const id = post._id
        const data = await axios.delete('http://192.168.0.102:3001/api/posts/'+id)
        console.log(data)
        setModalText("Deleted succesfully")
        setModalVisible(true)
    }
    const Close = () =>{
        setModalVisible(false)
      }
    return(
        <View>
            <Text>{post.title}</Text>
            <Text>{post.topic}</Text>
            <Text>{post.content}</Text>
            <Text>This post was read:{post.read} times</Text>
            {(post.createdBy===userid) ? (
                <Button onPress={() =>DeletePost(post)} title="Delete" />
            ):<Text></Text>}
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


export default PostViewer