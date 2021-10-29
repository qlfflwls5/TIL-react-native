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
import {View, Text, StyleSheet, TextInput } from 'react-native'


class Input extends React.Component {

  state = {
    myTextInput: 'initial',
  }

  onChangeInput = e => {
    this.setState({
      myTextInput: e
    })
  }

  render() {
    return (
      <TextInput
        style={styles.input}
        value={this.state.myTextInput}
        onChangeText={this.onChangeInput}
        multiline={true}
        maxLength={20}
        autoCapitalize={'none'}
        editable={true}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: '#cecece',
    fontSize: 25,
    marginTop: 20,
  }
})

export default Input
