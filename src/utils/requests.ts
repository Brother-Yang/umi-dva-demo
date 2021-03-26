import { history } from 'umi';
import { extend } from 'umi-request';

const request = extend({
    timeout: 1000,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

request.interceptors.request.use((url, options) => {
    const token = localStorage.getItem("token") || ""; // 读取token
    options.headers["authorization"] = token; // 携带token
    return {url, options};
  });
  
request.interceptors.response.use((response, options) => {
    if(!options.headers["authorization"]){ // 如果没有token，则跳转到登录页
        history.push("/login");
    }
    return response
});

/**
 * get请求(promise)
 * @param { String } url 请求地址
 * @param { Object } params 请求参数
 */
const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        request.get(url, { params })
        .then( response => {
            resolve(response)
        })
        .catch( error => {
            reject(error)
        });
    })
}

/**
 * post请求(promise)
 * @param { String } url 请求地址
 * @param { Object } data 提交数据
 */
const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        request.post(url, { data })
        .then( response => {
            resolve(response)
        })
        .catch( error => {
            reject(error)
        });
    })
}

export { get, post }

