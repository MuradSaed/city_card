import axios from 'axios'
// import { useCookies } from "vue3-cookies";
import router from '@/router'
// const { cookies } = useCookies();
// axios.defaults.baseURL = 'http://api.jsyzhineng.com:9005/openapi';
axios.defaults.timeout = 50000;
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    if (localStorage.token) {
        config.headers['Authorization'] = "Bearer " +  localStorage.token;  
    }
    if(config.method.toUpperCase() === 'POST') {
      config.headers['Content-Type'] = 'application/json;charset=utf-8'
    }
    return config
  },
  error => {
    return Promise.error(error)
  })

// 返回拦截器
axios.interceptors.response.use(
    res => {
        const back_data = res.data
        if (back_data.code === 20000){
            // router.push('/login')
        }
        return Promise.resolve(res);
    }, 
    error => {
        switch (error.response.status) {
        case 500:
            // ElMessage.error('Oops,Server Error.')
            break
        case 404:
            // ElMessage.error('Oops, Not Find!')
            break
        case 400:
            // ElMessage.error('Oops, 400!')
            break
        // 其他错误，直接抛出错误提示
        default:
            // ElMessage.error(error.message)
        }
        return Promise.reject(error);
    }
);

function f_base_get (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

function f_base_post(url, params){
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
}


// if (!localStorage.token) {
//     let token = await f_base_post('/jsyzhineng/auth/login', {"loginName":"chenjize","password": "cjz123456"})
//     console.log(token)
//     localStorage.token = token.token
//     // config.headers['Authorization'] = "Bearer" +  localStorage.token;  
// }

//  将Promise 的错误统一捕获
export async function post (url, params) {
    let back = null
    try{
        back = await f_base_post(url, params)
    }catch(e){
        if (e.response.data === 'The CSRF token is missing.'){
            console.log('CSRF token miss, try again')
            back = await post(url, params)
        }
        console.log('async post', e)
    }
    return back
}

export async function get(url, params) {
    let back = null
    try{
        back = await f_base_get(url, params)
    }catch(e){
        console.log('async get', e)
    }
    return back
}