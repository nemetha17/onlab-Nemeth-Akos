import React, {useState} from 'react'
import {View, Text, Button, TouchableHighlight, Modal,  StyleSheet } from 'react-native'
import axios from 'axios'
import {Picker} from '@react-native-picker/picker';

const Home = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('')
    const [posts, setPosts] = useState([])
    const [topic, setTopic] = useState('choose one')

    const getPosts = async () => {
        if(topic==="choose one"){
            setModalText("Choose a topic")
            setModalVisible(true)
        } else if(topic==="all") {
            const { data: posts } = await axios.get('http://192.168.0.102:3001/api/posts')
            setPosts(posts)
            console.log(posts)
        } else {
            const { data: posts } = await axios.get('http://192.168.0.102:3001/api/topicposts/'+topic)
            setPosts(posts)
            console.log(posts)
        }
    }

    const Read = async (post) =>{
        console.log(post)
        const id = post._id
        const data = await axios.put('http://192.168.0.102:3001/api/postsread/' + id)
        console.log(data)
        navigation.navigate("PostViewer", {id: id})
    }
    const Close = () =>{
        setModalVisible(false)
    }

    return(
        <View>
            <Picker
                selectedValue={topic}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => setTopic(itemValue)}
            >
                <Picker.Item label="Choose one" value="choose one" />
                <Picker.Item label="All" value="all" />
                <Picker.Item label="Sport" value="Sport" />
                <Picker.Item label="Life" value="Life" />
                <Picker.Item label="Gaming" value="Gaming" />
                <Picker.Item label="Food" value="Dood" />
                <Picker.Item label="Music" value="Music" />
                <Picker.Item label="DIY" value="Diy" />
            </Picker>
            <Button title="Get Posts"  onPress={getPosts}/>
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

export default Home