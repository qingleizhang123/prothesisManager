import request from '@/utils/request';

// 获取列表
export function getRoleList(params) {
  return request(`/role/list`, {
    method: 'post',
    data: params
  });
}

// 新建
export function createRole(params) {
  return request(`/role/create`, {
    method: 'post',
    data: params
  });
}

// 删除
export function deleteRole(params) {
  return request(`/role/delete`, {
    method: 'post',
    data: params
  });
}
