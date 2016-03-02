/*
* @Author: aminhuang
* @Date:   2016-03-02 19:37:06
* @Last Modified by:   aminhuang
* @Last Modified time: 2016-03-02 19:37:06
*/

'use strict';

import React,{
    AppRegistry,
    Component,
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';


class LoginComponent extends React.Component {

    render() {
        return (
            <ScrollView
                contentContainerStyle={{flex:1}}
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps={false}
            >
                <View style={styles.container}>
                    <Image
                        source={{uri:'http://oss-hz.qianmi.com/qianmicom/u/cms/qmwww/201511/03102524l6ur.png'}}
                        style={styles.logo}
                    />
                    <TextInput
                        ref={(username) => this.username = username}
                        onFocus={() => this.username.focus()}
                        style={styles.input}
                        placeholder='username' />
                    <TextInput
                        ref={(password) => this.password = password}
                        onFocus={() => this.password.focus()}
                        style={styles.input}
                        placeholder='password'
                        password={true} />

                    <TouchableOpacity style={styles.btn}>
                        <Text sytle={styles.text}>登录</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )

    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 160,
    height: 160,
    marginTop: 100
  },
  input: {
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightblue'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFF'
  },
  btn: {
    alignSelf: 'stretch', // 覆盖父样式
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3333FF',
    height: 40,
    borderRadius: 5,
    marginTop: 10
  }
});

export default LoginComponent