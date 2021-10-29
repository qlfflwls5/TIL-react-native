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
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const NumList = ({ num, del }) => {
  return (
    num.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.numList}
        onPress={() => del(index)}
      >
        <View>
          <Text>{item}</Text>
        </View>
      </TouchableOpacity>
    ))
  )
}

const styles = StyleSheet.create({
  numList: {
    backgroundColor: '#cecece',
    alignItems: 'center',
    padding: 5,
    width: '100%',
    marginTop: 5,
  }
})

export default NumList
