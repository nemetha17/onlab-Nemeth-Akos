import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native'
import axios from 'axios'

const PostViewer = ({route}) =>{
    const [post, setPosts] = useState([])
    const { id } = route.params;

    const load = async () => {
        console.log(id)
        const { data :posts } = await axios.get('http://192.168.0.102:3001/api/posts/'+id)
        setPosts(posts)
        console.log(posts)
    }

    useEffect(() =>{
        load()
    }, [])


    return(
        <View>
            <Text>{post.title}</Text>
            <Text>{post.topic}</Text>
            <Text>{post.content}</Text>
            <Text>This post was readed:{post.readed} times</Text>
        </View>
    )

}


export default PostViewer