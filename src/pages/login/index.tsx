import { Input, Button, Form, message} from 'antd';
import { connect, Link } from 'umi';
import { useState, useEffect} from 'react';

import styles from './index.less';

const login = ({ users, history, initUser }) => {
    
    useEffect(() => {
        initUser();
    },[])

    const [username, setUsername] = useState(""); // 输入的用户名
    const [password, setPassword] = useState(""); // 输入的密码
    const goLogin = () => {
        let isLogin = users.some(item => { // 调用 some 方法判断输入的用户密码是否匹配
            return username === item.username && password === item.password
        })
        isLogin ? message.success("登陆成功，即将跳转到主页", 2.5, () => { history.push('/main')}) // true 则登录成功
        : message.error("登陆失败，请检查账号和密码", 2); // false 登陆失败
    }
    return (
        <div className={styles["input-box"]}>
            <Form style={{width:"80%"}}>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input placeholder="username" size="large" onChange={(e) => {setUsername(e.target.value)}} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: '请输入密码' },
                        ]}>
                    <Input.Password placeholder="password" size="large" onChange={(e) => {setPassword(e.target.value)}}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width: "100%"}} size="large" onClick={goLogin}>
                      登录
                    </Button>
                </Form.Item>
            </Form>
            <Link to="/register">去注册</Link>
        </div>
    )
}

const mapStateToProps = ({ users }) =>({
    users: users.users
})
const mapDispatchToProps = (dispatch) => ({
    initUser: (_) => dispatch({ type: 'users/initUser', payload: _ }),
})


export default connect(mapStateToProps, mapDispatchToProps)(login);