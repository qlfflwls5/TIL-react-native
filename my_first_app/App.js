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
import {View, Text, StyleSheet} from 'react-native'
import Header from './src/header'
import Generator from './src/generator'
import NumList from './src/numList'

class App extends React.Component {

  state = {
    appName: 'My first app',
    random: [36, 999],
  }

  onAddRandomNum = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1
    this.setState(current => {
      return {
        random: [
          ...current.random,
          randomNum,
        ],
      }
    })
  }

  onNumDelete = (index) => {
    const newArray = this.state.random.filter((num, idx) => {
      return index !== idx
    })
    this.setState({
      random: newArray,
    })
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Header name={this.state.appName}/>

        <View>
        <Text
          onLongPress={() => {alert('hello world')}}
        >press</Text>
        </View>

        <Generator add={this.onAddRandomNum} />

        <NumList 
          num={this.state.random}
          del={this.onNumDelete}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    // justifyContent: 'center',
  },
  subView: {
    backgroundColor: 'yellow',
    marginBottom: 10,
  },
  anotherSubView: {
    alignItems: 'center',
    backgroundColor: 'yellow',
    flex: 2,
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: 'red',
    padding: 20,
  }
})

export default App
