# Animation

### 단순 X, Y 이동 애니메이션

Animation01.js 파일을 만들어준다.

Animated를 임포트해서 구현한다.

```react
import { Animated, View, StyleSheet } from 'react-native'


class AnimOne extends React.Component {

  constructor() {
    super()
    this.mySquare = new Animated.ValueXY(0, 0)
  }

  componentDidMount() {
    Animated.spring(this.mySquare, {
      toValue: {x: 50, y: 50}
    }).start()
  }

  render() {
    return (
      <Animated.View
        style={this.mySquare.getLayout()}
      >
        <View style={styles.square}>
        </View>
      </Animated.View>
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
```

App.js에서는 `<AnimOne />`만 넣어주면 된다.

spring 대신에 timing을 넣고 다음과 같이 하면 속도도 정해줄 수 있다.

```react
componentDidMount() {
  Animated.timing(this.mySquare, {
    toValue: {x: 50, y: 50},
    duration: 2000,
    delay: 1000,
  }).start()
}
```

통통 튀는 효과도 줄 수 있다. Easing을 임포트 하자.

```react
import { Easing, Animated, View, StyleSheet } from 'react-native'


componentDidMount() {
  Animated.timing(this.mySquare, {
    toValue: {x: 50, y: 50},
    duration: 2000,
    delay: 1000,
    easing: Easing.bounce
  }).start()
}
```

이외에도 많은 Easing의 요소가 있다. elastic(숫자)는 숫자만큼 더 멀리갔다가 되돌아온다.

+ https://reactnative.dev/docs/getting-started 참고

지금은 마운트되고 움직이게 했지만, 버튼을 눌렀을 때 트리거되도록 해보자.

```react
class AnimOne extends React.Component {

  constructor() {
    super()
    this.state = {
      mySquare: new Animated.ValueXY(0, 0)
    }
  }

  runAnimation = () => {
    Animated.timing(this.state.mySquare, {
      toValue: {x: 50, y: 50},
      duration: 2000,
      delay: 1000,
      easing: Easing.elastic(2)
    }).start()
  }

  render() {
    return (
      <View>
        <Animated.View
          style={this.state.mySquare.getLayout()}
        >
          <View style={styles.square}>
          </View>
        </Animated.View>
        <Button
          title="Animation Start"
          onPress={this.runAnimation}
        />
      </View>
    )
  }
}
```

<br>

### 다른 Animation

점점 투명해지는 애니메이션을 만들어보자

```react
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
            opacity: this.state.mySquare
          }}
        >
          <View style={styles.square}>
          </View>
        </Animated.View>
        <Button
          title="Animation Start"
          onPress={this.runAnimation}
        />
      </View>
    )
  }
}
```

즉, 내가 갖고 있는 mySquare라는 변수가 Animated의 Valu의 일정값을 갖고 있다가 이것이 0으로 변하게 되는데, 이를 View태그 내에서 opacity의 style값으로 갖고 있는 것이다. 이렇게 애니메이션을 구현할 수 있다.

<br>

### Interpolation

이동과 투명해지는 효과 두 개를 동시에 줘보자.

Animated.View 태그에서 style 속성에 interpolate를 사용한다.

```react
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
            })
          }}
        >
          <View style={styles.square}>
          </View>
        </Animated.View>
        <Button
          title="Animation Start"
          onPress={this.runAnimation}
        />
      </View>
    )
  }
}
```

규칙을 잘 이해 해야한다.

+ inputRange는 무조건 숫자가 작은 것부터 들어간다. 즉, 오름차순이다. 이 inputRange는 animation에서 다루고 있는 메인 애니메이션에 대한 값이 들어간다. 여기서는 **투명해지는 애니메이션**이 runAnimation에서 이루어지는 메인 애니메이션이다. 
  + 따라서, 투명도는 1 -> 0으로 변하니 1과 0 두 값을 사용하지만, 오름차순이므로 inputRange는 [0, 1]이 된다.
+ outputRange는 현재 interpolate를 건 스타일의 값이 들어간다. 순서는 inputRange의 요소와 인덱스를 맞춰야 한다. 즉, 점점 투명해지면서 아래로 이동하고 싶다면 [0, 1]의 순서에 맞춰서 [내려갈 좌표, 시작 좌표] 이렇게 작성해야 한다. 따라서 현재 이 코드에서 [700, 0]의 뜻은 0에서 700으로 가겠다는 것이다.

이를 활용해서 회전하는 애니메이션을 만들어보자.

```react
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
```

이렇게 inputRange를 1에서 0으로 바뀐다고 1과 0만 쓰는게 아니라, 중간에 변하는 와중의 값들을 넣을 수 있다.

텍스트가 바뀌는 애니메이션도 넣어보자.

```react
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
```

이런 애니메이션들에 순서를 줘보자.

Animation02.js를 만들었다. 순서를 주기 위해서는 Animated.sequence([])를 사용하고, 배열 안에 각 Animated.timing 혹은 Animated.square 등을 넣어주면 된다.

