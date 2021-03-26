import { get } from '@/utils/requests';

class Users{
    static getUser(params){
        const url = "http://jsonplaceholder.typicode.com/posts"
        return get(url, params);
    }
}

export default Users;