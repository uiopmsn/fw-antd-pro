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

export async function updateRole(params) {
  return request('/api/role', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

export async function getPermByRole(params) {
  return request('/api/getPermByRole', {
    params,
  });
}
