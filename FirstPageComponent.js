/*
* @Author: aminhuang
* @Date:   2016-02-15 17:59:06
* @Last Modified by:   aminhuang
* @Last Modified time: 2016-02-29 15:49:50
* @Desc:
*/

'use strict';


import React,{
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import SecondPageComponent from './SecondPageComponent';

class FirstPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 2,
            user: null
        };
    }

    _pressButton() {
        var _this = this;
        const { navigator } = this.props;
        //或者写成 const navigator = this.props.navigator;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'SecondPageComponent',
                component: SecondPageComponent,
                params: {
                    id: this.state.id,
                    // 从 SecondPageComponent 获取 user
                    getUser: function(user) {
                        _this.setState({
                            user: user
                        })
                    }
                }
            })
        }
    }

    render() {
        if (this.state.user) {
            return (
                <View>
                    <Text>用户信息：{JSON.stringify(this.state.user)}</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}>
                        <Text>点我跳转，查询ID为{ this.state.id }的用户信息</Text>
                    </TouchableOpacity>
                </View>
            );
        }

    }
}
export default FirstPageComponent