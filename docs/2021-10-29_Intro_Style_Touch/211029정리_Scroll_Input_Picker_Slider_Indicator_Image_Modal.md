# Scroll

ScrollView를 임포트한다.

+ 공식문서를 보면 프로퍼티들이 굉장히 많다.

```react
import {View, Text, StyleSheet, ScrollView} from 'react-native'
...

		<ScrollView
          style={{width: '100%'}}
        >
          <NumList 
            num={this.state.random}
            del={this.onNumDelete}
          />
        </ScrollView>
```

이렇게 하면 다른 요소들은 가만히 있고, NumList에만 스크롤이 생긴다.

+ onMomentumScrollBegin: 스크롤을 움직였을 때 손을 뗀 바로 그 시점
+ onMomentumScrollEnd: 스크롤을 움직였을 때 스크롤이 멈추는 시점
  + 둘의 차이는 스크롤을 내가 확 올렸을 때 스크롤이 주루룩 움직일 때까지 기다리느냐 마느냐의 차이

+ onScroll: 스크롤 움직임이 발생했을 때
+ onContentSizeChange: 스크롤의 크기가 변했을 때
  + `onContentSizeChange={(width, height) => alert(height)}`

+ bounces: true면 스크롤 끝에서 통통 튀고, false면 안튐
+ 등등 많이 있다.

<br>

# TextInput

TextInput을 임포트하여 사용한다.

Input은 값이 변결될 때마다 발생하는 onChangeText 프로퍼티와 주로 같이 사용한다.

```react
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
```

+ multiline: 원래 기본적으로 input은 쭉 옆으로만 글자들이 이어진다. 화면을 넘을 때 개행해주는 프로퍼티
+ maxLength: 최대 글자 지정
+ autoCapitalize: 자동적으로 첫 글자를 대문자로 변경. 'none'이면 해제
+ editable: false로 설정하면 disabled의 효과가 난다.

지금같은 경우야 input.js를 만들어서 진행했지만, 만약 App.js에서 input 값을 토대로 어떠한 작업을 한다고 하면 이 input.js에 있는 로직은 App.js로 가져와야 한다. 왜? 자식 컴포넌트에서 부모 컴포넌트로의 데이터 전달이 안되기 때문이다.

이 과정은 여태까지 배운 것들을 통해 어렵지 않게 할 수 있을 것이다. Input을 App.js에서 구현하고, 제출 버튼은 만든 다음, 버튼을 누를 때마다 현재 inputValue를 state 내의 리스트에 추가하는 식으로 구현하면 된다. 

+ 예를 들어 `result: [...result, this.state.myTextInput]`과 같이 될 것이다.

<br>

# Picker

여러가지 선택 박스가 있고 원하는 것을 고르는 기능

picker.js 파일 생성

https://github.com/react-native-picker/picker 참고

+ `npm install @react-native-picker/picker --save`
+ `import {Picker} from '@react-native-picker/picker'`

App.js에서는 picker.js를 임포트하고 `<Picker />`로 사용하기만 하면 된다.

```react
import React from 'react'
import {View, StyleSheet } from 'react-native'
import {Picker} from '@react-native-picker/picker'


class PickerComponent extends React.Component {

  state = {
    country: 'korea'
  }

  onPick

  render() {
    return (
      <View style={styles.container}>
        <Picker
          style={{height: 50, width: 250}}
          selectedValue={this.state.country}
          onValueChange={(val, idx) => {
            this.setState({country: val})
          }}
        >
          <Picker.Item label="Korea" value="korea" />
          <Picker.Item label="Canada" value="canada" />
        </Picker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginBottom: 200,
    alignItems: 'center',
  }
})

export default PickerComponent
```

+ selectedValue와 onValueChange를 잘 활용하자.
  + onValueChange의 **첫 번째 인자는 값, 두 번째 인자는 인덱스**가 들어온다.

<br>

# Slide

https://github.com/callstack/react-native-slider 참고

+ `npm install @react-native-community/slider --save --legacy-peer-deps`
+ `import Slider from ‘@react-native-community/slider’`

근데 현재 프로젝트에서는 slider 진행이 안된다. 패스.

<br>

# ActivityIndicator

데이터 로딩에 시간이 조금 걸릴 때 로더를 말한다.

ActivityIndicator를 임포트한다. picker.js에 써보자.

```react
class PickerComponent extends React.Component {

  state = {
    country: 'korea'
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="green"
          animating={true}
        />
        <Picker
          style={{height: 50, width: 250}}
          selectedValue={this.state.country}
          onValueChange={(val, idx) => {
            this.setState({country: val})
          }}
        >
          <Picker.Item label="Korea" value="korea" />
          <Picker.Item label="Canada" value="canada" />
        </Picker>
      </View>
    )
  }
}
```

+ animating이 true일 때 돌아간다.

<br>

# Image

이미지를 가져오는 방법은 크게 두 가지

+ 로컬에 있는 이미지를 가져오기
+ 어딘가의 서버에 있는 이미지를 가져오기

### 로컬

assets라는 폴더를 만들어보자. 그 아래에 images를 만든다.

Image를 임포트한다.

```react
import MyPhoto from './assets/images/MyPhoto.jpg'
...

<Image
  style={styles.image}
  source={MyPhoto}
  resizeMode="cover"
  onLoadEnd={() => alert("Image Loaded!")}
/>
```

+ source: 이미지의 소스를 말한다.
+ resizeMode: 정말 중요하다. contain, cover 등이 있다. 문서 확인하자.
  + contain은 주어진 공간에 사진이 다 들어가게 채워진다. 즉, 주어진 공간에서 좁은쪽에 맞춰진다.
  + cover는 주어진 공간을 전부 사진이 채우도록 한다. 즉, 주어진 공간에서 긴쪽에 맞춰진다.
+ onLoadEnd: 이미지가 로딩이 끝났을 때 발동되는 트리거다.

### 서버

Image 태그에 대한 프로퍼티는 같다.

단지 source 부분이 `source=({uri: 'https://picsum.photos/id/237/200/300'})`와 같이 작성된다.

<br>

# Modal

Modal을 임포트한다.

```react
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
```

App.js에서는 `<Modal />`만 적어주면 끝난다.

+ visible: 기본적으로 true이며, 계속 보이기 때문에 이를 조정해주는 로직을 넣어야 한다.
+ animationType: 모달이 뜨는 애니메이션을 지정해줄 수 있으며, 공식문서로 여러 값을 알 수 있다.
+ onShow: 모달이 열렸을 때의 트리거
