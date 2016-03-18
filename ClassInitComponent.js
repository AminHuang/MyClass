/*
* @Author: aminhuang
* @Date:   2016-02-15 17:59:06
* @Last Modified by:   aminhuang
* @Last Modified time: 2016-03-10 20:02:55
* @Desc:
*/

'use strict';


const AJAX_URL = "http://120.27.97.93:12327/ajax";

import React, {
    Component,
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
} from 'react-native';

import LoginComponent from './LoginComponent';

var serializeJSON = function(data) {
  return Object.keys(data).map(function (keyName) {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
  }).join('&');
}

class ClassInitComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stu_id: null,
            class_name: "",
            class_id: "",
            class: null,
            activityLoaded: false,
            activity: null,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 != row2
            })
            // arr_
        };
    }

    _getClassInfo() {
        fetch(AJAX_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            body: serializeJSON({
                action : "get_class_info_of_student",
                stu_id: this.props.stu_id, // 这里不能用state，因为尚未更新
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            console.log(responseData);
            console.log(this.state.stu_id);
            this.setState({class: responseData.data.class_info[0]});
            this.setState({class_name: responseData.data.class_info[0].name});
            this.setState({class_id: responseData.data.class_info[0].class_id});

            fetch(AJAX_URL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
                body: serializeJSON({
                    action : "get_all_activity",
                    class_id: responseData.data.class_info[0].class_id,
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                console.log(responseData);

                this.setState({activity: responseData.data.arr_activity});
                this.setState({activityLoaded: true});
                // this.setState({
                //     dataSource: this.state.dataSource.cloneWithRows(responseData.data.arr_activity),
                //     activityLoaded: true
                // });

            })
            .catch((error) => {
                console.log(error);
            })
            .done();

        })
        .catch((error) => {
            console.log(error);
        })
        .done();
    }


    _renderLoadingView() {
        return (
            <View style={styles.container}>
            <Text>
                Loading ...
            </Text>
           </View>
        );
    }

    _renderActivity(activity) {
        return (
            <View style={styles.container}>
                <View style={styles.rightContainer}>
                    <Text style={styles.name}>{activity.name}</Text>
                    <Text style={styles.rank}>{activity.description}</Text>
                </View>
            </View>
        );
    }

    _renderLoadActivity(activity) {
        return (
            <View style={styles.container}>
                <Text>获得的参数： stu_id = {this.state.stu_id}</Text>
                <Text style={styles.className}>{this.state.class_name}</Text>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderActivity}
                    style={styles.listView} />

                <TouchableOpacity onPress={this._pressButton.bind(this)}>
                    <Text>返回</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // 组件实例挂接（初次渲染）后被调用
    componentDidMount() {
        this.setState({
            stu_id: this.props.stu_id
        });
        this._getClassInfo();

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
        if (!this.state.activityLoaded) {
            return this._renderLoadingView();
        }

        // return _renderLoadActivity();

        return (
            <View style={styles.container}>
                <Text>获得的参数： stu_id = {this.state.stu_id}</Text>
                <Text style={styles.className}>{this.state.class_name}</Text>



                <TouchableOpacity onPress={this._pressButton.bind(this)}>
                    <Text>返回</Text>
                </TouchableOpacity>
            </View>
        );
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
    className: {
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000'
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
    },
    rightContainer: {
        flex: 1,
    },
});

export default ClassInitComponent