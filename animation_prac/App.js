/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Dimensions, View, Text, StyleSheet } from 'react-native'
import AnimOne from './src/Animation01'
import AnimTwo from './src/Animation02'
import DeviceInfo from 'react-native-device-info'


class App extends React.Component {

  functionA = () => {
    if (Dimensions.get('window').fontScale === 1) {
      console.log('Good')
    } else {
      console.log('Error! The font scale must be 1')
    }
  }

  render() {
    console.log(Dimensions.get('screen'))
    console.log(Dimensions.get('window'))
    console.log(this.functionA())
    console.log(DeviceInfo.getBrand())
    console.log(DeviceInfo.getPhoneNumber())
    return (
      <View style={styles.container}>
        {/* <AnimOne />
        <AnimTwo /> */}
        <Text>Hello</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
