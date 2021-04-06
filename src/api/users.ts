import { get, post } from '@/utils/requests';

// const baseUrl = 'http://loveyang.vip:8088/'
const baseUrl = 'http://localhost:8088/'
class Users{
    static getUser(params = {}){
        const url = `${baseUrl}users`
        return get(url, params);
    }
    static addUser(data = {}){
        const url = `${baseUrl}addUser`
        return post(url, data);
    }
    static delUser(data = {}){
        const url = `${baseUrl}delete`
        return post(url, data);
    }
    static updateUser(data = {}){
        const url = `${baseUrl}update`
        return post(url, data);
    }
}

export default Users;