/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
}
from 'react-native';

var SearchPage = require('./SearchPage');
import FirstPageComponent from './FirstPageComponent';
import LoginComponent from './LoginComponent';

class HelloWorld extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

class InitProject extends Component {
  render() {
    // var defaultName = 'FirstPageComponent';
    // var defaultComponent = FirstPageComponent;
    var defaultName = 'LoginComponent';
    var defaultComponent = LoginComponent;
    // 注意，Navigator是覆盖整个页面的大容器，这个容器只用在根页面创建一次，然后每次一整页一整页的push
    return (
      <Navigator
        initialRoute={{ name: defaultName, component:defaultComponent }}
        // ES6 允许使用 "箭头" (=>) 定义函数
        configureScene={(route) => {
          return Navigator.SceneConfigs.VerticalDownSwipeJump;
        }}
        // 形式为"...变量名" 是 ES6的引入的 rest参数, 用于获取函数的多余参数
        // 扩展运算符 (...), 好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator} />
        }}
       />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    color: '#000',
    backgroundColor: '#FFF',
    fontSize: 30,
    margin: 80,
  },
});

AppRegistry.registerComponent('InitProject', () => InitProject);
// AppRegistry.registerComponent('InitProject', () => LoginPageComponent);