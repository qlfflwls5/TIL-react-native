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
import {View, Text, StyleSheet, ScrollView, TextInput, Button, Image} from 'react-native'
import Header from './src/header'
import Generator from './src/generator'
import NumList from './src/numList'
import Input from './src/input'
import Picker from './src/picker'
import MyPhoto from './assets/images/MyPhoto.jpg'
import Modal from './src/modal'

class App extends React.Component {

  state = {
    appName: 'My first app',
    random: [36, 999],
    myTextInput: '',
    alphabet: ['a', 'b', 'c']
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

  onChangeInput = (e) => {
    this.setState({
      myTextInput: e
    })
  }

  onAddTextInput = () => {
    this.setState(current => {
      return {
        myTextInput: '',
        alphabet: [...current.alphabet, current.myTextInput]
      }
    })
  }

  render() {
    return (
      <View style={styles.mainView}>
        {/* <Header name={this.state.appName}/>

        <View>
        <Text
          onLongPress={() => {alert('hello world')}}
        >press</Text>
        </View>

        <Generator add={this.onAddRandomNum} />

        <ScrollView
          style={{width: '100%'}}
          // onMomentumScrollBegin={() => alert('begin')}
          onMomentumScrollEnd={() => alert('begin')}
          // onScroll={() => alert('begin')}
          // onContentSizeChange={(width, height) => alert(height)}
          // bounces={true}
        >
          <NumList 
            num={this.state.random}
            del={this.onNumDelete}
          />
        </ScrollView>

        <Input /> */}

        <Modal />
        <Image
          style={styles.image}
          source={MyPhoto}
          resizeMode="cover"
          onLoadEnd={() => alert("Image Loaded!")}
        />
        <Picker />
        <View style={styles.mainView}>
          <TextInput
            style={styles.input}
            value={this.state.myTextInput}
            onChangeText={this.onChangeInput}
            multiline={true}
            maxLength={20}
            autoCapitalize={'none'}
            editable={true}
          />
          <Button
            title="Add Text input"
            onPress={this.onAddTextInput}
          />
          <ScrollView
            style={{width: '100%'}}
          >
            {
              this.state.alphabet.map((item, idx) => (
                <Text key={idx} style={styles.mainText}>{item}</Text>
              ))
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
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
    margin: 20,
    backgroundColor: 'pink',
  },
  input: {
    width: '100%',
    backgroundColor: '#cecece',
    fontSize: 25,
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 300,
  }
})

export default App
