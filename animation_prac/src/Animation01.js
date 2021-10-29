/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { transform } from '@babel/core'
import React from 'react'
import { Easing, Animated, View, Button, StyleSheet } from 'react-native'


class AnimOne extends React.Component {

  constructor() {
    super()
    this.state = {
      mySquare: new Animated.Value(1)
    }
  }

  runAnimation = () => {
    Animated.timing(this.state.mySquare, {
      toValue: 0,
      duration: 2000,
      delay: 1000,
    }).start()
  }

  render() {
    return (
      <View>
        <Animated.View
          style={{
            opacity: this.state.mySquare,
            top: this.state.mySquare.interpolate({
              inputRange: [0, 1],
              outputRange: [700, 0]
            }),
            transform: [{
              rotateX: this.state.mySquare.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['0deg', '180deg', '360deg']
              })
            }]
          }}
        >
          <View style={styles.square}>
          </View>
        </Animated.View>
        <Animated.Text
          style={{
            fontSize: this.state.mySquare.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [40, 30, 20]
            }),
            color: this.state.mySquare.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: ['red', 'green', 'blue']
            })
          }}
        >
          Animation Effect
        </Animated.Text>
        <Button
          title="Animation Start"
          onPress={this.runAnimation}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue'
  }
})

export default AnimOne
