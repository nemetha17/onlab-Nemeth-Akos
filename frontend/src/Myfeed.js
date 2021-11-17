import React, {useState , useEffect} from 'react'
import {View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import axios from 'axios'
import Button from './components/Button'

const Myfeed = ({navigation}) =>{
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
            const { data: posts } = await axios.get('http://192.168.0.104:3001/api/Myfeed')
            setPosts(posts)
            console.log(posts)
    }

    useEffect(() =>{
        getPosts()
    }, [])

    const Read = async (post) =>{
        console.log(post)
        const id = post._id
        const data = await axios.put('http://192.168.0.104:3001/api/postsread/' + id)
        console.log(data)
        navigation.navigate("PostViewer", {id: id})
    }


    return(
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
            <View>
                {posts.map((post) => (
                    <View style={styles.touchable}>
                        <TouchableHighlight onPress={() =>Read(post)}><Text>{post.title}</Text></TouchableHighlight>
                    </View>
                 ))}
            </View>
            </View>
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
    }
})

export default Myfeed