```react
class AnimTwo extends React.Component {

  constructor() {
    super()
    this.state = {
      redSquare: new Animated.Value(1),
      greenSquare: new Animated.ValueXY(0, 0),
      blueSquare: new Animated.ValueXY(0, 0)
    }
  }

  runAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.redSquare, {
        toValue: 0,
      }),
      Animated.spring(this.state.greenSquare, {
        toValue: {x: 200, y: 0},
      }),
      Animated.spring(this.state.blueSquare, {
        toValue: {x: 200, y: 400},
      })
    ]).start()
  }

  render() {
    return (
      <View>
        <Animated.View
          style={{
            opacity: this.state.redSquare
          }}
        >
          <View style={styles.redSquare}></View>
        </Animated.View>
        <Animated.View
          style={this.state.greenSquare.getLayout()}
        >
          <View style={styles.greenSquare}></View>
        </Animated.View>
        <Animated.View
          style={this.state.blueSquare.getLayout()}
        >
          <View style={styles.blueSquare}></View>
        </Animated.View>
        <Button
          title="Animation Start"
          onPress={this.runAnimation}
        />
      </View>
    )
  }
}
```

이중 greenSquare와 blueSquare는 동시에 애니메이션이 실행되도록 하고 싶다면, Animated.parallel을 사용하면 된다.

```react
runAnimation = () => {
  Animated.sequence([
    Animated.timing(this.state.redSquare, {
      toValue: 0,
    }),
    Animated.parallel([
      Animated.spring(this.state.greenSquare, {
        toValue: {x: 200, y: 0},
      }),
      Animated.spring(this.state.blueSquare, {
        toValue: {x: 200, y: 400},
      })
    ])
  ]).start()
}
```

<br>

<br>

# 기타 유용한 기능

### React Native Debugger

https://github.com/jhen0409/react-native-debugger

디버거를 설치한 후 프로그램을 키기만 하면 된다.

프로그램을 키고 나서는 애뮬레이터에서 ctrl + M으로 메뉴를 열고 Debug를 누르면 디버거에 연결이 된다.

이후 redux를 쓰거나 할 때 굉장히 유용한 툴이다.

`console.log()`를 이용할 수 있다!

<br>

### 재사용 가능한 컴포넌트 생성

다음과 같은 식으로 컴포넌트를 만들면, 이 컴포넌트를 임포트해서 사용할 수 있다.

내가 style을 특별하게 먹여주고 싶다면 먹여줄 수 있고, props를 내려줄 수도 있는 형태의 재사용 가능한 컴포넌트다.

```react
const Reusable = ({ text, style }) => {
  return (
  	<Text
    	style={[styles.reusableText, style]}  
    >
    	{ text }
    </Text>
  )
}
```

style을 저렇게 지정해주면, 우선 현재 styles에 있는 reusableText의 style을 따라가고, props로 받아온 style을 그 위에 덮어라가 된다. 

사용하는 쪽에선 다음과 같이 사용할 것이다.

```react
<Reusable
	style={{
    backgroundColor: 'red'
  }}
  text='reuse'
/>
```

만약 text의 경우에는 그 내용물을 children으로 받아올 수 있다.

```react
// 재사용 컴포넌트
const Reusable = ({ children, style }) => {
  return (
  	<Text
    	style={[styles.reusableText, style]}  
    >
    	{ children }
    </Text>
  )
}

// 사용하는 곳
<Reusable
	style={{
    backgroundColor: 'red'
  }}
>
  This is children
</Reusable>
```

<br>

### Dimensions

화면의 크기를 가져온다.

Dimensions를 임포트해서 구현한다.

```react
import { Dimensions, View, Text, StyleSheet } from 'react-native'
...

class App extends React.Component {
  render() {
    console.log(Dimensions.get('screen'))
    console.log(Dimensions.get('window'))
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    )
  }
}
```

이걸 언제 쓸까? 사용자가 만약 fontScale을 바꿔 놓은 경우 우리 앱이 깨질 수가 있다.

이런 경우에 사용자에게 경고를 보낼 수 있다.

```react
class App extends React.Component {

  functionA = () => {
    if (Dimensions.get('window').fontScale === 1) {
      console.log('Good')
    } else {
      console.log('Error! The font scale must be 1')
    }
  }

  render() {
    console.log(Dimensions.get('screen'))
    console.log(Dimensions.get('window'))
    console.log(this.functionA())
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    )
  }
}
```

<br>

### Device info

https://github.com/react-native-device-info/react-native-device-info

`npm install --save react-native-device-info`

`import DeviceInfo from 'react-native-device-info'`

위 링크를 보면 여러 정보들을 메서드를 통해 받아올 수 있다. `getBrand()`, `isTablet()`를 한번 써보자.

```react
import DeviceInfo from 'react-native-device-info'
...


class App extends React.Component {
  render() {
    console.log(DeviceInfo.getBrand())
    console.log(DeviceInfo.isTablet())
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    )
  }
}

```

콘솔에 'google'이 찍힌다.

