import { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Table, Space, Modal, Input, message, Popconfirm} from 'antd';

import styles from './index.less';

const main = ({ users, delUser, updateUser, initUser }) => {

    useEffect(() => {
        initUser();
    },[])

    const [isModalVisible, setIsModalVisible] = useState(false); // model框显示与隐藏
    const [newUsername, setNewUsername] = useState(""); // model框下的 username
    const [newEmail, setNewMail] = useState(""); // model框下的 email
    const [newPassword, setNewPassword] = useState(""); // model框下的 password
    const [key, setKey] = useState(""); // key值

    const showModel = (record) => { // 点击修改显示 model框
        const { username, email, password, Id} = record; // 解构获得点击的用户信息
        setIsModalVisible(true); // 显示 model 框

        setNewUsername(username);
        setNewMail(email)
        setNewPassword(password)
        setKey(Id);
    }
    
    const handleOk = async () => { // model 点击确认回调
        await updateUser({password: newPassword, Id: key, email: newEmail, username: newUsername}); // 更新修改的用户信息
        await initUser();
        message.success("修改成功", 2)
        setIsModalVisible(false);
    };
    
    const handleCancel = () => { // model 点击取消回调
        setIsModalVisible(false);
    };

    const confirm = async (key) => { // 确认框点击是的回调
        await delUser(key);
        await initUser();
        message.success('删除成功');
      }
      
      function cancel(e) { // // 确认框点击否的回调
        message.error('删除失败');
      }

    const columns = [
        {title: "用户名", dataIndex: "username"},
        {title: "邮箱", dataIndex: "email"},
        {title: "密码", dataIndex: "password"},
        {title: "操作", 
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => showModel(record)}>修改</a>
                    <Popconfirm 
                        title="是否删除所选内容？"
                        onConfirm={ () => confirm(record.Id)}
                        onCancel={cancel}
                        okText="是"
                        cancelText="否"
                        >
                        <a>删除</a>
                    </Popconfirm>
                </Space>
            ),},
    ]

    return (
        <div>
            <Table rowKey={record=>record.Id} columns={columns} dataSource={users}></Table>
            <Modal title="编辑" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Space direction="horizontal">
                    <Input value={newUsername} onChange={(e) => {setNewUsername(e.target.value)}}/>
                    <Input value={newEmail} onChange={(e) => {setNewMail(e.target.value)}}/>
                    <Input value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}/>
                </Space>
            </Modal>
        </div>
    )
}

const mapStateToProps = ({ users }) =>({
    users: users.users
})
const mapDispatchToProps = (dispatch) => ({
    initUser: (_) => dispatch({ type: 'users/initUser', payload: _ }),
    delUser: (Id) => dispatch({ type: 'users/delUser', payload: Id }),
    updateUser: (user) => dispatch({ type: 'users/updateUser', payload: user }),
})


export default connect(mapStateToProps, mapDispatchToProps)(main);