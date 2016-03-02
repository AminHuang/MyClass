/*
* @Author: aminhuang
* @Date:   2016-02-15 18:00:26
* @Last Modified by:   aminhuang
* @Last Modified time: 2016-02-29 15:52:37
* @Desc:
*/

'use strict';

const USER_MODELS = {
    1: { name: 'mot', age: 23 },
    2: { name: '晴明大大', age: 25 }
};

import React, {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import FirstPageComponent from './FirstPageComponent';

class SecondPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null
        };
    }

    // 组件实例挂接（初次渲染）后被调用
    componentDidMount() {
        this.setState({
            id: this.props.id
        })
    }

    _pressButton() {
        // const 声明常量， 声明后不能更改
        // const的作用域与let命令相同：只在声明所在的块级作用域内有效。
        const { navigator } = this.props;


        // 这部分不是很明白
        if(this.props.getUser) {
            var user = USER_MODELS[this.props.id];
            this.props.getUser(user);
        }

        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
            navigator.pop();
        }
    }

    render() {
    return (
            <View>
                <Text>获得的参数：id = {this.state.id}</Text>
                <TouchableOpacity onPress={this._pressButton.bind(this)}>
                    <Text>点我跳回去</Text>
                </TouchableOpacity>
            </View>
    );
    }
}
export default SecondPageComponent