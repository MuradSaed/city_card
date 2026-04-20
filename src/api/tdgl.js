import {get, post} from './request'
export const login = p => post('/tdgl/login', p) //用户登录
