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
  return request(`/user/create`, {
    method: 'post',
    data: params,
  });
}
