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
import {View, Text, StyleSheet, Button, Modal } from 'react-native'


class ModalComponent extends React.Component {

  state = {
    modal: false
  }

  handleModal = () => {
    this.setState({
      modal: this.state.modal ? false : true
    })
  }

  render() {
    return (
      <View style={{width: '100%'}}>
        <Button
          title="Open Modal"
          onPress={this.handleModal}
        />

        <Modal
          visible={this.state.modal}
          animationType="slide" // none, fade
          onShow={() => alert('warning!')}
        >
          <View style={{
            marginTop: 60,
            backgroundColor: "red"
          }}>
            <Text>
              This is modal content
            </Text>
          </View>
          <Button
            title="go back"
            onPress={this.handleModal}
          />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})

export default ModalComponent
