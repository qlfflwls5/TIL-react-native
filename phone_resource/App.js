/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Platform, PermissionsAndroid, View, Text, StyleSheet, Image, Button } from "react-native"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Contacts from 'react-native-contacts'


class App extends React.Component {

  state = {
    avatar: '',
    myContacts: [],
  }

  addIamge = () => {
    launchCamera({}, response => { // launchImageLibrary 갤러리에서 가져오기
      if (!response.assets) {
        return
      }
      this.setState({
        avatar: response.assets[0].uri
      })
    })
  }

  loadIamge = () => {
    launchImageLibrary({}, response => {
      if (!response.assets) {
        return
      }
      this.setState({
        avatar: response.assets[0].uri
      })
    })
  }

  // Android의 접근 정책이 강화되었기 때문에 권한 획득 여부 파악
  async requestContactPermission() {
    if(Platform.OS === 'ios') {
      console.warn('ios')
      return true
    } else {
      console.warn('Android')

      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      ])

      if(
        granted['android.permission.READ_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        return true
      } else {
        return false
      }
    }
  }

  getContact = () => {
    this.requestContactPermission()
    .then((didGetPermission) => {
      if(didGetPermission) {
        Contacts.getAll()
          .then((contacts) => {
            this.setState({
              myContacts: contacts
            })
          })
          .catch((err) => {
            throw err
          })
      } else {
        alert('no permission')
      }
    })
  }

  addContact = () => {
    this.requestContactPermission()
    .then((didGetPermission) => {
      if(didGetPermission) {

        const newContact = {
          emailAddresses: [{
            label: "work",
            email: "aaa@example.com"
          }],
          familyName: "Go",
          givenName: "Gildong",
          phoneNumbers: [{
            label: "mobile",
            number: "(010) 1111-1111"
          }]
        }

        Contacts.addContact(newContact)
          .then (() => {
            this.getContact()
          })
          .catch ((err) => {
            throw err
          })
      } else {
        alert('no permission')
      }
    })
  }

  openForm = () => {
    Contacts.openContactForm({})
      .then (() => {
        this.getContact()
      })
      .catch ((err) => {
        console.warn(err)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.state.avatar}}
          style={styles.avatar}
        />
        {this.state.myContacts.map((item, index) => (
          <Text>{item.givenName} {item.familyName}</Text>
        ))}
        <Button
          title="Get Contacts"
          onPress={() => this.getContact()}
        />
        <Button
          title="Add Contacts"
          onPress={() => this.openForm()}
        />
        <Button
          title="Add an Image"
          onPress={() => this.addIamge()}
        />
        <Button
          title="Load an Image"
          onPress={() => this.loadIamge()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#e4ab26'
  },
  avatar: {
    width: '100%',
    height: 400
  }
})

export default App
