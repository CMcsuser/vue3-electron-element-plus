import { get, post } from '@/utils/request'

// 用户相关 API
export interface LoginParams {
  username: string
  password: string
}

export interface UserInfo {
  id: number
  username: string
  nickname: string
  roles: string[]
}

// 登录
export function login(data: LoginParams) {
  return post<{ token: string }>('/user/login', data)
}

// 获取用户信息
export function getUserInfo() {
  return get<UserInfo>('/user/info')
}

// 登出
export function logout() {
  return post('/user/logout')
}
