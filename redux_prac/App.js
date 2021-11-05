/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'

import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <NavigationContainer>
      <View>
        <Text>
          hello world
        </Text>
      </View>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  
});

export default App;
