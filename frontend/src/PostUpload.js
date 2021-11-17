import React, {useState, useEffect} from 'react'
import {View, TextInput, Text, Modal,  StyleSheet,  Image } from 'react-native'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';
import Button from './components/Button'

const PostUpload = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [topic, setTopic] = useState('choose one')
    const [picture, setPicture] = useState()
    const [file, setFile] = useState()

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
    

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });
      console.log(result);
    
        if (!result.cancelled) {
          setFile(result);
          setPicture(result.uri);
        }
      };

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
            const formData = new FormData()
            formData.append('pic', {
              name: "Profile.jpg",
              uri: picture, 
              type: "image/jpg", 
            })
            console.log(formData)
            const { data } = await axios.post('http://192.168.0.104:3001/api/posts', {
            title,
            content,
            topic,
            })
            console.log(data)
            const id = data._id
            const response = await axios.post('http://192.168.0.104:3001/api/uploadpic/'+id, formData) 
            console.log(response.data)
            if(response.data==="Succes"){
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
        <Button title="Pick your profile picture" onPress={pickImage} />
          {picture && <Image source={{ uri: picture }} style={{ width: 200, height: 200 }} />}
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
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      width: 350,
      height: 55,
      backgroundColor: '#303030',
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
      backgroundColor: '#303030',
      margin: 10,
      padding: 8,
      color: "white",
      borderRadius: 14,
      fontSize: 18,
      fontWeight: "500",
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

export default PostUpload