export default {
    namespace: 'users',

    state:{
      users: [{key: "1", username: "Tom", email: "4546541@qq.com", password: "aaa"},{key: "2", username: "Mike", email: "4546541@qq.com", password: "bbb"},{key: "3", username: "Bob", email: "454541@qq.com", password: "ccc"}]
    },

    effects: {
        *addUser({payload: user}, { put, select }){ // 注册用户
           const { users } = yield select((state) => state.users);
            yield put({
              type: 'receive',
              payload: {
                users: [...users, user]
              }
            })
          },

          *delUser({payload: key}, { put, select, call}){ // 删除用户
            const { users } = yield select((state)=>state.users); // 拿到原数组
            const newUsers = users.filter(item => { // 根据key返回新数组
              return item.key !== key
            })
            yield put({
              type: 'receive',
              payload: {
                users: [...newUsers]
              }
            })
          },

          *updateUser({ payload: user}, { put, select }){ // 修改用户
            const { users } = yield select((state)=>state.users); // 拿到原数组
            const index = users.findIndex(item => { // 根据key值查找索引
              return item.key === user.key;
            })
            users.splice(index, 1, user); // 根据索引先删除再增加
            yield put({
              type: 'receive',
              payload: {
                users: [...users]
              }
            })
          }
    },

    reducers: {
        receive(state, { payload }) {
            return {
            ...state,
            ...payload
            };
        },
    },
}