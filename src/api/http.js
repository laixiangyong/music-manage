import router from '@/router';
import axios from 'axios';
axios.defaults.timeout = 5000;//设置超时时间为5秒
axios.defaults.withCredentials = true;//允许跨域
// Content-type响应头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 基础URL，后端地址
axios.defaults.baseURL = 'http://localhost:9981';

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果response里面的status是200，说明访问到接口了，否者错误
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 401://未登录
                    router.replace({
                        path: '/',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                case 404://没有找到
                    break;
            }
            return Promise.reject(error.response);
        }
    }
);

/**
 * 封装get方法
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: params })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

/**
 * 封装post方法
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

















