import {useEffect} from 'react';
import { Input, Form, Button, message} from 'antd';
import { connect, Link} from 'umi';

import styles from './index.less';

const register = ({ addUser, history}) => {
    const onFinish = (values: any) => { // 表单验证成功回调
        const { username, email, password } = values; // 获取表单各项的值
        addUser({ username: username.replace(/\s+/g,""), email, password: password.replace(/\s+/g,"")}); // 添加用户, 去除用户和密码的空格
        message.success("注册成功，即将跳转登录页面", 2.5, () => {
            history.push("/login");
        })
    };
    
    const onFinishFailed = (errorInfo: any) => { // 表单失败回调
        message.error("请确认输入信息", 1.5);
    };

    return(
        <div className={styles["input-box"]}>
            <Form style={{width:"80%"}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input placeholder="username" size="large" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: '请输入邮箱' },
                        { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: "邮箱格式不正确"}
                        ]}>
                    <Input placeholder="email" size="large"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: '请输入密码' },
                        { pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,16}/, message: "至少八位且同时满足字母、大写字母、数字、符号"}
                        ]}>
                    <Input.Password placeholder="password" size="large"/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[{
                        required: true,
                        message: '请再次确认密码',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('两次输入不一致'));
                        },
                      }),]}>
                    <Input.Password placeholder="confirm password" size="large"/>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit" style={{width: "100%"}} size="large">
                      注册
                    </Button>
                </Form.Item>
            </Form>
            <Link to="/login">去登录</Link>
        </div>
    )
}

const mapStateToProps = ({ users }) => ({
    users: users.users
});

const mapDispatchToProps = (dispatch) => ({
    initUser: (_) => dispatch({ type: 'users/initUser', payload: _ }),
    addUser: (user) => dispatch({ type: 'users/addUser', payload: user }),  // 注册用户
})

export default connect(mapStateToProps, mapDispatchToProps)(register)
