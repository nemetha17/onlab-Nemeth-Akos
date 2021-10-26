import React from 'react'
import {
  TouchableHighlight,
  Text,
  Platform,
  Button as DefaultButton,
} from 'react-native'

const Button = ({ title, ...rest }) => {
  if (Platform.OS == 'ios') {
    return <DefaultButton {...rest} title={title} />
  }
  return (
    <TouchableHighlight
      {...rest}
      underlayColor="#006550"
      style={{
        borderWidth: 1,
        padding: 10,
        margin:10,
        borderColor: 'darkgray',
        borderRadius: 10,
      }}
    >
      <Text>{title}</Text>
    </TouchableHighlight>
  )
}

export default Button