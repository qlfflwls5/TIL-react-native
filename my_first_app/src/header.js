/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'

const Header = ({ name }) => {
  return (
    <TouchableOpacity
    style={styles.header}
    onPress={() => alert('hello world')}
    // onLongPress={() => alert('hello world')}
    // onPressIn={() => alert('hello world')}
    // onPressOut={() => alert('hello world')}
    >
      <View>
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'pink',
    alignItems: 'center',
    padding: 5,
    width: '100%',
  }
})

export default Header
