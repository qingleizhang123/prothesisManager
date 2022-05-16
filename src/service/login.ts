import SparkMD5 from 'spark-md5';
import request from '@/utils/request';

// 登录
export function accountLogin(params) {
  const spark = new SparkMD5();
  spark.append(params.password);
  params.password = spark.end();
  return request(`/user/login`, {
    method: 'post',
    data: params,
  });
}

// 注册
export function accountRegister(params) {
  const spark = new SparkMD5();
  spark.append(params.password);
  params.password = spark.end();
  return request(`/user/register`, {
    method: 'post',
    data: params,
  });
}

// 获取列表
export function accountList(params) {
  return request(`/user/list`, {
    method: 'post',
    data: params
  });
}

// 审核
export function verigyAccount(params) {
  return request(`/user/verify`, {
    method: 'post',
    data: params
  });
}

// 删除
export function deleteAccount(params) {
  return request(`/user/delete`, {
    method: 'post',
    data: params
  });
}
