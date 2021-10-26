import React from 'react'
import {View, Text , Button} from 'react-native'
import * as ImagePicker from "react-native-image-picker"


const Changeppics = ({navigation}) =>{

    const options = {
        title: 'Pick profile pic',
        storgaeOptions: {
            skipBackup: true,
            path: 'images',
        }
    }

    const openPicker = () =>{
        ImagePicker.launchImageLibrary(options, (response) =>{
            if(response.didCancel) {
                console.log('User cancelled image picker');
            } else if( response.error) {
                console.log('ImagePicker Error: ', response.error);
            }  else {
                const source = { uri:response.uri};
            }
        })
    }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick Image" onPress={openPicker}/>
    </View>
  );
};


export default Changeppics