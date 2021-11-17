import React, {useState, useEffect, useReducer} from 'react'
import {View, Text, TouchableHighlight, Modal,  StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Button from './components/Button'

const Profile = ({route,navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('')
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState()
    const [mydata, setMydata] = useState([])
    const { id } = route.params;

    const load = async () => {
      const {data}= await axios.get('http://192.168.0.104:3001/api/Mydata')
        console.log(data)
        setMydata(data.following)
        console.log("M")
        console.log(mydata)
        console.log("M")
        const { data: posts } = await axios.get('http://192.168.0.104:3001/api/userposts/'+id)
        setPosts(posts)
        console.log(posts)
        const{ data: user} = await axios.get('http://192.168.0.104:3001/api/username/'+id)
        setUser(user)
        console.log(user)
        await axios.get('http://192.168.0.104:3001/api/Usercheck')

    }
    
    
    useEffect(() =>{
        load()
    }, [])



    const Read = async (post) =>{
        console.log(post)
        const id = post._id
        const data = await axios.put('http://192.168.0.104:3001/api/postsread/' + id)
        console.log(data)
        navigation.navigate("PostViewer", {id: id})
    }

    const Follow= async () =>{
        console.log(id)
        const data = await axios.put('http://192.168.0.104:3001/api/follow/' + id)
        console.log("Followed")
    }
    const UnFollow= async () =>{
      console.log(id)
      const data = await axios.put('http://192.168.0.104:3001/api/unfollow/' + id)
      console.log("Unfollowed")
  }
    const Close = () =>{
        setModalVisible(false)
    }

    
    return(
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.titleText} >{user}</Text>
                {mydata.includes(id) ? (
                <Button title="Unfollow" onPress={UnFollow} />
              ) : (
                <Button title="Follow" onPress={Follow} />
              )}
            </View>
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
                <Text style={styles.Text}>{modalText}</Text>
                <Button onPress={Close} title="OK"/>
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
      titleText:{
        fontSize: 24,
        fontWeight: "bold",
        color: 'lightgray'
      },
      Text:{
        color: 'lightgray'
      },
})
  

export default Profile