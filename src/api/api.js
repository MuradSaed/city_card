import {get, post} from './request'
export const login = p => post('/jsyzhineng/auth/login', {"loginName":"chenjize","password": "cjz123456"}) //用户登录
export const getland = p => post('/jsyzhineng/user/getLandByUserId', p) //获取用户地块列表
export const getLandDeviceList = p => post('/jsyzhineng/user/getLandDeviceList', p) //取得用户地块设备信息

