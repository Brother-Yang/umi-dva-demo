import Users from '../api/users';

export default {
    namespace: 'users',

    state:{
      users: [{Id: "1", username: "Tom", email: "4546541@qq.com", password: "aaa"},{Id: "2", username: "Mike", email: "4546541@qq.com", password: "bbb"},{Id: "3", username: "Bob", email: "454541@qq.com", password: "ccc"}]
    },

    effects: {
        *initUser(_, { put, call }){ // 初始化用户
          const users = yield call(Users.getUser);
          yield put({
            type: 'receive',
            payload: {
              users: [...users]
            }
          })
        },

        *addUser({payload: user}, { call }){ // 注册用户
          const {Id, email, password, username} = user;
          yield call(Users.addUser, {id: Id, email, password, username})
          },

          *delUser({payload: Id}, { call }){ // 删除用户
            yield call(Users.delUser, {id: Id});
          },

          *updateUser({ payload: user}, { call }){ // 修改用户
            const {Id, email, password, username} = user;
            yield call(Users.updateUser,{id: Id, email, password, username})
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