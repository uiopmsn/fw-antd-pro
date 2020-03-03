import request from '@/utils/request';
export async function queryRoleList(params) {
  return request('/server/api/role/list', {
    params,
  });
}
export async function addRole(params) {
  return request('/server/api/role/add', {
    method: 'POST',
    data: params,
  });
}

export async function stopRole(params) {
  return request('/server/api/role/stop', {
    method: 'POST',
    data: params,
  });
}

export async function resetRole(params) {
  return request('/server/api/role/reset', {
    method: 'POST',
    data: params,
  });
}

export async function updateRole(params) {
  return request('/server/api/role/update', {
    method: 'POST',
    data: params,
  });
}

