import React, {useState} from 'react'
import {View, TextInput, Text, Modal,  StyleSheet } from 'react-native'
import axios from 'axios'
import {Picker} from '@react-native-picker/picker';
import Button from './components/Button'

const PostUpload = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [topic, setTopic] = useState('choose one')

    const uploadPost = async () =>{
        if(topic==="choose one"){
            setModalText("Choose a topic")
            setModalVisible(true)
        } else if(title===""){
            setModalText("Title is empty")
            setModalVisible(true)
        } else if(content===""){
            setModalText("Content is empty")
            setModalVisible(true)
        } else {
            const { data } = await axios.post('http://192.168.0.104:3001/api/posts', {
            title,
            content,
            topic,
            })
            if(data==="Succes"){
                navigation.navigate("Home")
                setModalText("Post created succedfully")
                setModalVisible(true)
            }
        }
    }
    const Close = () =>{
        setModalVisible(false)
      }

    return(
        <View style={styles.container}>
        <Text style={styles.titleText} >Title:</Text>
        <TextInput 
          style={styles.input} 
          autoCapitalize="none"
          value={title} 
          onChangeText={title => setTitle(title)} />
        <Text style={styles.titleText} >Topic:</Text>
        <Picker
            selectedValue={topic}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue) => setTopic(itemValue)}
        >
            <Picker.Item label="Choose one" value="choose one" />
            <Picker.Item label="Sport" value="Sport" />
            <Picker.Item label="Life" value="Life" />
            <Picker.Item label="Gaming" value="Gaming" />
            <Picker.Item label="Food" value="Dood" />
            <Picker.Item label="Music" value="Music" />
            <Picker.Item label="DIY" value="Diy" />
        </Picker>
        <Text style={styles.titleText} >Content:</Text>
        <TextInput
          style={styles.inputcontent} 
          multiline = {true}
          autoCapitalize="none"
          value={content} 
          onChangeText={content => setContent(content)}/>
        <Button title="Post"  onPress={uploadPost}/>
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
    inputcontent: {
      width: 350,
      height: 200,
      backgroundColor: "lightgreen",
      margin: 10,
      padding: 8,
      color: "white",
      borderRadius: 14,
      fontSize: 18,
      fontWeight: "500",
    },
    titleText:{
      fontSize: 24,
      fontWeight: "bold"
    },
  })

export default PostUpload