import request from '@/utils/request';

// 获取列表
export function getProthesisList(params) {
  return request(`/prothesis/list`, {
    method: 'post',
    data: params
  });
}

// 新建
export function createProthesis(params) {
  return request(`/prothesis/create`, {
    method: 'post',
    data: params
  });
}

// 删除
export function deleteProthesis(params) {
  return request(`/prothesis/delete`, {
    method: 'post',
    data: params
  });
}

// 获取假体列表
export function getProthesisListAll() {
  return request(`/prothesis/list`, {
    method: 'get'
  });
}
