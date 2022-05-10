import request from '@/utils/request';

// 获取列表
export function getDeviceList(params) {
  return request(`/device/list`, {
    method: 'post',
    data: params
  });
}

// 新建
export function createDevice(params) {
  return request(`/device/create`, {
    method: 'post',
    data: params
  });
}

// 删除
export function deleteDevice(params) {
  return request(`/device/delete`, {
    method: 'post',
    data: params
  });
}
