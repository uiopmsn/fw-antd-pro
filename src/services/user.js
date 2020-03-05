import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function queryCurrentMenu() {
  return request('/server/api/currentMenu');
}

export async function queryUsers(params) {
  return request('/server/api/user/list', {
    params,
  });
}

export async function resetUsers(params) {
  return request('/server/api/user/reset', {
    method: 'POST',
    data: params,
  });
}
export async function stopUsers(params) {
  return request('/server/api/user/stop', {
    method: 'POST',
    data: params,
  });
}
export async function addUser(params) {
  return request('/server/api/user/add', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateUser(params) {
  return request('/api/rule', {
    method: 'POST',
    data: params,
  });
}

