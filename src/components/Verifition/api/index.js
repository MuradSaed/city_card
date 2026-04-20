
import {get, post} from './request'


//获取验证图片
export const reqGet = p => post('/tdgl/captcha/get',p) //用户登录
//滑动或者点选验证
export const reqCheck = p => post('/tdgl/captcha/check',p) //用户登录


