# Navigation

https://reactnavigation.org/

현재 듣고 있는 강의와는 버전이 맞지 않아 강의가 의미가 없다. 내가 개발할 때 공식문서를 참고하면서 하자.

<br>

# Phone Resource 활용

새로운 프로젝트에서 진행한다.

### Image Picker

프로젝트 생성 후, Image Picker를 설치

`npm install --save react-native-image-picker`

App.js는 다음과 같다.

+ launchCamera는 사진 촬영을, launchImageLibrary는 갤러리에서 사진 가져오기 기능이 된다.
+ 첫 번째 인자인 {}는 옵션에 해당한다.

```react
import React from 'react'
import { View, Text, StyleSheet, Image, Button } from "react-native"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'


class App extends React.Component {

  state = {
    avatar: '',
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

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.state.avatar}}
          style={styles.avatar}
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
```

두 경우 모두 가져오려다가 취소를 누르면 assets[0] 참조가 불가능하기 때문에 반드시 예외 처리를 해주어야만 한다.

<br>

### 연락처 접근

https://www.npmjs.com/package/react-native-contacts

`npm install react-native-contacts --save`

이후 위 사이트에서 Android의 세팅을 진행하자.

+ 안드로이드의 경우에는 연락처 접근 및 쓰기 권한을 얻어야 한다. 

그 다음, 코드 작성

`import Contacts from 'react-native-contacts'`

안드로이드의 경우에는 권한을 얻어야한다고 했다. 따라서 권한을 얻었는지 확인하는 코드가 필요하다.

+ async, await을 사용하여서 권한을 얻은 후에 진행되도록 한다.

```react
import React from 'react'
import { Platform, PermissionsAndroid, View, Text, StyleSheet, Image, Button } from "react-native"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Contacts from 'react-native-contacts'


class App extends React.Component {
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
	  // 안드로이드의 GRANTED와 같은지 파악. 즉, 권한이 있는지.
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
            console.warn(contacts)
          })
          .catch((err) => {
            throw err
          })
      } else {
        alert('no permission')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Get Contacts"
          onPress={() => this.getContact()}
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
```

연락처 추가도 해보자

```react
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


...
<Button
  title="Add Contacts"
  onPress={() => this.addContact()}
/>
```

연락처를 직접 입력해서 저장하고 싶다면 이렇게 하면 된다.

```react
openForm = () => {
  Contacts.openContactForm({})
    .then (() => {
      this.getContact()
    })
    .catch ((err) => {
      console.warn(err)
    })
}

...
<Button
  title="Add Contacts"
  onPress={() => this.openForm()}
/>
```

