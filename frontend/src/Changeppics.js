import React, {useState, useEffect} from 'react'
import {View, Image} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Button from './components/Button'
import axios from 'axios'


const Changeppics = ({navigation}) =>{
    const [file, setFile] = useState()
    const [picture, setPicture] = useState()

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

      const upload = async () =>{
          console.log("b")
        const formData = new FormData()
        formData.append('pic', {
          name: "Profile.jpg",
          uri: picture, 
          type: "image/jpg", 
        })
        console.log(formData)
        const {data} = await axios.post('http://192.168.0.104:3001/api/uploadprofilepic', formData) 
        console.log(data)
      }
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick your profile picture" onPress={pickImage} />
      {picture && <Image source={{ uri: picture }} style={{ width: 200, height: 200 }} />}
      <Button title="Save" onPress={upload}/>
    </View>
  );
};


export default Changeppics