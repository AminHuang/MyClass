/*
* @Author: aminhuang
* @Date:   2016-03-02 19:37:06
* @Last Modified by:   aminhuang
* @Last Modified time: 2016-03-08 16:10:32
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

import FirstPageComponent from './FirstPageComponent';
import ClassInitComponent from './ClassInitComponent';

const AJAX_URL = "http://120.27.97.93:12327/ajax";

var serializeJSON = function(data) {
  return Object.keys(data).map(function (keyName) {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
  }).join('&');
}

class LoginComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null,
            error: "",
            test: ""
        }
    }
    // 自定义方法, 异步获取方法
    fetchData() {
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    test: responseData.data.stu.name,
                });
            })
            .done();
    }
    _pressButton() {
        var _this = this;
        const { navigator } =  this.props;

        if(this.state.username && this.state.password) {

            fetch(AJAX_URL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
                body: serializeJSON({
                    action : "login",
                    id: this.state.username,
                    pwd: this.state.password,
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                console.log(responseData);
                this.setState({test: responseData.data.stu.name,})
                if(navigator) {
                    navigator.push({
                        name: 'ClassInitComponent',
                        component: ClassInitComponent,
                        params: {
                            username: this.state.username
                        }
                    })
                }

            })
            .catch((error) => {
                console.log(error);
            })
            .done();
        } else {
            this.setState({error: "请填写完整"});
        }


    }

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
                        onChangeText = {(text) => this.setState({username: text})}
                        onFocus={() => this.username.focus()}
                        style={styles.input}
                        placeholder='username' />
                    <TextInput
                        ref={(password) => this.password = password}
                        onChangeText = {(text) => this.setState({password: text})}
                        onFocus={() => this.password.focus()}
                        style={styles.input}
                        placeholder='password'
                        password={true} />

                    <Text>{this.state.error}</Text>

                    <TouchableOpacity style={styles.btn} onPress={this._pressButton.bind(this)}>
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