import React, {useState} from 'react'
import {View, TextInput, Text, Button, TouchableHighlight ,Modal,  StyleSheet } from 'react-native'
import axios from 'axios'

const Search = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('')
    const [search, setSearch] = useState('')
    const [posts, setPosts] = useState([])
    
    const SearchPost = async () => {
        if(search===''){
            setModalText('Search has no value')
            setModalVisible(true)
        } else {
            const {data} = await axios.get('http://192.168.0.102:3001/api/searchposts/'+search)
            console.log(data)
            if(data.title===search){
                console.log(data._id)
                navigation.navigate("PostViewer", {id: data._id})
            } else{
                setModalText('No post found with this title')
                setModalVisible(true)
            }
        }
    }
    const SearchUser = async () =>{
        if(search===''){
            setModalText('Search has no value')
            setModalVisible(true)
        } else {
            const {data} = await axios.get('http://192.168.0.102:3001/api/users/'+search)
            console.log(data)
            if(data==="No user found"){
                setModalText(data)
                setModalVisible(true)
            } else {
                const id = data._id
                const { data: posts } = await axios.get('http://192.168.0.102:3001/api/userposts/'+id)
                setPosts(posts)
                console.log(posts)
            }
        }
    }

    const Read = (id) =>{
        navigation.navigate("PostViewer", {id: id})
    }
    const Close = () =>{
        setModalVisible(false)
    }

    return(
        <View>
            <Text>Enter the post title or the username:</Text>
            <TextInput value={search} onChangeText={search => setSearch(search)} />
            <Button onPress={SearchPost} title="Search post" />
            <Button onPress={SearchUser} title="Search user" />
            <View>
                {posts.map((post) => (
                    <TouchableHighlight onPress={() =>Read(post._id)}><Text>{post.title}</Text></TouchableHighlight>
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
  
export default Search