import React, {useState} from 'react'
import {View, Text, TouchableHighlight, Modal,  StyleSheet } from 'react-native'
import axios from 'axios'
import {Picker} from '@react-native-picker/picker';
import Button from './components/Button'

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
            const { data: posts } = await axios.get('http://192.168.0.104:3001/api/posts')
            setPosts(posts)
            console.log(posts)
        } else {
            const { data: posts } = await axios.get('http://192.168.0.104:3001/api/topicposts/'+topic)
            setPosts(posts)
            console.log(posts.Text)
        }
    }

    const Read = async (post) =>{
        console.log(post)
        const id = post._id
        const data = await axios.put('http://192.168.0.104:3001/api/postsread/' + id)
        console.log(data)
        navigation.navigate("PostViewer", {id: id})
    }
    const Close = () =>{
        setModalVisible(false)
    }

    return(
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
            <Picker
                selectedValue={topic}
                style={{ height: 50, width: 150, }}
                itemStyle={{ backgroundColor: 'lightgrey', marginLeft: 0, paddingLeft: 15 }}
                itemTextStyle={{ fontSize: 18, color: 'white' }}
                onValueChange={(itemValue) => setTopic(itemValue)}
            >
                <Picker.Item label="Choose one" value="choose one" color="grey" />
                <Picker.Item label="All" value="all" color="grey" />
                <Picker.Item label="Sport" value="Sport"  color="grey"/>
                <Picker.Item label="Life" value="Life" color="grey" />
                <Picker.Item label="Gaming" value="Gaming" color="grey" />
                <Picker.Item label="Food" value="Dood" color="grey"/>
                <Picker.Item label="Music" value="Music" color="grey" />
                <Picker.Item label="DIY" value="Diy" color="grey" />
            </Picker>
            <Button title="Get Posts"  onPress={getPosts}/>
            </View>
            <View>
                {posts.map((post) => (
                    <TouchableHighlight onPress={() =>Read(post)}>
                      <View style={styles.touchable}>
                        <Text>{post.title}</Text>
                      </View>
                    </TouchableHighlight>
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
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
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
    Text:{
      color: 'lightgray'
    },
})

export default Home