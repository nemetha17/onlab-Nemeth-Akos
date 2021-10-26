import React, {useState, useEffect} from 'react'
import {View, Text, Modal, StyleSheet,TextInput } from 'react-native'
import axios from 'axios'
import Button from './components/Button'

const PostViewer = ({route, navigation}) =>{
    const [post, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [userid, setUserid] = useState('')
    const [comment, setComment] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('')
    const { id } = route.params;

    const load = async () => {
        console.log(id)
        const { data :posts } = await axios.get('http://192.168.0.104:3001/api/posts/'+id)
        setPosts(posts)
        console.log(posts)
          for (let com of posts.comments) {
            console.log(com)
            const { data :comms } = await axios.get('http://192.168.0.104:3001/api/comments/'+com)
            setComments(comments => [...comments, comms]);
         }
        const { data: user } = await axios.get('http://192.168.0.104:3001/api/Userid')
        console.log(user)
        setUserid(user._id)
    }

    useEffect(() =>{
        load()
    }, [])

    const DeletePost = async (post) =>{
        const id = post._id
        const data = await axios.delete('http://192.168.0.104:3001/api/posts/'+id)
        console.log(data)
        setModalText("Deleted succesfully")
        setModalVisible(true)
    }

    const SendComment = async (comment) =>{
      const id = post._id
      const data = await axios.post('http://192.168.0.104:3001/api//postcomment/'+id, {
        comment
      })
      console.log(data)
      setModalText("Commented")
      setModalVisible(true)
  }
  const EditPost = async () =>{
      navigation.navigate("PostEditor", {id: post._id})
    }


    const Close = () =>{
        setModalVisible(false)
      }
    return(
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText} >{post.title}</Text>
            <Text style={styles.typeText} >{post.topic}</Text>
            <Text style={styles.contentText} >{post.content}</Text>
            <Text style={styles.readText} >This post was read:{post.read} times</Text>
          </View>
            {(post.createdBy===userid) ? (
              <View style={{ flexDirection: "row" }}>
                <Button onPress={() =>EditPost(post)} title="Edit" />
                <Button onPress={() =>DeletePost(post)} title="Delete" />
                </View>
            ):<Text></Text>}
            <View style={styles.comment}>
                {comments.map((com) => (
                    <Text>{com.username}: {com.text}</Text>
                 ))}
            </View>
            <TextInput style={styles.input}  value={comment} onChangeText={comment => setComment(comment)} />
            <Button onPress={() =>SendComment(comment)} title="Send" />
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
    container: {
      flex: 1,
      backgroundColor: "green",
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
    title:{
      justifyContent: "center",
      width: 350,
      backgroundColor: "lightgreen",
      margin: 10,
      padding: 8,
      color: "white",
      borderRadius: 14,
    },
    titleText:{
      fontSize: 24,
      fontWeight: "bold"
    },
    typeText:{
      fontSize: 14,
    },
    contentText:{
      fontSize: 18,
    },
    readText:{
      fontSize: 10,
    },
    comment:{
      justifyContent: "center",
      width: 350,
      backgroundColor: "lightgreen",
      margin: 10,
      padding: 8,
      borderRadius: 14,
    }
  

})


export default PostViewer